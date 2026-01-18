import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

const accessToken = process.env.VITE_MP_ACCESS_TOKEN;

if (!accessToken) {
  console.warn('VITE_MP_ACCESS_TOKEN não encontrado nas variáveis de ambiente.');
}

const client = new MercadoPagoConfig({
  accessToken: accessToken ?? '',
});

const preferenceClient = new Preference(client);

app.post('/checkout', async (req, res) => {
  try {
    const { items, shippingCost } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio' });
    }

    const mpItems = items.map((item) => ({
      title: item.name,
      quantity: item.quantity,
      currency_id: 'BRL',
      unit_price: Number(item.price),
    }));

    const body = {
      items: mpItems,
      ...(shippingCost
        ? {
            shipments: {
              cost: Number(shippingCost),
              mode: 'not_specified',
            },
          }
        : {}),
      back_urls: {
        success: 'http://localhost:5173/',
        failure: 'http://localhost:5173/',
        pending: 'http://localhost:5173/',
      },
    };

    console.log('Enviando preferência para MP:', JSON.stringify(body, null, 2));

    const response = await preferenceClient.create({ body });

    return res.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error('Erro ao criar preferência Mercado Pago', error);
    return res.status(500).json({ error: 'Erro ao iniciar checkout no Mercado Pago' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor Mercado Pago rodando na porta ${PORT}`);
});
