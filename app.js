const STORAGE_KEY = "farmLegacy.web.v3";

const alzFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

const decimalFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

const defaultSettings = {
  "Núcleo de Aprimoramento (Extremo)": 3000000,
  "Núcleo de Aprimoramento (Altíssimo)": 135000,
  "Núcleo de Aprimoramento (Alto)": 250000,
  "Núcleo de Aprimoramento (Médio)": 162000,
  "Núcleo de Aprimoramento (Baixo)": 87000,
  "Núcleo Arcano (Extremo)": 2400000,
  "Núcleo Arcano (Altíssimo)": 156000,
  "Núcleo Arcano (Alto)": 114000,
  "Núcleo Arcano (Médio)": 61000,
  "Núcleo Arcano (Baixo)": 38000,
  "Protetor PC (100 PC)": 11000000,
  "Card Cash Ouro (1000 Cash)": 77000000,
  "Alz base do Protetor PC": 3000000,
  "Quantidade de Núcleo de Aprimoramento (Altíssimo) no Protetor PC": 2,
  "Quantidade de Núcleo de Aprimoramento (Alto) no Protetor PC": 3,
};

const jewelPrices = {
  "Jóia Enfraquecida Vermelha": 3000000,
  "Jóia Enfraquecida Laranja": 5000000,
  "Jóia Enfraquecida Amarela": 10000000,
  "Jóia Enfraquecida Verde": 20000000,
  "Jóia Enfraquecida Azul": 40000000,
  "Jóia Enfraquecida Violeta": 60000000,
  "Jóia Enfraquecida Branca": 80000000,
};

function settingItem(item, qty = 1) {
  return {
    item,
    qty,
    priceKey: item,
  };
}

function fixedItem(item, qty, price) {
  return {
    item,
    qty,
    price,
  };
}

function alzEntry(qty) {
  return {
    item: "Alz",
    qty,
    price: 1,
    category: "Alz",
  };
}

function gemEntry(item, qty) {
  return {
    item,
    qty,
    priceMode: "gem",
    category: "Gema",
  };
}

function farmSetting(item, qtyPerRun, category) {
  return {
    item,
    qtyPerRun,
    category,
    priceKey: item,
  };
}

function jewel(item, qtyPerRun) {
  return {
    item,
    qtyPerRun,
    category: "Jóia",
    price: jewelPrices[item] || 0,
  };
}

function special(item, qtyPerRun, price) {
  return {
    item,
    qtyPerRun,
    category: "Especial",
    price,
  };
}

function drop(item, category) {
  return [item, category];
}

const commonAccessoryDrops = [
  drop("Anel da Sorte +2", "Acessório"),
  drop("Anel Crítico +2", "Acessório"),
  drop("Brinco Defensivo +2", "Acessório"),
  drop("Brinco do Vampiro +4", "Acessório"),
  drop("Brinco da Proteção +4", "Acessório"),
  drop("Brinco da Regeneração de Força Arcana +4", "Acessório"),
];

const capeDrops = [
  drop("Dragona do Sábio", "Dragona"),
  drop("Dragona do Lutador", "Dragona"),
  drop("Dragona do Guardião", "Dragona"),
  drop("Dragona da Ordem", "Dragona"),
];

const highValueDrops = [
  drop("Extensor de Slot (Alto)", "Extensor"),
  drop("Extensor de Slot (Altíssimo)", "Extensor"),
  drop("Cartão de Moto Astral - RW3", "Moto"),
  drop("Cartão de Moto Astral - PW5", "Moto"),
  drop("Runa de Essência (Ataque)", "Runa"),
  drop("Runa de Essência (Max. Taxa Crítica)", "Runa"),
];

