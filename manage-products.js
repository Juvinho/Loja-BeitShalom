import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Define o caminho do arquivo de dados baseado no diretório atual de execução
// Isso permite que o executável/script encontre a pasta 'data' onde quer que esteja rodando (desde que a estrutura seja mantida)
const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function beep() {
  process.stdout.write('\x07');
}

async function main() {
  console.clear();
  console.log('\n==========================================');
  console.log('   GERENCIADOR DE PRODUTOS BEIT SHALOM');
  console.log('==========================================');
  console.log('     (c) 2026, by Juvinho (Axyon)');
  console.log('==========================================\n');
  
  beep();
  
  while (true) {
    console.log('1. Listar Produtos');
    console.log('2. Adicionar Novo Produto');
    console.log('3. Remover Produto');
    console.log('4. Publicar Alterações no Site (Git Push)');
    console.log('5. Sair');
    
    const choice = await question('\nEscolha uma opção: ');
    
    if (choice === '1') {
      beep();
      await listProducts();
    } else if (choice === '2') {
      beep();
      await addProduct();
    } else if (choice === '3') {
      beep();
      await removeProduct();
    } else if (choice === '4') {
      beep();
      await deployToGit();
    } else if (choice === '5') {
      console.log('Saindo...');
      beep();
      rl.close();
      break;
    } else {
      beep();
      beep();
      console.log('Opção inválida!');
    }
  }
}

async function deployToGit() {
  console.log('\nIniciando publicação no site...');
  console.log('Isso vai enviar as alterações para o repositório Git e disparar o deploy na Netlify.');
  
  const confirm = await question('Deseja continuar? (s/n): ');
  if (confirm.toLowerCase() !== 's') {
    console.log('Operação cancelada.\n');
    return;
  }

  const commands = [
    'git add "data/products.json"',
    'git commit -m "Atualizacao de produtos via Gerenciador"',
    'git push'
  ];

  for (const cmd of commands) {
    try {
      console.log(`\nExecutando: ${cmd}...`);
      await new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            // Se o erro for "nothing to commit", não é um problema grave
            if (stdout.includes('nothing to commit') || stderr.includes('nothing to commit')) {
              console.log('Nenhuma alteração pendente para enviar.');
              resolve();
              return;
            }
            reject(error);
            return;
          }
          console.log(stdout);
          resolve();
        });
      });
    } catch (error) {
      console.error(`Erro ao executar comando: ${error.message}`);
      console.log('Verifique se o Git está instalado e configurado corretamente nesta pasta.');
      return;
    }
  }
  
  console.log('\n✅ Publicação concluída! O site deve atualizar em alguns minutos.\n');
}

async function listProducts() {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  // Ordenar por ID para facilitar a visualização
  data.sort((a, b) => a.id - b.id);

  console.log('\n--- Lista de Produtos ---');
  data.forEach(p => {
    console.log(`[ID: ${p.id.toString().padEnd(3)}] ${p.name} - R$ ${p.price.toFixed(2)}${p.isDigital ? ' (Digital)' : ''}`);
  });
  console.log('-------------------------');
  console.log(`Total de produtos cadastrados: ${data.length}`);
  console.log('-------------------------\n');
}async function removeProduct() {
  await listProducts();
  const idStr = await question('Digite o ID do produto para remover (ou Enter para cancelar): ');
  
  if (!idStr) return;
  
  const id = parseInt(idStr);
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  const index = data.findIndex(p => p.id === id);
  
  if (index === -1) {
    console.log('\n❌ Produto não encontrado!\n');
    return;
  }
  
  const product = data[index];
  const confirm = await question(`\nTem certeza que deseja remover "${product.name}"? (s/n): `);
  
  if (confirm.toLowerCase() === 's') {
    data.splice(index, 1);
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    console.log('\n✅ Produto removido com sucesso!\n');
  } else {
    console.log('\nOperação cancelada.\n');
  }
}

async function addProduct() {
  const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  console.log('\n--- Adicionar Novo Produto ---');
  
  // Solicitar ID manual
  let newId;
  while (true) {
    const idStr = await question('Digite o ID para o novo produto: ');
    const parsedId = parseInt(idStr);
    
    if (isNaN(parsedId)) {
      console.log('❌ ID inválido. Digite um número.');
      continue;
    }
    
    if (data.some(p => p.id === parsedId)) {
      console.log(`❌ O ID ${parsedId} já existe! Tente outro.`);
      continue;
    }
    
    newId = parsedId;
    break;
  }
  
  console.log(`\nCriando produto com ID: ${newId}`);
  
  const name = await question('Nome do produto: ');
  const category = await question('Categoria: ');
  const priceStr = await question('Preço (ex: 99.90): ');
  const price = parseFloat(priceStr.replace(',', '.'));
  const isDigitalStr = await question('É um produto digital? (s/n): ');
  const isDigital = isDigitalStr.toLowerCase() === 's';
  const description = await question('Descrição curta: ');
  const imageUrl = await question('URL da Imagem (Link): ');
  
  // Coleta de especificações baseada na categoria
    const specifications = [];
    
    // Perguntas específicas para Livros
    if (category.toLowerCase().includes('livro')) {
      console.log('\n--- Detalhes do Livro ---');
      const coverType = await question('Tipo de capa (Dura/Mole/Brochura): ');
      if (coverType) specifications.push({ label: 'Capa', value: coverType });
      
      const pages = await question('Número de páginas: ');
      if (pages) specifications.push({ label: 'Páginas', value: pages });
    }
    
    // Perguntas específicas para Itens Rituais (Talit, Kipá, etc)
    else if (category.toLowerCase().includes('ritual') || category.toLowerCase().includes('talit') || category.toLowerCase().includes('kipá')) {
      console.log('\n--- Detalhes do Item Ritual ---');
      const fabric = await question('Tipo de tecido: ');
      if (fabric) specifications.push({ label: 'Tecido', value: fabric });
      
      const size = await question('Tamanho (ex: G, 60x180cm): ');
      if (size) specifications.push({ label: 'Tamanho', value: size });
    }

    // Coleta de Peso e Dimensões para produtos físicos
    let dimensions = undefined;
    if (!isDigital) {
      console.log('\n--- Dados para Cálculo de Frete ---');
      const weightStr = await question('Peso em kg (ex: 0.5): ');
      const weight = parseFloat(weightStr.replace(',', '.')) || 0.3; // Default 300g
      
      console.log('Dimensões da embalagem em cm:');
      const heightStr = await question('Altura (ex: 5): ');
      const widthStr = await question('Largura (ex: 15): ');
      const lengthStr = await question('Comprimento (ex: 20): ');
      
      dimensions = {
        weight: weight,
        height: parseFloat(heightStr) || 5,
        width: parseFloat(widthStr) || 15,
        length: parseFloat(lengthStr) || 20
      };
      
      // Adicionar peso às especificações visíveis também
      specifications.push({ label: 'Peso Aproximado', value: `${weight} kg` });
      specifications.push({ label: 'Dimensões (AxLxC)', value: `${dimensions.height}x${dimensions.width}x${dimensions.length} cm` });
    }
    
    const newProduct = {
      id: newId,
      name,
      category,
      price,
      image: imageUrl || "https://picsum.photos/800/800?random=" + newId,
      images: [imageUrl || "https://picsum.photos/800/800?random=" + newId],
      description,
      detailedDescription: description,
      specifications: specifications,
      rating: 5.0,
      ratingCount: 0,
      isDigital: isDigital,
      dimensions: dimensions
    };
  
  data.push(newProduct);
  
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
  console.log('\n✅ Produto adicionado com sucesso!\n');
}

main().catch(console.error);
