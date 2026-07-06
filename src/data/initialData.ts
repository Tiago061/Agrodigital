export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  price: number;
  promoPrice: number | null;
  image: string;
  stock: number;
  minStock: number;
  unit: string;
  sku: string;
  isActive: boolean;
  isFeatured: boolean;
  isControlled: boolean;
  useIndication: string;
  technicalDesc: string;
}

export interface Client {
  id: string;
  name: string;
  cpfCnpj: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  clientType: 'produtor_rural' | 'empresa' | 'cliente_pet' | 'fazenda' | 'revendedor';
  notes: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  items: OrderItem[];
  totalValue: number;
  status: 'novo' | 'em_analise' | 'aguardando_pagamento' | 'separado' | 'enviado' | 'concluido' | 'cancelado';
  deliveryMethod: 'retirada' | 'entrega';
  deliveryAddress: string;
  originChannel: 'whatsapp' | 'web' | 'balcao';
  internalNotes: string;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'entrada' | 'saida';
  quantity: number;
  reason: string;
  createdAt: string;
}

export interface Service {
  slug: string;
  name: string;
  description: string;
  benefits: string[];
  iconName: string;
  fullDescription: string;
}

export const INITIAL_CATEGORIES = [
  'Rações',
  'Medicamentos veterinários',
  'Sementes',
  'Fertilizantes',
  'Defensivos agrícolas',
  'Ferramentas',
  'Equipamentos rurais',
  'Produtos pet',
  'Selaria e montaria',
  'Irrigação',
  'Jardinagem'
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Ração AgroCrescer Alta Performance Bovinos',
    category: 'Rações',
    brand: 'NutriCampo',
    description: 'Ração de alta qualidade indicada para bovinos de corte em fase de engorda rápida. Rica em minerais e proteínas essenciais.',
    price: 135.90,
    promoPrice: 124.90,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60',
    stock: 45,
    minStock: 10,
    unit: 'Saco 40kg',
    sku: 'RAC-BOV-001',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Fornecer diariamente aos animais em cochos apropriados, na proporção de 1% do peso vivo.',
    technicalDesc: 'Níveis de Garantia: Proteína Bruta (mín) 18%, Extrato Etéreo (mín) 3%, Fibra Bruta (máx) 10%, Cálcio (mín/máx) 1.2%/1.8%.'
  },
  {
    id: 'prod-2',
    name: 'Vacina contra Febre Aftosa AftoShield',
    category: 'Medicamentos veterinários',
    brand: 'VetSana',
    description: 'Vacina inativada contra Febre Aftosa. Emulsão oleosa de altíssima eficácia protetora para bovinos e bubalinos.',
    price: 189.00,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    stock: 8,
    minStock: 15, // Vai disparar alerta visual
    unit: 'Frasco 50 doses',
    sku: 'MED-AFT-002',
    isActive: true,
    isFeatured: true,
    isControlled: true,
    useIndication: 'Aplicação via subcutânea ou intramuscular na tábua do pescoço. Dose de 2ml por animal.',
    technicalDesc: 'Conservar sob refrigeração de 2°C a 8°C. Não congelar. Agitar bem antes de usar.'
  },
  {
    id: 'prod-3',
    name: 'Fertilizante Mineral NPK 10-10-10',
    category: 'Fertilizantes',
    brand: 'TerraForte',
    description: 'Adubo granulado completo para nutrição de lavouras, hortas e pastagens. Fórmula equilibrada para crescimento saudável.',
    price: 89.90,
    promoPrice: 79.90,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?w=500&auto=format&fit=crop&q=60',
    stock: 60,
    minStock: 20,
    unit: 'Saco 25kg',
    sku: 'FER-NPK-003',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Ideal para plantio e cobertura de diversas culturas agrícolas. Incorporar ao solo conforme análise recomendada.',
    technicalDesc: 'Fórmula NPK (Nitrogênio 10%, Fósforo 10%, Potássio 10%). Enriquecido com microelementos.'
  },
  {
    id: 'prod-4',
    name: 'Semente de Milho Híbrido AgroMax H22',
    category: 'Sementes',
    brand: 'SementesValle',
    description: 'Sementes de milho híbrido de ciclo precoce, com alta tolerância a pragas e excelente rendimento de grãos.',
    price: 320.00,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=500&auto=format&fit=crop&q=60',
    stock: 25,
    minStock: 5,
    unit: 'Saco 60.000 sementes',
    sku: 'SEM-MIL-004',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Indicado para plantio na safra e safrinha em regiões de clima temperado e tropical.',
    technicalDesc: 'Germinação mínima 90%. Pureza mínima 99%. Tratado com fungicida protetor de sementes.'
  },
  {
    id: 'prod-5',
    name: 'Defensivo Herbicida Total GlifoMax',
    category: 'Defensivos agrícolas',
    brand: 'AgroChem',
    description: 'Herbicida sistêmico não seletivo para controle de plantas daninhas anuais e perenes em áreas agrícolas e pastos.',
    price: 245.00,
    promoPrice: 229.00,
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=500&auto=format&fit=crop&q=60',
    stock: 12,
    minStock: 8,
    unit: 'Galão 5L',
    sku: 'DEF-HER-005',
    isActive: true,
    isFeatured: false,
    isControlled: true,
    useIndication: 'Aplicação foliar por pulverização tratorizada ou costal. Uso exclusivo sob prescrição do receituário agronômico.',
    technicalDesc: 'Concentrado Solúvel (SL). Ingrediente ativo: Glifosato 480 g/L. Classe toxicológica IV.'
  },
  {
    id: 'prod-6',
    name: 'Cavadeira Articulada de Aço Reforçado',
    category: 'Ferramentas',
    brand: 'MetalAgro',
    description: 'Cavadeira robusta com cabos de madeira de lei. Ideal para perfurar solos duros, compactados ou pedregosos com facilidade.',
    price: 94.90,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615ad?w=500&auto=format&fit=crop&q=60',
    stock: 18,
    minStock: 5,
    unit: 'Unidade',
    sku: 'FER-CAV-006',
    isActive: true,
    isFeatured: false,
    isControlled: false,
    useIndication: 'Utilizada na agricultura, jardinagem e construção civil para fazer buracos de postes ou mourões.',
    technicalDesc: 'Estrutura em aço carbono temperado com acabamento em pintura eletrostática anti-corrosão. Cabos de 120cm.'
  },
  {
    id: 'prod-7',
    name: 'Pulverizador Costal Elétrico 20 Litros',
    category: 'Equipamentos rurais',
    brand: 'JactoClean',
    description: 'Pulverizador profissional com bateria recarregável. Autonomia de até 6 horas de trabalho contínuo com alta pressão regulável.',
    price: 499.00,
    promoPrice: 469.00,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&auto=format&fit=crop&q=60',
    stock: 4,
    minStock: 5, // Alerta
    unit: 'Unidade',
    sku: 'EQP-PUL-007',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Recomendado para pulverização de defensivos, fertilizantes foliares e sanitizantes em plantações ou granjas.',
    technicalDesc: 'Capacidade nominal: 20 litros. Bateria de Lítio 12V 8Ah. Pressão máxima de trabalho: 4.5 bar. Inclui 4 bicos.'
  },
  {
    id: 'prod-8',
    name: 'Ração Premium para Cães Adultos 15kg',
    category: 'Produtos pet',
    brand: 'DogShow',
    description: 'Ração super premium sabor carne e vegetais para cães adultos de raças médias e grandes. Sem corantes artificiais.',
    price: 159.90,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format&fit=crop&q=60',
    stock: 35,
    minStock: 8,
    unit: 'Saco 15kg',
    sku: 'PET-RAC-008',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Servir seca, duas a três refeições ao dia, conforme orientação da tabela de peso corporal no verso.',
    technicalDesc: 'Composição básica: Carne bovina mecanicamente separada, quirera de arroz, milho integral moído, ômega 3 e 6.'
  },
  {
    id: 'prod-9',
    name: 'Sela Americana Completa Couro Legítimo',
    category: 'Selaria e montaria',
    brand: 'SelariaNacional',
    description: 'Sela de luxo para passeio, trabalho ou cavalgada. Fabricada em couro bovino selecionado, ferragens em aço inox.',
    price: 1250.00,
    promoPrice: 1150.00,
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa52?w=500&auto=format&fit=crop&q=60',
    stock: 2,
    minStock: 2,
    unit: 'Unidade',
    sku: 'SEL-AMR-009',
    isActive: true,
    isFeatured: true,
    isControlled: false,
    useIndication: 'Indicada para montaria de cavalos das raças Quarto de Milha, Mangalarga, Crioulo, entre outras.',
    technicalDesc: 'Estrutura em fibra de vidro leve e de alta resistência. Suadores de feltro soft. Acompanha cabeçada, rédea, loro e estribos.'
  },
  {
    id: 'prod-10',
    name: 'Aspersor Canhão para Irrigação 1.1/2"',
    category: 'Irrigação',
    brand: 'AquaDrop',
    description: 'Aspersor de impacto circular e setorial de longo alcance. Ideal para irrigação agrícola de grandes pastagens ou plantios.',
    price: 340.00,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&auto=format&fit=crop&q=60',
    stock: 15,
    minStock: 4,
    unit: 'Unidade',
    sku: 'IRR-ASP-010',
    isActive: true,
    isFeatured: false,
    isControlled: false,
    useIndication: 'Instalação em cavalete hidráulico. Pressão de operação recomendada de 2 a 4 bar.',
    technicalDesc: 'Conexão rosca fêmea de 1.1/2 BSP. Raio de alcance aproximado: 22m a 35m. Vazão: 4 a 12 m³/h.'
  },
  {
    id: 'prod-11',
    name: 'Tesoura de Poda Profissional Jardinagem',
    category: 'Jardinagem',
    brand: 'TramontinaPro',
    description: 'Tesoura de poda bypass com lâminas de aço carbono temperado de alta precisão. Cabos anatômicos emborrachados.',
    price: 64.90,
    promoPrice: 54.90,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&auto=format&fit=crop&q=60',
    stock: 22,
    minStock: 6,
    unit: 'Unidade',
    sku: 'JAD-TES-011',
    isActive: true,
    isFeatured: false,
    isControlled: false,
    useIndication: 'Ideal para podar galhos verdes, flores, arbustos e fazer manutenção fina de hortas domésticas.',
    technicalDesc: 'Capacidade máxima de corte: 20mm de diâmetro. Trava de segurança para fechamento rápido das lâminas.'
  }
];

