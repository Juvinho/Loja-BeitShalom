import { CartItem } from '../types';

const API_URL = 'https://melhorenvio.com.br/api/v2/me/shipment/calculate';
// Sandbox URL for testing if needed: 'https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate'

interface ShippingOption {
  id: number;
  name: string;
  price: number;
  custom_price: number;
  discount: number;
  currency: string;
  delivery_time: number;
  delivery_range: {
    min: number;
    max: number;
  };
  custom_delivery_time: number;
  custom_delivery_range: {
    min: number;
    max: number;
  };
  agency: {
    id: number;
    name: string;
    logo: string;
  };
  company: {
    id: number;
    name: string;
    picture: string;
  };
}

export interface ShippingQuote {
  serviceName: string;
  price: number;
  days: number;
  companyName: string;
  companyLogo: string;
}

export const calculateShipping = async (
  cepDestino: string,
  items: CartItem[]
): Promise<ShippingQuote[]> => {
  const token = import.meta.env.VITE_MELHOR_ENVIO_TOKEN;
  const cepOrigem = import.meta.env.VITE_CEP_ORIGEM;
  const emailContato = import.meta.env.VITE_EMAIL_CONTATO;

  if (!token || !cepOrigem) {
    console.warn('Melhor Envio credentials missing. Using fallback simulation.');
    return simulateShipping(cepDestino);
  }

  // Format products for API
  const products = items.map(item => ({
    id: item.id.toString(),
    width: item.dimensions?.width ?? 10,
    height: item.dimensions?.height ?? 10,
    length: item.dimensions?.length ?? 10,
    weight: item.dimensions?.weight ?? 0.5,
    insurance_value: item.price,
    quantity: item.quantity
  }));

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'User-Agent': `Aplicação ${emailContato || 'contato@loja.com'}`
      },
      body: JSON.stringify({
        from: { postal_code: cepOrigem },
        to: { postal_code: cepDestino },
        products,
        options: {
          receipt: false,
          own_hand: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Melhor Envio API error: ${response.statusText}`);
    }

    const data: ShippingOption[] = await response.json();

    // Filter and map relevant options
    // The API might return an array of options or an error object if something is wrong
    if (!Array.isArray(data)) {
        console.error('Unexpected response format', data);
        return simulateShipping(cepDestino);
    }

    return data
      .filter(opt => !opt.error) // Remove options with errors
      .map(opt => ({
        serviceName: opt.name,
        price: parseFloat(opt.custom_price.toString()), // Use custom_price which might include rules/discounts
        days: opt.custom_delivery_time,
        companyName: opt.company.name,
        companyLogo: opt.company.picture
      }));

  } catch (error) {
    console.error('Error calculating shipping:', error);
    return simulateShipping(cepDestino);
  }
};

// Fallback simulation (existing logic)
const simulateShipping = (cep: string): ShippingQuote[] => {
  const lastDigit = parseInt(cep.slice(-1), 10);
  const basePrice = 19.90;
  const extra = isNaN(lastDigit) ? 0 : lastDigit;
  
  return [
    {
      serviceName: "PAC",
      price: parseFloat((basePrice + extra).toFixed(2)),
      days: 5 + (isNaN(lastDigit) ? 0 : (lastDigit % 3)),
      companyName: "Correios",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Correios_Simbolo.png/1200px-Correios_Simbolo.png" // Placeholder
    },
    {
      serviceName: "SEDEX",
      price: parseFloat((basePrice * 1.8 + extra).toFixed(2)),
      days: 2 + (isNaN(lastDigit) ? 0 : (lastDigit % 2)),
      companyName: "Correios",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Correios_Simbolo.png/1200px-Correios_Simbolo.png"
    }
  ];
};
