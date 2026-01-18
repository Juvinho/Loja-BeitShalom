# Loja Beit Shalom

Aplicação web de e‑commerce desenvolvida para apresentar e vender produtos da Sinagoga Beit Shalom, com foco em uma experiência moderna, responsiva e preparada para integração com meios de pagamento e cálculo de frete.

> Pensado para demonstração profissional ao cliente, com fluxo completo de navegação, carrinho e checkout.

---

## Destaques Rápidos

- Interface escura elegante, alinhada à identidade visual da Beit Shalom.
- Loja totalmente responsiva (desktop e mobile).
- Checkout integrado ao **Mercado Pago** com servidor Node dedicado.
- Produto de teste de **R$ 1,00** configurado como **infoproduto digital** (sem frete).
- Estrutura preparada para **cálculo de frete real** via Melhor Envio.

---

## Visão Geral

- Página inicial institucional apresentando a comunidade e um convite para visitar a loja.
- Vitrine de produtos com layout inspirado em grandes marketplaces.
- Página de detalhes do produto com galeria de imagens, descrição rica e especificações técnicas.
- Carrinho lateral (sidebar) com resumo dos itens, quantidades e subtotal.
- Integração com **checkout do Mercado Pago** através de um servidor Node/Express dedicado.
- Produto de teste de **R$ 1,00** configurado como **infoproduto enviado por e‑mail**, ideal para validação do fluxo de pagamento.

---

## Tecnologias Utilizadas

- **Frontend**
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) (via CDN, configurado em `index.html`)
  - [lucide-react](https://lucide.dev/) para ícones

- **Backend de Checkout**
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [Mercado Pago SDK](https://www.mercadopago.com.br/developers/)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- **Serviços e Integrações**
  - Estrutura preparada para cálculo de frete com **Melhor Envio**.
  - Validação de CEP via **ViaCEP** (na UI do carrinho).

---

## Estrutura de Pastas (principal)

- `App.tsx` – Composição principal da aplicação, controle de navegação entre Home, Loja e Detalhe do Produto.
- `components/`
  - `Navbar.tsx` – Cabeçalho fixo com navegação e contador do carrinho.
  - `HomeInfo.tsx` – Seção institucional com chamada para visitar a loja.
  - `Hero.tsx` – Destaque visual da loja.
  - `ProductCard.tsx` – Card de produto utilizado na grade da loja.
  - `ProductDetails.tsx` – Página de detalhes, galeria e botão de adicionar ao carrinho.
  - `CartSidebar.tsx` – Carrinho lateral com itens, quantidades e ações.
  - `Footer.tsx` – Rodapé com informações da Beit Shalom, contatos, formas de pagamento e newsletter.
  - `ChatWidget.tsx` – Widget de contato/atendimento.
- `constants.ts` – Lista de produtos mockados, incluindo o **produto de teste de R$ 1,00**.
- `types.ts` – Tipagens de `Product`, `CartItem` e tipos auxiliares.
- `services/`
  - `mercadoPagoCheckout.ts` – Cliente frontend para chamar o servidor de checkout.
  - `melhorEnvioService.ts` – Serviço para cálculo de frete (pronto para uso com credenciais).
  - `geminiService.ts` – Integração opcional com Gemini (AI Studio).
- `server/checkout-server.mjs` – Servidor Express responsável por criar a preferência de pagamento no Mercado Pago.

---

## Configuração do Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis (exemplo de chaves, sem expor valores sensíveis):

```bash
# Chave de API do Gemini (se desejar usar funcionalidades de IA)
GEMINI_API_KEY=SEU_TOKEN_AQUI

# Mercado Pago
VITE_MP_ACCESS_TOKEN=SEU_ACCESS_TOKEN_MERCADO_PAGO

# Melhor Envio (opcional, para cálculo real de frete)
VITE_MELHOR_ENVIO_TOKEN=SEU_TOKEN_MELHOR_ENVIO
VITE_CEP_ORIGEM=00000000
VITE_EMAIL_CONTATO=seu-email@dominio.com
```

> Importante: nunca faça commit de tokens reais em repositórios públicos.

---

## Como Rodar o Projeto Localmente

### Requisitos

- Node.js 18+ (recomendado)
- npm instalado

### Passos

1. Clonar o repositório:

   ```bash
   git clone https://github.com/Juvinho/Loja-BeitShalom.git
   cd Loja-BeitShalom
   ```

2. Instalar dependências:

   ```bash
   npm install
   ```

3. Configurar o arquivo `.env.local` conforme a seção de **Configuração do Ambiente**.

4. Rodar o frontend em modo desenvolvimento:

   ```bash
   npm run dev
   ```

   A aplicação ficará disponível em: `http://localhost:5173`

5. Em paralelo, iniciar o servidor de checkout do Mercado Pago:

   ```bash
   npm run server
   ```

   O servidor sobe por padrão em `http://localhost:3001` e é chamado pelo frontend para criar a preferência de pagamento.

---

## Como Demonstrar ao Cliente

### Passo a passo sugerido para a apresentação

1. Acesse a **Home** e explique brevemente a proposta da Beit Shalom.
2. Clique em **Visitar a Loja** e mostre a vitrine de produtos.
3. Destaque o **Produto de Teste – 1 Real**:
   - Explique que é um **infoproduto digital, enviado por e‑mail**, sem frete.
4. Adicione o produto ao carrinho:
   - Mostre o **carrinho lateral** se abrindo com o resumo da compra.
5. Avance para o **checkout do Mercado Pago**:
   - Mostre que o valor final é de R$ 1,00 (sem frete).
   - Se utilizar ambiente real, destaque que o cliente está vendo o mesmo fluxo que um comprador usaria.

---

## Fluxo de Compra e Produto de Teste

- Acesse a aba **Loja** pela navegação no topo.
- O primeiro item da lista de produtos é o **“Produto de Teste – 1 Real”**, configurado como **infoproduto sem frete**.
- Adicione o produto ao carrinho.
- Prossiga para o checkout (Mercado Pago) e finalize o pagamento.
- A descrição do produto deixa claro para o cliente que se trata de um **conteúdo digital enviado por e‑mail** após a confirmação do pagamento.

---

## Próximos Passos / Possíveis Evoluções

- Publicar o frontend em um serviço de hosting (por exemplo, Vercel ou Netlify).
- Hospedar o servidor de checkout em uma infraestrutura Node (Railway, Render, servidor próprio etc.).
- Configurar contas de teste e ambiente sandbox do Mercado Pago para cenários de validação mais avançados.
- Integrar cálculo de frete real via Melhor Envio com credenciais de produção.

---

## Licença

Projeto desenvolvido para uso interno e demonstração ao cliente da Sinagoga Beit Shalom. Ajuste a licença conforme a necessidade do projeto final.