const defaultDungeons = [
  {
    id: "lago",
    name: "Lago do Crepúsculo",
    pc: 5,
    minutes: 2.2,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Baixo)", 0.6, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Baixo)", 0.7, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Médio)", 0.25, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Vermelha", 0.03),
    ],
    extras: [
      drop("Equipamentos de Aço Negro", "Equipamento"),
      drop("Equipamentos de Aramida", "Equipamento"),
      drop("Equipamentos de Celestita", "Equipamento"),
      ...capeDrops,
      drop("Anel da Sorte +1", "Acessório"),
      drop("Anel Crítico +1", "Acessório"),
      drop("Cartão de Moto Astral - Azul", "Moto"),
      drop("Extensor de Slot (Baixo)", "Extensor"),
      drop("Extensor de Slot (Médio)", "Extensor"),
    ],
  },
  {
    id: "estacao",
    name: "Estação Ruína",
    pc: 5,
    minutes: 2.4,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Médio)", 0.45, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Médio)", 0.8, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Vermelha", 0.03),
    ],
    extras: [
      drop("Equipamentos de Titânio", "Equipamento"),
      drop("Equipamentos de Celestita", "Equipamento"),
      ...capeDrops,
      drop("Extensor de Slot (Médio)", "Extensor"),
      drop("Cartão de Moto Astral - Azul", "Moto"),
    ],
  },
  {
    id: "torre1",
    name: "Torre dos Mortos 1ss",
    pc: 5,
    minutes: 2.8,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Médio)", 0.55, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Médio)", 1.1, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Vermelha", 0.04),
    ],
    extras: [
      drop("Equipamentos de Ósmio", "Equipamento"),
      ...commonAccessoryDrops,
      ...capeDrops,
      drop("Extensor de Slot (Médio)", "Extensor"),
    ],
  },
  {
    id: "vulcanica",
    name: "Cidadela Vulcânica",
    pc: 5,
    minutes: 3,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.75, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 0.85, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Laranja", 0.04),
    ],
    extras: [
      drop("Equipamentos de Ósmio", "Equipamento"),
      ...commonAccessoryDrops,
      ...capeDrops,
      drop("Extensor de Slot (Alto)", "Extensor"),
      drop("Cartão de Moto Astral - RW3", "Moto"),
    ],
  },
  {
    id: "torre2",
    name: "Torre dos Mortos 2ss",
    pc: 5,
    minutes: 3.5,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 1.1, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.2, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Laranja", 0.04),
    ],
    extras: [
      drop("Equipamentos de Ósmio", "Equipamento"),
      ...commonAccessoryDrops,
      ...capeDrops,
      drop("Célula da Amígdala de Killian", "Especial"),
      ...highValueDrops,
    ],
  },
  {
    id: "templo1",
    name: "Templo Esquecido 1ss",
    pc: 5,
    minutes: 3.2,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.95, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.05, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Laranja", 0.05),
    ],
    extras: [
      drop("Equipamentos de SIGMetal", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      drop("Extensor de Slot (Alto)", "Extensor"),
    ],
  },
  {
    id: "castelo",
    name: "Castelo das Ilusões",
    pc: 4,
    minutes: 2.9,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [
      fixedItem("Coral Ilusório", 1, 139600),
      fixedItem("Pedra B. da Dimensão", 4, 100000),
      alzEntry(500000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 1),
      settingItem("Núcleo de Aprimoramento (Alto)", 1),
    ],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 1.12, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.2, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Laranja", 2),
    ],
    extras: [
      drop("Equipamentos de SIGMetal", "Equipamento"),
      drop("Equipamentos de Mithril", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "salao",
    name: "Salão Radiante do Castelo das Ilusões",
    pc: 5,
    minutes: 3.4,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 1.15, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.22, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Laranja", 0.06),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "siena1",
    name: "Altar de Siena 1ss",
    pc: 6,
    minutes: 2,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [
      fixedItem("Frutinha Parasitada", 1, 139600),
      fixedItem("Pedra B. da Dimensão", 4, 100000),
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 1),
      settingItem("Núcleo de Aprimoramento (Alto)", 1),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Alto)", 2.96, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Alto)", 1.43, "Núcleo Arcano"),
      special("Pedaço do Bracelete de Prideus", 1.14, 444000),
      jewel("Jóia Enfraquecida Vermelha", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      drop("Equipamentos do Protetor", "Equipamento"),
      drop("Equipamentos do Guarda", "Equipamento"),
      drop("Equipamentos do Místico", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "ilha",
    name: "Ilha Proibida",
    pc: 5,
    minutes: 3.8,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 1.2, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.3, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 0.05),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "siena2",
    name: "Altar de Siena 2ss",
    pc: 7,
    minutes: 2,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [
      fixedItem("Frutinha Parasitada", 1, 139600),
      fixedItem("Pedra B. da Dimensão", 5, 100000),
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 1),
      settingItem("Núcleo de Aprimoramento (Alto)", 1),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.71, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.32, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.71, "Núcleo Arcano"),
      farmSetting("Núcleo Arcano (Alto)", 1.96, "Núcleo Arcano"),
      special("Pedaço do Bracelete de Siena", 0.32, 2500000),
      jewel("Jóia Enfraquecida Vermelha", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      drop("Armas de SIGMetal", "Equipamento"),
      drop("Equipamentos de Mithril", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "templo2",
    name: "Templo Esquecido 2ss",
    pc: 5,
    minutes: 4.1,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Altíssimo)", 1.2, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.25, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 0.07),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "entreposto",
    name: "Entreposto das Máquinas",
    pc: 10,
    minutes: 4,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 1),
      settingItem("Núcleo Arcano (Altíssimo)", 1),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.3, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.3, "Núcleo Arcano"),
      jewel("Jóia Enfraquecida Laranja", 2),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "pandemonium",
    name: "Pandemonium",
    pc: 6,
    minutes: 3.7,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 1),
      settingItem("Núcleo Arcano (Altíssimo)", 1),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.25, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.2, "Núcleo Arcano"),
      jewel("Jóia Enfraquecida Amarela", 1),
      jewel("Jóia Enfraquecida Verde", 1),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "torre3p2",
    name: "Torre dos Mortos 3ss (Parte 2)",
    pc: 7,
    minutes: 4.5,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [
      alzEntry(500000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 2),
      settingItem("Núcleo de Aprimoramento (Alto)", 5),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.45, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.35, "Núcleo Arcano"),
      jewel("Jóia Enfraquecida Verde", 2),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "ilha-desperta",
    name: "Ilha Proibida (Desperta)",
    pc: 5,
    minutes: 4.5,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Altíssimo)", 1.4, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.5, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Verde", 0.08),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "templo2-desperto",
    name: "Templo Esquecido 2ss (Desperto)",
    pc: 11,
    minutes: 4.2,
    baseRuns: 30,
    canReset: true,
    resetRuns: 26,
    entries: [
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 2),
      settingItem("Núcleo de Aprimoramento (Alto)", 5),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.55, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.45, "Núcleo Arcano"),
      jewel("Jóia Enfraquecida Azul", 1),
      jewel("Jóia Enfraquecida Violeta", 1),
      jewel("Jóia Enfraquecida Branca", 1),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "acheron",
    name: "Acheron Arena",
    pc: 5,
    minutes: 3.6,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Altíssimo)", 1.2, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.2, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Verde", 0.07),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "castelo-apocrifos",
    name: "Castelo das Ilusões (Apócrifos)",
    pc: 7,
    minutes: 4,
    baseRuns: 30,
    canReset: true,
    resetRuns: 28,
    entries: [
      alzEntry(1000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 2),
      settingItem("Núcleo de Aprimoramento (Alto)", 5),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.55, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo Arcano (Altíssimo)", 1.45, "Núcleo Arcano"),
      jewel("Jóia Enfraquecida Azul", 1),
      jewel("Jóia Enfraquecida Violeta", 1),
      jewel("Jóia Enfraquecida Branca", 1),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "salao-apocrifos",
    name: "Salão Radiante do Castelo das Ilusões (Apócrifos)",
    pc: 5,
    minutes: 4.2,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Altíssimo)", 1.35, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.4, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Violeta", 0.08),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "torre3",
    name: "Torre dos Mortos 3ss",
    pc: 5,
    minutes: 4.5,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [],
    basic: [
      farmSetting("Núcleo Arcano (Altíssimo)", 1.45, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.45, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Verde", 0.08),
    ],
    extras: [
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "catacumba-premium",
    name: "Catacumba Gélida (Premium)",
    pc: 4,
    minutes: 1.4,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [gemEntry("Gema Arcana", 20)],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.1, "Núcleo Arcano"),
      farmSetting("Núcleo Arcano (Altíssimo)", 0.18, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 0.43, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.53, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      ...highValueDrops,
      drop("Espelho da Observação (Ouro)", "Especial"),
      drop("Gema da Liberação", "Gema"),
      drop("Livro de Treinamento de Minesta - Capítulo 28", "Livro"),
      drop("Pedaço do Cartão do Mercenário - Leedy", "Mercenário"),
      drop("Pedra Luminosa de Selena", "Especial"),
    ],
  },
  {
    id: "caverna-premium",
    name: "Caverna do Pânico (Premium)",
    pc: 4,
    minutes: 1.5,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [gemEntry("Gema Arcana", 20)],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
      farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      ...highValueDrops,
      drop("Gema da Liberação", "Gema"),
      drop("Livro de Treinamento de Minesta - Capítulo 28", "Livro"),
    ],
  },
  {
    id: "morada-premium",
    name: "Morada das Chamas Infernais (Premium)",
    pc: 4,
    minutes: 1.5,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [gemEntry("Gema Arcana", 20)],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
      farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      ...highValueDrops,
      drop("Gema da Liberação", "Gema"),
      drop("Pedra Luminosa de Selena", "Especial"),
    ],
  },
  {
    id: "locomotiva-premium",
    name: "Locomotiva Louca (Premium)",
    pc: 4,
    minutes: 1.5,
    baseRuns: 30,
    canReset: true,
    resetRuns: 30,
    entries: [gemEntry("Gema Arcana", 20)],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
      farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Amarela", 1),
      jewel("Jóia Enfraquecida Laranja", 1),
    ],
    extras: [
      ...highValueDrops,
      drop("Gema da Liberação", "Gema"),
      drop("Pedaço do Cartão do Mercenário - Leedy", "Mercenário"),
    ],
  },
  {
    id: "vale-dificil",
    name: "Vale Tempestuoso (Difícil)",
    pc: 4,
    minutes: 2.4,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [
      alzEntry(1000000),
      settingItem("Núcleo Arcano (Alto)", 1),
      settingItem("Núcleo de Aprimoramento (Alto)", 1),
    ],
    basic: [
      farmSetting("Núcleo Arcano (Alto)", 1.2, "Núcleo Arcano"),
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.35, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Vermelha", 2),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
    ],
  },
  {
    id: "vale-desperto",
    name: "Vale Tempestuoso (Desperto)",
    pc: 5,
    minutes: 2.8,
    baseRuns: 30,
    canReset: true,
    resetRuns: 28,
    entries: [
      alzEntry(2000000),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 2),
      settingItem("Núcleo de Aprimoramento (Alto)", 5),
    ],
    basic: [
      farmSetting("Núcleo de Aprimoramento (Alto)", 1.81, "Núcleo de Aprimoramento"),
      farmSetting("Núcleo de Aprimoramento (Altíssimo)", 1.72, "Núcleo de Aprimoramento"),
      jewel("Jóia Enfraquecida Azul", 1),
      jewel("Jóia Enfraquecida Violeta", 1),
    ],
    extras: [
      drop("Equipamentos de Mithril", "Equipamento"),
      drop("Equipamentos de Orichalcum", "Equipamento"),
      ...capeDrops,
      ...commonAccessoryDrops,
      ...highValueDrops,
      drop("Amuleto de Orphídia", "Acessório"),
    ],
  },
];