export const INITIAL_SERVICES: Service[] = [
  {
    slug: 'consultoria-rural',
    name: 'Consultoria Rural & Assistência Técnica',
    description: 'Visita técnica de agrônomos especializados para planejar e otimizar a produtividade da sua plantação ou pastagem.',
    benefits: [
      'Planejamento de lavouras e pastagens',
      'Identificação de pragas e doenças no campo',
      'Planejamento de rotação de culturas',
      'Maximização de eficiência no uso de fertilizantes'
    ],
    iconName: 'Sprout',
    fullDescription: 'Nossa Consultoria Rural leva engenheiros agrônomos diretamente à sua propriedade rural. Analisamos detalhadamente a topografia, o histórico da terra, o clima local e a infraestrutura existente para traçar um plano de produção sustentável, rentável e escalável. Seja para pequenos produtores ou grandes fazendas, temos soluções personalizadas que melhoram os índices zootécnicos e fitossanitários da sua produção.'
  },
  {
    slug: 'vacinacao-animal',
    name: 'Campanhas de Vacinação Animal',
    description: 'Suporte e aplicação de vacinas obrigatórias e preventivas em rebanhos de bovinos, equinos, caprinos e ovinos.',
    benefits: [
      'Garantia de aplicação segura e estéril',
      'Cumprimento do calendário oficial de vacinas',
      'Prevenção de febre aftosa, raiva, brucelose e carbúnculo',
      'Emissão de laudo veterinário'
    ],
    iconName: 'ShieldAlert',
    fullDescription: 'A saúde do seu rebanho é o seu maior patrimônio. Contamos com médicos veterinários qualificados e equipamentos de refrigeração móveis de última geração para garantir a cadeia de frio e a eficácia das vacinas durante o transporte e a aplicação. Evite perdas financeiras e multas governamentais mantendo o calendário vacinal do seu rebanho 100% regularizado.'
  },
  {
    slug: 'atendimento-veterinario',
    name: 'Atendimento Clínico Veterinário',
    description: 'Atendimento clínico focado em animais de grande porte (bovinos, equinos) e orientação fitossanitária de rebanhos.',
    benefits: [
      'Diagnósticos laboratoriais rápidos e precisos',
      'Cirurgias de campo sob anestesia segura',
      'Ultrassonografia e exames de fertilidade',
      'Atendimento de urgência e emergência 24h'
    ],
    iconName: 'Stethoscope',
    fullDescription: 'Dispomos de uma equipe de veterinários de campo prontos para atender a chamados de urgência e exames de rotina. Nossos profissionais realizam avaliações obstétricas, diagnósticos de gestação por ultrassom, cirurgias de pequeno e médio porte e tratamentos clínicos diversos, garantindo o bem-estar animal e a biossegurança da propriedade.'
  },
  {
    slug: 'entrega-em-fazendas',
    name: 'Logística e Entrega Dedicada em Fazendas',
    description: 'Frota de caminhões própria para entrega de rações a granel, sementes, defensivos e ferramentas diretamente na sua fazenda.',
    benefits: [
      'Frota com rastreamento por satélite',
      'Descarga mecânica assistida e segura',
      'Prazos rápidos e pontualidade garantida',
      'Frete grátis ou subsidiado para grandes volumes'
    ],
    iconName: 'Truck',
    fullDescription: 'Esqueça o estresse de transportar sacarias pesadas ou galões de defensivos na caminhonete. Nossa logística conta com caminhões adequados para estradas vicinais de terra e de difícil acesso. Entregamos fertilizantes, rações, mourões, sal mineral e qualquer insumo agrícola diretamente nos galpões da sua propriedade rústica, com total segurança e presteza.'
  },
  {
    slug: 'analise-de-solo',
    name: 'Análise de Solo e Recomendação Química',
    description: 'Coleta científica de amostras de solo de sua lavoura, envio ao laboratório e formulação exata de correção (calcário/gesso).',
    benefits: [
      'Coleta profissional com GPS agrícola',
      'Análise em laboratórios credenciados pela Embrapa',
      'Recomendação precisa de dosagem de calcário e adubos',
      'Economia de recursos com fertilização excessiva'
    ],
    iconName: 'Layers',
    fullDescription: 'Uma colheita de sucesso começa debaixo da terra. O serviço de análise de solo da AgroConnect realiza a coleta em profundidades adequadas (0-20cm e 20-40cm) em diferentes glebas da propriedade. Com os resultados do laudo em mãos, nosso agrônomo prescreve exatamente as quantidades necessárias de calcário, gesso e fertilizantes corretivos, evitando desperdícios e superdosagens.'
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Tiago de Souza Santos',
    cpfCnpj: '123.456.789-00',
    phone: '(61) 99876-5432',
    whatsapp: '5561998765432',
    email: 'tiago.fazendabonito@gmail.com',
    address: 'Fazenda Campo Belo, KM 45, Rodovia GO-118, Planaltina - GO',
    clientType: 'produtor_rural',
    notes: 'Produtor rural focado em milho e soja. Compra fertilizantes NPK e defensivos com frequência.',
    createdAt: '2026-05-10T14:32:00Z'
  },
  {
    id: 'cli-2',
    name: 'Maria Helena Rodrigues',
    cpfCnpj: '987.654.321-11',
    phone: '(11) 98888-7777',
    whatsapp: '5511988887777',
    email: 'maria.helena@petlove.com.br',
    address: 'Rua das Flores, 120, Centro - Bragança Paulista - SP',
    clientType: 'cliente_pet',
    notes: 'Cliente fiel de ração super premium e acessórios pet. Possui dois cães labradores.',
    createdAt: '2026-06-01T09:15:00Z'
  },
  {
    id: 'cli-3',
    name: 'Agropecuária Vale do Araguaia Ltda',
    cpfCnpj: '12.345.678/0001-90',
    phone: '(62) 3456-7890',
    whatsapp: '556234567890',
    email: 'compras@valedoaraguaia.com.br',
    address: 'Av. Brasil, 1500, Setor Industrial - Rio Verde - GO',
    clientType: 'revendedor',
    notes: 'Revendedor de produtos na região norte de Goiás. Compra ferramentas e selaria em grande escala.',
    createdAt: '2026-04-20T11:22:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'AD-1001',
    clientId: 'cli-1',
    clientName: 'Tiago de Souza Santos',
    items: [
      {
        productId: 'prod-1',
        name: 'Ração AgroCrescer Alta Performance Bovinos',
        price: 124.90,
        quantity: 5,
        unit: 'Saco 40kg'
      },
      {
        productId: 'prod-3',
        name: 'Fertilizante Mineral NPK 10-10-10',
        price: 79.90,
        quantity: 10,
        unit: 'Saco 25kg'
      }
    ],
    totalValue: 1423.50,
    status: 'concluido',
    deliveryMethod: 'entrega',
    deliveryAddress: 'Fazenda Campo Belo, KM 45, Rodovia GO-118, Planaltina - GO',
    originChannel: 'whatsapp',
    internalNotes: 'Entregar na fazenda com caminhão trucado. Falar com o gerente Wilson na chegada.',
    createdAt: '2026-07-02T10:00:00Z'
  },
  {
    id: 'AD-1002',
    clientId: 'cli-2',
    clientName: 'Maria Helena Rodrigues',
    items: [
      {
        productId: 'prod-8',
        name: 'Ração Premium para Cães Adultos 15kg',
        price: 159.90,
        quantity: 2,
        unit: 'Saco 15kg'
      }
    ],
    totalValue: 319.80,
    status: 'novo',
    deliveryMethod: 'retirada',
    deliveryAddress: 'Retirada na loja física pelo cliente',
    originChannel: 'web',
    internalNotes: 'Cliente informou que retira no sábado de manhã.',
    createdAt: '2026-07-05T16:45:00Z'
  }
];

export const INITIAL_STOCK_HISTORY: StockMovement[] = [
  {
    id: 'mov-1',
    productId: 'prod-1',
    productName: 'Ração AgroCrescer Alta Performance Bovinos',
    type: 'entrada',
    quantity: 50,
    reason: 'Compra de fornecedor NutriCampo',
    createdAt: '2026-07-01T08:00:00Z'
  },
  {
    id: 'mov-2',
    productId: 'prod-1',
    productName: 'Ração AgroCrescer Alta Performance Bovinos',
    type: 'saida',
    quantity: 5,
    reason: 'Venda de Orçamento AD-1001',
    createdAt: '2026-07-02T10:05:00Z'
  },
  {
    id: 'mov-3',
    productId: 'prod-2',
    productName: 'Vacina contra Febre Aftosa AftoShield',
    type: 'saida',
    quantity: 12,
    reason: 'Uso interno / Ajuste de estoque vencido',
    createdAt: '2026-07-04T15:30:00Z'
  }
];
