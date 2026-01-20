const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');

// Define o caminho do arquivo de dados baseado no diretório atual de execução
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
    console.log('4. Editar Produto');
    console.log('5. Publicar Alterações no Site (Git Push)');
    console.log('6. Sair');
    
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
      await editProduct();
    } else if (choice === '5') {
      beep();
      await deployToGit();
    } else if (choice === '6') {
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
  try {
    if (!fs.existsSync(PRODUCTS_FILE)) {
      console.log('\nArquivo de produtos não encontrado em: ' + PRODUCTS_FILE);
      console.log('Certifique-se de que a pasta "data" está junto com o executável.\n');
      return;
    }
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
  } catch (error) {
    console.error('Erro ao listar produtos:', error.message);
  }
}

async function editProduct() {
  await listProducts();
  const idStr = await question('Digite o ID do produto para editar (ou Enter para cancelar): ');
  
  if (!idStr) return;
  
  const id = parseInt(idStr);
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    const index = data.findIndex(p => p.id === id);
    
    if (index === -1) {
      console.log('\n❌ Produto não encontrado!\n');
      return;
    }
    
    let product = data[index];
    console.log(`\n--- Editando: ${product.name} ---`);
    console.log('1. Editar Dados Básicos (Nome, Preço, Categoria, Descrição, Imagem)');
    console.log('2. Gerenciar Especificações (Adicionar/Remover/Limpar)');
    console.log('3. Editar Peso e Dimensões');
    console.log('4. Enriquecer Descrição Detalhada');
    console.log('5. Alternar entre Digital/Físico');
    console.log('0. Voltar');
    
    const choice = await question('\nEscolha uma opção: ');
    
    if (choice === '1') {
       const newName = await question(`Nome (${product.name}): `);
       if (newName) product.name = newName;
       
       const newPrice = await question(`Preço (${product.price}): `);
       if (newPrice) product.price = parseFloat(newPrice.replace(',', '.'));
       
       const newCat = await question(`Categoria (${product.category}): `);
       if (newCat) product.category = newCat;
       
       const newDesc = await question(`Descrição Curta (${product.description}): `);
       if (newDesc) {
         product.description = newDesc;
         // Se não tiver detailedDescription, usa a curta como base
         if (!product.detailedDescription) product.detailedDescription = newDesc;
       }

       const newImg = await question(`URL Imagem (${product.image}): `);
       if (newImg) {
         product.image = newImg;
         product.images = [newImg];
       }

    } else if (choice === '2') {
       console.log('\n--- Especificações Atuais ---');
       if (product.specifications && product.specifications.length > 0) {
         product.specifications.forEach((s, i) => {
            console.log(`${i+1}. ${s.label}: ${s.value}`);
         });
       } else {
         console.log('(Nenhuma especificação cadastrada)');
       }
       
       console.log('\nA. Adicionar nova');
       console.log('R. Remover uma especificação');
       console.log('L. Limpar TUDO (Remove duplicatas)');
       console.log('V. Voltar');
       
       const subChoice = await question('\nOpção: ');
       
       if (!product.specifications) product.specifications = [];

       if (subChoice.toLowerCase() === 'a') {
          const label = await question('Nome do campo (ex: Material): ');
          const value = await question('Valor (ex: Algodão): ');
          if (label && value) product.specifications.push({ label, value });
       } else if (subChoice.toLowerCase() === 'r') {
          const idxStr = await question('Número da especificação para remover: ');
          const idx = parseInt(idxStr) - 1;
          if (idx >= 0 && idx < product.specifications.length) {
            product.specifications.splice(idx, 1);
            console.log('Removido.');
          }
       } else if (subChoice.toLowerCase() === 'l') {
          const confirm = await question('Tem certeza que deseja apagar TODAS as especificações? (s/n): ');
          if (confirm.toLowerCase() === 's') {
            product.specifications = [];
            console.log('Especificações limpas.');
          }
       }

    } else if (choice === '3') {
       console.log('\n--- Editar Peso e Dimensões ---');
       const wStr = await question(`Peso (${product.dimensions?.weight || 0} kg): `);
       const hStr = await question(`Altura (${product.dimensions?.height || 0} cm): `);
       const wdStr = await question(`Largura (${product.dimensions?.width || 0} cm): `);
       const lStr = await question(`Comprimento (${product.dimensions?.length || 0} cm): `);
       
       if (!product.dimensions) product.dimensions = {};
       
       if (wStr) product.dimensions.weight = parseFloat(wStr.replace(',', '.'));
       if (hStr) product.dimensions.height = parseFloat(hStr);
       if (wdStr) product.dimensions.width = parseFloat(wdStr);
       if (lStr) product.dimensions.length = parseFloat(lStr);
       
    } else if (choice === '4') {
       console.log('\n--- Enriquecer Descrição Detalhada ---');
       console.log('Descrição Detalhada Atual:');
       console.log(product.detailedDescription || product.description);
       console.log('\n-----------------------------------');
       console.log('1. Substituir TUDO');
       console.log('2. Adicionar parágrafos ao final');
       console.log('0. Cancelar');
       
       const descOption = await question('Opção: ');
       
       if (descOption === '1') {
         console.log('Digite a nova descrição detalhada (pode colar texto longo):');
         const newFullDesc = await question('> ');
         if (newFullDesc) product.detailedDescription = newFullDesc;
       } else if (descOption === '2') {
         if (!product.detailedDescription) product.detailedDescription = product.description;
         while(true) {
            const extraPara = await question('Adicionar parágrafo (Enter para finalizar): ');
            if (!extraPara) break;
            product.detailedDescription += '\n\n' + extraPara;
         }
       }

    } else if (choice === '5') {
       const isDig = await question(`Produto é Digital? Atual: ${product.isDigital ? 'SIM' : 'NÃO'} (s/n): `);
       if (isDig) product.isDigital = isDig.toLowerCase() === 's';
    }

    // Save
    data[index] = product;
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    console.log('\n✅ Produto atualizado com sucesso!\n');

  } catch (error) {
    console.error('Erro ao editar produto:', error.message);
  }
}

