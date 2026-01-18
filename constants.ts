import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 9,
    name: "Produto de Teste - 1 Real",
    category: "Infoproduto de Teste",
    price: 1.00,
    image: "https://picsum.photos/800/800?random=9",
    images: [
      "https://picsum.photos/800/800?random=9",
      "https://picsum.photos/800/800?random=91"
    ],
    description: "Infoproduto de teste, entregue por e-mail, ideal para validar o checkout sem frete.",
    detailedDescription: "Produto 100% digital criado especificamente para testar o fluxo de pagamento do Mercado Pago. Após a confirmação do pagamento, o conteúdo é enviado diretamente para o e-mail cadastrado, sem cobrança de frete ou envio físico.",
    specifications: [
      { label: "Tipo", value: "Infoproduto de teste" },
      { label: "Uso", value: "Validação de fluxo de compra" },
      { label: "Entrega", value: "Enviado por e-mail (produto digital, sem frete)" }
    ],
    dimensions: {
      width: 10,
      height: 2,
      length: 15,
      weight: 0.2
    },
    rating: 5.0,
    ratingCount: 1
  },
  {
    id: 1,
    name: "Cortejo da Torá - Edição de Estudo",
    category: "Livros",
    price: 189.90,
    image: "https://picsum.photos/800/800?random=1",
    images: [
      "https://picsum.photos/800/800?random=1",
      "https://picsum.photos/800/800?random=11",
      "https://picsum.photos/800/800?random=12"
    ],
    description: "Um guia completo sobre as tradições do cortejo da Torá, enriquecido com comentários.",
    detailedDescription: "Edição de estudo com notas de rodapé, mapas, referências cruzadas e comentários rabínicos e messiânicos. Ideal para quem deseja aprofundar o entendimento do cortejo da Torá e sua aplicação prática na vida diária.",
    specifications: [
      { label: "Formato", value: "Capa dura" },
      { label: "Páginas", value: "432" },
      { label: "Idioma", value: "Português" },
      { label: "Editora", value: "Beit Shalom Publications" }
    ],
    dimensions: {
      width: 16,
      height: 23,
      length: 3,
      weight: 0.8
    },
    rating: 4.9,
    ratingCount: 128
  },
  {
    id: 2,
    name: "Comentário Parashá Vaerá",
    category: "Cursos Digitais",
    price: 97.00,
    image: "https://picsum.photos/800/800?random=2",
    images: [
      "https://picsum.photos/800/800?random=2",
      "https://picsum.photos/800/800?random=21"
    ],
    description: "Série de vídeos aprofundada sobre a porção semanal, explorando temas de redenção.",
    detailedDescription: "Curso em vídeo com acesso vitalício, abordando contexto histórico, linguístico e profético de Vaerá. Inclui material em PDF e perguntas para reflexão em grupo.",
    specifications: [
      { label: "Formato", value: "100% online" },
      { label: "Aulas", value: "12 vídeo aulas" },
      { label: "Carga horária", value: "8 horas" }
    ],
    dimensions: {
      width: 10,
      height: 10,
      length: 10,
      weight: 0.1 // Digital, mas peso mínimo para API não quebrar se for misto
    },
    rating: 4.8,
    ratingCount: 89
  },
  {
    id: 3,
    name: "Talit Messiânico - Azul e Dourado",
    category: "Itens Rituais",
    price: 350.00,
    image: "https://picsum.photos/800/800?random=3",
    images: [
      "https://picsum.photos/800/800?random=3",
      "https://picsum.photos/800/800?random=31",
      "https://picsum.photos/800/800?random=32"
    ],
    description: "Talit de lã de alta qualidade com nós tradicionais e simbolismo messiânico.",
    detailedDescription: "Talit produzido com tecidos selecionados, franjas tzitzit atadas manualmente e detalhes em azul e dourado que remetem à realeza do Messias.",
    specifications: [
      { label: "Material", value: "Lã premium" },
      { label: "Tamanho", value: "1,80m x 0,90m" },
      { label: "Origem", value: "Importado de Israel" }
    ],
    rating: 5.0,
    ratingCount: 57
  },
  {
    id: 4,
    name: "Pintura a Óleo O Bom Pastor",
    category: "Arte",
    price: 650.00,
    image: "https://picsum.photos/800/800?random=4",
    images: [
      "https://picsum.photos/800/800?random=4",
      "https://picsum.photos/800/800?random=41"
    ],
    description: "Impressão em tela do tema de 2025/5786 'O Bom Pastor', perfeito para santuários domésticos.",
    detailedDescription: "Obra exclusiva impressa em canvas de alta gramatura com acabamento premium, pronta para pendurar.",
    specifications: [
      { label: "Dimensões", value: "60cm x 90cm" },
      { label: "Acabamento", value: "Canvas montado em chassi de madeira" }
    ],
    dimensions: {
      width: 60,
      height: 5,
      length: 90,
      weight: 2.0
    },
    rating: 4.7,
    ratingCount: 34
  },
  {
    id: 5,
    name: "Conjunto de Velas Cabalá Shabat",
    category: "Casa",
    price: 120.00,
    image: "https://picsum.photos/800/800?random=5",
    images: [
      "https://picsum.photos/800/800?random=5",
      "https://picsum.photos/800/800?random=51"
    ],
    description: "Velas artesanais para receber o Shabat, inclui cartão com bênçãos.",
    detailedDescription: "Velas produzidas manualmente com blend especial de ceras para queima limpa e longa duração.",
    specifications: [
      { label: "Quantidade", value: "12 velas" },
      { label: "Tempo de queima", value: "4 horas cada" }
    ],
    rating: 4.6,
    ratingCount: 46
  },
  {
    id: 6,
    name: "Restauração de Israel - Vol 1",
    category: "Livros",
    price: 89.90,
    image: "https://picsum.photos/800/800?random=6",
    images: [
      "https://picsum.photos/800/800?random=6",
      "https://picsum.photos/800/800?random=61"
    ],
    description: "Insights proféticos sobre o encontro das tribos.",
    detailedDescription: "Livro que aborda, à luz das Escrituras, o movimento de retorno às raízes e o papel de Israel nos últimos dias.",
    specifications: [
      { label: "Formato", value: "Brochura" },
      { label: "Páginas", value: "280" }
    ],
    rating: 4.9,
    ratingCount: 73
  },
  {
    id: 7,
    name: "Menorá Moderna de Prata",
    category: "Itens Rituais",
    price: 520.00,
    image: "https://picsum.photos/800/800?random=7",
    images: [
      "https://picsum.photos/800/800?random=7",
      "https://picsum.photos/800/800?random=71"
    ],
    description: "Menorá com design elegante e moderno, trabalhada em prata de lei.",
    detailedDescription: "Peça central para qualquer lar, com acabamento polido e detalhes em alto-relevo.",
    specifications: [
      { label: "Altura", value: "35cm" },
      { label: "Material", value: "Prata 925" }
    ],
    rating: 4.8,
    ratingCount: 52
  },
  {
    id: 8,
    name: "Raízes Hebraicas 101",
    category: "Cursos Digitais",
    price: 79.90,
    image: "https://picsum.photos/800/800?random=8",
    images: [
      "https://picsum.photos/800/800?random=8",
      "https://picsum.photos/800/800?random=81"
    ],
    description: "Guia para iniciantes entenderem as raízes judaicas da fé.",
    detailedDescription: "Curso introdutório ideal para grupos de estudo e discipulado focado nas raízes hebraicas.",
    specifications: [
      { label: "Formato", value: "Vídeo aulas + PDFs" },
      { label: "Carga horária", value: "6 horas" }
    ],
    rating: 4.7,
    ratingCount: 61
  }
];