const app = {
  settings: clone(defaultSettings),
  dungeons: clone(defaultDungeons),
  ui: {
    selectedDungeon: "lago",
    runs: 30,
    useReset: false,
    sellPc: true,
    rankMode: "profit",
    countedDrops: {},
  },
};

const elements = {
  dungeonButtons: document.querySelector("#dungeon-buttons"),
  dungeonSearch: document.querySelector("#dungeon-search"),
  dungeonTitle: document.querySelector("#dungeon-title"),
  runsInput: document.querySelector("#runs-input"),
  resetToggle: document.querySelector("#reset-toggle"),
  sellPcToggle: document.querySelector("#sell-pc-toggle"),
  totalRuns: document.querySelector("#total-runs"),
  entryList: document.querySelector("#entry-list"),
  basicFarmList: document.querySelector("#basic-farm-list"),
  extraDropList: document.querySelector("#extra-drop-list"),
  countedDropList: document.querySelector("#counted-drop-list"),
  customDropForm: document.querySelector("#custom-drop-form"),
  customDropName: document.querySelector("#custom-drop-name"),
  customDropCategory: document.querySelector("#custom-drop-category"),
  pcPerRun: document.querySelector("#pc-per-run"),
  pcStatus: document.querySelector("#pc-status"),
  pcUnitValue: document.querySelector("#pc-unit-value"),
  pcTotalCount: document.querySelector("#pc-total-count"),
  pcTotalValue: document.querySelector("#pc-total-value"),
  metricEntryCost: document.querySelector("#metric-entry-cost"),
  metricBasic: document.querySelector("#metric-basic"),
  metricExtra: document.querySelector("#metric-extra"),
  metricPc: document.querySelector("#metric-pc"),
  metricProfit: document.querySelector("#metric-profit"),
  priceSettings: document.querySelector("#price-settings"),
  dungeonSettings: document.querySelector("#dungeon-settings"),
  gemUnitValue: document.querySelector("#gem-unit-value"),
  protectorCost: document.querySelector("#protector-cost"),
  pcProfit100: document.querySelector("#pc-profit-100"),
  pcProfit1: document.querySelector("#pc-profit-1"),
  rankingTable: document.querySelector("#ranking-table"),
  resetLocalData: document.querySelector("#reset-local-data"),
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadSavedData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    app.settings = { ...clone(defaultSettings), ...(saved.settings || {}) };
    app.dungeons = Array.isArray(saved.dungeons) ? saved.dungeons : clone(defaultDungeons);
    app.ui = {
      ...app.ui,
      ...(saved.ui || {}),
      countedDrops: saved.ui?.countedDrops || {},
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveData() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      settings: app.settings,
      dungeons: app.dungeons,
      ui: app.ui,
    }),
  );
}

