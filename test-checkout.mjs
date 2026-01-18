
import fetch from 'node-fetch';

async function testCheckout() {
  try {
    const response = await fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            name: 'Produto Teste',
            quantity: 1,
            price: 10.0,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro na resposta:', response.status, errorText);
    } else {
      const data = await response.json();
      console.log('Sucesso! Preferência criada:', data);
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
}

testCheckout();
