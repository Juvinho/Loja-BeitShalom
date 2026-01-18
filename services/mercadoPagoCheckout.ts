import { CartItem } from '../types';

interface CheckoutResponse {
  id: string;
  init_point: string;
}

export const createCheckoutPreference = async (
  items: CartItem[],
  shippingCost: number
): Promise<CheckoutResponse> => {
  const response = await fetch('http://localhost:3001/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items, shippingCost }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Erro detalhado do checkout:', errorData);
    throw new Error(errorData.error || 'Não foi possível iniciar o pagamento no Mercado Pago.');
  }

  return response.json();
};