async function removeProduct() {
  await listProducts();
  const idStr = await question('Digite o ID do produto para remover (ou Enter para cancelar): ');
  
  if (!idStr) return;
  
  const id = parseInt(idStr);
  try {
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
  } catch (error) {
    console.error('Erro ao remover produto:', error.message);
  }
}

async function addProduct() {
  try {
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

    console.log('\n--- Especificações Gerais (Pressione Enter para pular) ---');
    const material = await question('Material (ex: Algodão, Prata, Madeira): ');
    if (material) specifications.push({ label: 'Material', value: material });

    const color = await question('Cor Predominante: ');
    if (color) specifications.push({ label: 'Cor', value: color });

    const warranty = await question('Garantia (ex: 3 meses): ');
    if (warranty) specifications.push({ label: 'Garantia', value: warranty });
    
    // Perguntas específicas para Livros
    if (category.toLowerCase().includes('livro')) {
      console.log('\n--- Detalhes do Livro ---');
      const coverType = await question('Tipo de capa (Dura/Mole/Brochura): ');
      if (coverType) specifications.push({ label: 'Capa', value: coverType });
      
      const pages = await question('Número de páginas: ');
      if (pages) specifications.push({ label: 'Páginas', value: pages });
      
      const author = await question('Autor: ');
      if (author) specifications.push({ label: 'Autor', value: author });

      const language = await question('Idioma (ex: Português/Hebraico): ');
      if (language) specifications.push({ label: 'Idioma', value: language });
    }
    
    // Perguntas específicas para Itens Rituais (Talit, Kipá, etc)
    else if (category.toLowerCase().includes('ritual') || category.toLowerCase().includes('talit') || category.toLowerCase().includes('kipá')) {
      console.log('\n--- Detalhes do Item Ritual ---');
      
      const fabric = await question('Tipo de tecido (se diferente do Material): ');
      if (fabric) specifications.push({ label: 'Tecido', value: fabric });
      
      const size = await question('Tamanho (ex: G, 60x180cm): ');
      if (size) specifications.push({ label: 'Tamanho', value: size });

      const origin = await question('Origem (ex: Importado de Israel): ');
      if (origin) specifications.push({ label: 'Origem', value: origin });
    }

    console.log('\n--- Enriquecimento da Descrição ---');
    console.log('Você pode adicionar parágrafos extras para a descrição detalhada.');
    let detailedDescription = description;
    
    while(true) {
        const extraPara = await question('Adicionar parágrafo extra? (Digite o texto ou Enter para finalizar): ');
        if (!extraPara) break;
        detailedDescription += '\n\n' + extraPara;
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
      detailedDescription: detailedDescription,
      specifications: specifications,
      rating: 5.0,
      ratingCount: 0,
      isDigital: isDigital,
      dimensions: dimensions
    };
    
    data.push(newProduct);
    
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2));
    console.log('\n✅ Produto adicionado com sucesso!\n');
  } catch (error) {
    console.error('Erro ao adicionar produto:', error.message);
  }
}

main().catch(console.error);