function formatAlz(value) {
  const rounded = Math.round(Number(value) || 0);
  return `${alzFormat.format(rounded)} Alz`;
}

function formatNumber(value) {
  return decimalFormat.format(Number(value) || 0);
}

function numberValue(value) {
  return Math.max(0, Number(String(value).replace(",", ".")) || 0);
}

function currentDungeon() {
  return app.dungeons.find((dungeon) => dungeon.id === app.ui.selectedDungeon) || app.dungeons[0];
}

function gemUnitValue() {
  return (app.settings["Card Cash Ouro (1000 Cash)"] || 0) / 1000;
}

function protectorCost() {
  return (
    (app.settings["Alz base do Protetor PC"] || 0) +
    (app.settings["Núcleo de Aprimoramento (Altíssimo)"] || 0) *
      (app.settings["Quantidade de Núcleo de Aprimoramento (Altíssimo) no Protetor PC"] || 0) +
    (app.settings["Núcleo de Aprimoramento (Alto)"] || 0) *
      (app.settings["Quantidade de Núcleo de Aprimoramento (Alto) no Protetor PC"] || 0)
  );
}

function pcUnitProfit() {
  return ((app.settings["Protetor PC (100 PC)"] || 0) - protectorCost()) / 100;
}

function priceForLine(line) {
  if (line.priceMode === "gem") return gemUnitValue();
  if (line.priceKey) return app.settings[line.priceKey] || 0;
  return line.price || 0;
}

function effectiveRuns(dungeon = currentDungeon()) {
  const base = app.ui.runs || dungeon.baseRuns || 30;
  return base + (app.ui.useReset && dungeon.canReset ? dungeon.resetRuns || 0 : 0);
}

function entryCost(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return (dungeon.entries || []).reduce((sum, line) => sum + line.qty * priceForLine(line) * runs, 0);
}

function basicReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return (dungeon.basic || []).reduce((sum, line) => sum + line.qtyPerRun * priceForLine(line) * runs, 0);
}

function cashbackReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return (dungeon.basic || [])
    .filter((line) => line.category === "Jóia")
    .reduce((sum, line) => sum + line.qtyPerRun * priceForLine(line) * runs, 0);
}

function countedDrops(dungeon = currentDungeon()) {
  if (!app.ui.countedDrops[dungeon.id]) app.ui.countedDrops[dungeon.id] = [];
  return app.ui.countedDrops[dungeon.id];
}

function extraReturn(dungeon = currentDungeon()) {
  return countedDrops(dungeon).reduce((sum, line) => sum + line.qty * line.price, 0);
}

function pcReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return app.ui.sellPc ? dungeon.pc * runs * pcUnitProfit() : 0;
}

function profit(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), includeExtras = true) {
  const extras = includeExtras && dungeon.id === currentDungeon().id ? extraReturn(dungeon) : 0;
  return basicReturn(dungeon, runs) + extras + pcReturn(dungeon, runs) - entryCost(dungeon, runs);
}

function swatchClass(category) {
  if (category === "Núcleo de Aprimoramento") return "core";
  if (category === "Núcleo Arcano") return "arcane";
  if (category === "Jóia") return "jewel";
  if (category === "Especial") return "special";
  return "extra";
}

function renderView() {
  document.querySelectorAll(".view").forEach((view) => view.classList.remove("active-view"));
  const activeTab = document.querySelector(".nav-button.active");
  document.querySelector(`#${activeTab.dataset.view}-view`).classList.add("active-view");
}

function renderDungeonButtons() {
  const query = elements.dungeonSearch.value.trim().toLowerCase();
  elements.dungeonButtons.innerHTML = "";

  app.dungeons
    .filter((dungeon) => dungeon.name.toLowerCase().includes(query))
    .forEach((dungeon) => {
      const button = document.createElement("button");
      button.className = `dungeon-button ${dungeon.id === app.ui.selectedDungeon ? "active" : ""}`;
      button.textContent = dungeon.name;
      button.type = "button";
      button.addEventListener("click", () => {
        app.ui.selectedDungeon = dungeon.id;
        app.ui.runs = dungeon.baseRuns || 30;
        app.ui.useReset = false;
        saveData();
        render();
      });
      elements.dungeonButtons.appendChild(button);
    });
}

function renderEntries() {
  const dungeon = currentDungeon();
  elements.entryList.innerHTML = `
    <div class="table-row header">
      <span>Item</span>
      <span>Qtd/DG</span>
      <span>Preço</span>
      <span>Total</span>
    </div>
  `;

  if (!dungeon.entries?.length) {
    elements.entryList.innerHTML += `<div class="empty-state">Entrada ainda não cadastrada.</div>`;
    return;
  }

  dungeon.entries.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category || line.item)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      <input data-entry-index="${index}" data-entry-field="qty" type="number" min="0" step="0.01" value="${line.qty}" />
      <input data-entry-index="${index}" data-entry-field="price" type="number" min="0" step="1000" value="${priceForLine(line)}" ${line.priceKey || line.priceMode === "gem" ? "disabled" : ""} />
      <strong class="entry-total" data-entry-total="${index}">${formatAlz(line.qty * priceForLine(line) * effectiveRuns(dungeon))}</strong>
    `;
    elements.entryList.appendChild(row);
  });
}

function renderBasicFarm() {
  const dungeon = currentDungeon();
  elements.basicFarmList.innerHTML = `
    <div class="table-row header">
      <span>Item</span>
      <span>Qtd/DG</span>
      <span>Preço</span>
      <span>Total</span>
    </div>
  `;

  dungeon.basic.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      <input data-basic-index="${index}" data-basic-field="qtyPerRun" type="number" min="0" step="0.01" value="${line.qtyPerRun}" />
      <input data-basic-index="${index}" data-basic-field="price" type="number" min="0" step="1000" value="${priceForLine(line)}" />
      <strong class="basic-total" data-basic-total="${index}">${formatAlz(line.qtyPerRun * priceForLine(line) * effectiveRuns(dungeon))}</strong>
    `;
    elements.basicFarmList.appendChild(row);
  });
}

function renderExtraDrops() {
  const dungeon = currentDungeon();
  const used = new Set(countedDrops(dungeon).map((line) => line.item));
  elements.extraDropList.innerHTML = "";

  (dungeon.extras || [])
    .filter(([item]) => !used.has(item))
    .forEach(([item, category]) => {
      const row = document.createElement("div");
      row.className = "drop-row";
      row.innerHTML = `
        <div>
          <strong title="${item}">${item}</strong>
          <small>${category}</small>
        </div>
        <button class="icon-button" type="button" title="Adicionar" aria-label="Adicionar ${item}">+</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        countedDrops(dungeon).push({ item, category, qty: 1, price: 0 });
        saveData();
        render();
      });
      elements.extraDropList.appendChild(row);
    });

  if (!elements.extraDropList.children.length) {
    elements.extraDropList.innerHTML = `<div class="empty-state">Todos os drops listados já estão contabilizados.</div>`;
  }
}

function renderCountedDrops() {
  const dungeon = currentDungeon();
  const entries = countedDrops(dungeon);
  elements.countedDropList.innerHTML = "";

  if (!entries.length) {
    elements.countedDropList.innerHTML = `<div class="empty-state">Nenhum drop extra contabilizado.</div>`;
    return;
  }

  entries.forEach((line, index) => {
    const row = document.createElement("div");
    row.className = "counted-row";
    row.innerHTML = `
      <div>
        <strong title="${line.item}">${line.item}</strong>
        <small>${line.category || "Extra"}</small>
      </div>
      <input data-drop-index="${index}" data-drop-field="qty" type="number" min="0" step="1" value="${line.qty}" />
      <input data-drop-index="${index}" data-drop-field="price" type="number" min="0" step="1000" value="${line.price}" />
      <strong class="drop-total" data-drop-total="${index}">${formatAlz(line.qty * line.price)}</strong>
      <button class="remove-button" type="button" aria-label="Remover ${line.item}">×</button>
    `;
    row.querySelector(".remove-button").addEventListener("click", () => {
      entries.splice(index, 1);
      saveData();
      render();
    });
    elements.countedDropList.appendChild(row);
  });
}

function renderSettings() {
  const groups = [
    ["Núcleos de Aprimoramento", Object.keys(app.settings).filter((key) => key.startsWith("Núcleo de Aprimoramento"))],
    ["Núcleos Arcanos", Object.keys(app.settings).filter((key) => key.startsWith("Núcleo Arcano"))],
    [
      "Outros",
      [
        "Protetor PC (100 PC)",
        "Card Cash Ouro (1000 Cash)",
        "Alz base do Protetor PC",
        "Quantidade de Núcleo de Aprimoramento (Altíssimo) no Protetor PC",
        "Quantidade de Núcleo de Aprimoramento (Alto) no Protetor PC",
      ],
    ],
  ];

  elements.priceSettings.innerHTML = groups
    .map(
      ([title, keys]) => `
        <div class="table-row header"><span>${title}</span><span></span><span></span><span></span></div>
        ${keys
          .map(
            (key) => `
              <div class="setting-row">
                <strong>${key}</strong>
                <input data-setting-key="${key}" type="number" min="0" step="1000" value="${app.settings[key] || 0}" />
              </div>
            `,
          )
          .join("")}
      `,
    )
    .join("");

  const dungeon = currentDungeon();
  elements.dungeonSettings.innerHTML = `
    <div class="dg-setting">
      <strong>PC por DG</strong>
      <input data-dungeon-field="pc" type="number" min="0" step="1" value="${dungeon.pc}" />
    </div>
    <div class="dg-setting">
      <strong>Minutos por DG</strong>
      <input data-dungeon-field="minutes" type="number" min="0" step="0.1" value="${dungeon.minutes}" />
    </div>
    <div class="dg-setting">
      <strong>Runs base</strong>
      <input data-dungeon-field="baseRuns" type="number" min="1" step="1" value="${dungeon.baseRuns || 30}" />
    </div>
    <div class="dg-setting toggle-setting">
      <strong>Permite reset</strong>
      <input data-dungeon-field="canReset" type="checkbox" ${dungeon.canReset ? "checked" : ""} />
    </div>
    <div class="dg-setting">
      <strong>Runs adicionais do reset</strong>
      <input data-dungeon-field="resetRuns" type="number" min="0" step="1" value="${dungeon.resetRuns || 0}" />
    </div>
  `;
}

function renderRanking() {
  const ranked = [...app.dungeons].sort((a, b) => rankingValue(b) - rankingValue(a));
  elements.rankingTable.innerHTML = `
    <div class="rank-row header">
      <span>#</span>
      <span>DG</span>
      <span>Custo</span>
      <span>Farm</span>
      <span>PC</span>
      <span>Tempo</span>
      <span>Resultado</span>
    </div>
  `;

  ranked.forEach((dungeon, index) => {
    const runs = rankingRuns(dungeon);
    const row = document.createElement("div");
    row.className = "rank-row";
    row.innerHTML = `
      <span class="rank-position">${index + 1}</span>
      <div>
        <strong title="${dungeon.name}">${dungeon.name}</strong>
        <small>${runs} runs${dungeon.canReset ? " com reset" : ""}</small>
      </div>
      <strong>${formatAlz(entryCost(dungeon, runs))}</strong>
      <strong>${formatAlz(basicReturn(dungeon, runs))}</strong>
      <strong>${formatAlz(pcReturn(dungeon, runs))}</strong>
      <span>${formatNumber(dungeon.minutes * runs)} min</span>
      <strong>${formatAlz(rankingValue(dungeon))}</strong>
    `;
    elements.rankingTable.appendChild(row);
  });
}

function rankingRuns(dungeon) {
  return (dungeon.baseRuns || 30) + (dungeon.canReset ? dungeon.resetRuns || 0 : 0);
}

function rankingValue(dungeon) {
  const runs = rankingRuns(dungeon);
  const baseProfit = basicReturn(dungeon, runs) + pcReturn(dungeon, runs) - entryCost(dungeon, runs);
  if (app.ui.rankMode === "hour") {
    return baseProfit / Math.max((dungeon.minutes * runs) / 60, 0.1);
  }
  if (app.ui.rankMode === "rush") {
    return cashbackReturn(dungeon, runs) + pcReturn(dungeon, runs) - entryCost(dungeon, runs);
  }
  return baseProfit;
}

function refreshNumbers() {
  const dungeon = currentDungeon();
  const runs = effectiveRuns(dungeon);
  const entry = entryCost(dungeon, runs);
  const basic = basicReturn(dungeon, runs);
  const extra = extraReturn(dungeon);
  const pc = pcReturn(dungeon, runs);

  elements.totalRuns.textContent = formatNumber(runs);
  elements.metricEntryCost.textContent = formatAlz(entry);
  elements.metricBasic.textContent = formatAlz(basic);
  elements.metricExtra.textContent = formatAlz(extra);
  elements.metricPc.textContent = formatAlz(pc);
  elements.metricProfit.textContent = formatAlz(basic + extra + pc - entry);

  elements.pcStatus.textContent = app.ui.sellPc ? "Ativo" : "Inativo";
  elements.pcPerRun.value = dungeon.pc;
  elements.pcUnitValue.textContent = formatAlz(pcUnitProfit());
  elements.pcTotalCount.textContent = formatNumber(dungeon.pc * runs);
  elements.pcTotalValue.textContent = formatAlz(pc);

  elements.gemUnitValue.textContent = formatAlz(gemUnitValue());
  elements.protectorCost.textContent = formatAlz(protectorCost());
  elements.pcProfit100.textContent = formatAlz((app.settings["Protetor PC (100 PC)"] || 0) - protectorCost());
  elements.pcProfit1.textContent = formatAlz(pcUnitProfit());

  document.querySelectorAll("[data-entry-total]").forEach((node) => {
    const line = dungeon.entries[Number(node.dataset.entryTotal)];
    node.textContent = formatAlz(line.qty * priceForLine(line) * runs);
  });

  document.querySelectorAll("[data-basic-total]").forEach((node) => {
    const line = dungeon.basic[Number(node.dataset.basicTotal)];
    node.textContent = formatAlz(line.qtyPerRun * priceForLine(line) * runs);
  });

  document.querySelectorAll("[data-drop-total]").forEach((node) => {
    const line = countedDrops(dungeon)[Number(node.dataset.dropTotal)];
    node.textContent = formatAlz(line.qty * line.price);
  });
}

function render() {
  const dungeon = currentDungeon();
  elements.dungeonTitle.textContent = dungeon.name;
  elements.runsInput.value = app.ui.runs || dungeon.baseRuns || 30;
  elements.resetToggle.checked = app.ui.useReset;
  elements.resetToggle.disabled = !dungeon.canReset;
  elements.sellPcToggle.checked = app.ui.sellPc;
  renderView();
  renderDungeonButtons();
  renderEntries();
  renderBasicFarm();
  renderExtraDrops();
  renderCountedDrops();
  renderSettings();
  refreshNumbers();
  renderRanking();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-button").forEach((navButton) => navButton.classList.remove("active"));
    button.classList.add("active");
    renderView();
  });
});

document.querySelectorAll(".rank-mode").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".rank-mode").forEach((rankButton) => rankButton.classList.remove("active"));
    button.classList.add("active");
    app.ui.rankMode = button.dataset.rank;
    saveData();
    renderRanking();
  });
});

elements.dungeonSearch.addEventListener("input", renderDungeonButtons);

elements.runsInput.addEventListener("input", (event) => {
  app.ui.runs = Math.max(1, Number(event.target.value || 1));
  saveData();
  refreshNumbers();
  renderRanking();
});

elements.resetToggle.addEventListener("change", (event) => {
  app.ui.useReset = event.target.checked;
  saveData();
  refreshNumbers();
});

elements.sellPcToggle.addEventListener("change", (event) => {
  app.ui.sellPc = event.target.checked;
  saveData();
  refreshNumbers();
  renderRanking();
});

elements.pcPerRun.addEventListener("input", (event) => {
  currentDungeon().pc = numberValue(event.target.value);
  saveData();
  refreshNumbers();
  renderRanking();
});

elements.customDropForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const item = elements.customDropName.value.trim();
  const category = elements.customDropCategory.value.trim() || "Extra";
  if (!item) return;
  countedDrops().push({ item, category, qty: 1, price: 0 });
  elements.customDropName.value = "";
  elements.customDropCategory.value = "";
  saveData();
  render();
});

elements.resetLocalData.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  app.settings = clone(defaultSettings);
  app.dungeons = clone(defaultDungeons);
  app.ui = {
    selectedDungeon: "lago",
    runs: 30,
    useReset: false,
    sellPc: true,
    rankMode: "profit",
    countedDrops: {},
  };
  render();
});

document.addEventListener("input", (event) => {
  const target = event.target;
  const dungeon = currentDungeon();

  if (target.dataset.entryIndex !== undefined) {
    const line = dungeon.entries[Number(target.dataset.entryIndex)];
    if (target.dataset.entryField === "qty") line.qty = numberValue(target.value);
    if (target.dataset.entryField === "price" && !line.priceKey && line.priceMode !== "gem") {
      line.price = numberValue(target.value);
    }
    saveData();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.basicIndex !== undefined) {
    const line = dungeon.basic[Number(target.dataset.basicIndex)];
    if (target.dataset.basicField === "qtyPerRun") line.qtyPerRun = numberValue(target.value);
    if (target.dataset.basicField === "price") {
      if (line.priceKey) app.settings[line.priceKey] = numberValue(target.value);
      else line.price = numberValue(target.value);
    }
    saveData();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.dropIndex !== undefined) {
    const line = countedDrops(dungeon)[Number(target.dataset.dropIndex)];
    line[target.dataset.dropField] = numberValue(target.value);
    saveData();
    refreshNumbers();
    return;
  }

  if (target.dataset.settingKey) {
    app.settings[target.dataset.settingKey] = numberValue(target.value);
    saveData();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.dungeonField) {
    const field = target.dataset.dungeonField;
    if (field === "canReset") {
      dungeon.canReset = target.checked;
      app.ui.useReset = app.ui.useReset && dungeon.canReset;
    } else {
      dungeon[field] = numberValue(target.value);
      if (field === "baseRuns") app.ui.runs = dungeon.baseRuns;
    }
    saveData();
    render();
  }
});

loadSavedData();
render();
