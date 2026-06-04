const STORAGE_KEY = "farmLegacy.web.v3";

const alzFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
});

const decimalFormat = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 2,
});

const ALZ_TIERS = [
  { min: 100000000000, className: "alz-tier-100b" },
  { min: 10000000000, className: "alz-tier-10b" },
  { min: 1000000000, className: "alz-tier-1b" },
  { min: 100000000, className: "alz-tier-100m" },
  { min: 10000000, className: "alz-tier-10m" },
  { min: 1000000, className: "alz-tier-1m" },
  { min: 100000, className: "alz-tier-100k" },
  { min: 10000, className: "alz-tier-10k" },
];

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
  "Jóia Enfraquecida Vermelha": 2000000,
  "Jóia Enfraquecida Laranja": 5000000,
  "Jóia Enfraquecida Amarela": 10000000,
  "Jóia Enfraquecida Verde": 20000000,
  "Jóia Enfraquecida Azul": 40000000,
  "Jóia Enfraquecida Violeta": 60000000,
  "Jóia Enfraquecida Branca": 80000000,
};

const CASHBACK_THRESHOLDS = [15, 28, 58];
const JEWEL_ITEMS = Object.keys(jewelPrices);

const ENTRY_MODE_LABELS = {
  gems: "Gemas Arcanas",
  craft: "Craft (Chloe)",
  npc: "NPC (Yul)",
};

function categoryForSettingItem(item) {
  if (item.startsWith("Núcleo de Aprimoramento")) return "Núcleo de Aprimoramento";
  if (item.startsWith("Núcleo Arcano")) return "Núcleo Arcano";
  return "Entrada";
}

function settingItem(item, qty = 1, entryMode = "npc") {
  return {
    item,
    qty,
    priceKey: item,
    category: categoryForSettingItem(item),
    entryMode,
  };
}

function fixedItem(item, qty, price, entryMode = "craft") {
  return {
    item,
    qty,
    price,
    category: "Craft",
    entryMode,
  };
}

function alzEntry(qty) {
  return {
    item: "Alz",
    qty,
    category: "Alz",
    entryMode: "npc",
  };
}

function gemEntry(item, qty) {
  return {
    item,
    qty,
    priceMode: "gem",
    category: "Gema",
    entryMode: "gems",
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
    entryModes: {},
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
  entryModeSelect: document.querySelector("#entry-mode-select"),
  dgConfigTitle: document.querySelector("#dg-config-title"),
  dgConfigEntryModeSelect: document.querySelector("#dg-config-entry-mode-select"),
  dgConfigEntryList: document.querySelector("#dg-config-entry-list"),
  dgConfigPc: document.querySelector("#dg-config-pc"),
  dgConfigCashbackList: document.querySelector("#dg-config-cashback-list"),
  openDgSettings: document.querySelector("#open-dg-settings"),
  backToFarm: document.querySelector("#back-to-farm"),
  basicFarmList: document.querySelector("#basic-farm-list"),
  cashbackList: document.querySelector("#cashback-list"),
  extraDropList: document.querySelector("#extra-drop-list"),
  pcPerRunDisplay: document.querySelector("#pc-per-run-display"),
  pcStatus: document.querySelector("#pc-status"),
  pcUnitValue: document.querySelector("#pc-unit-value"),
  pcTotalCount: document.querySelector("#pc-total-count"),
  pcTotalValue: document.querySelector("#pc-total-value"),
  metricEntryCost: document.querySelector("#metric-entry-cost"),
  metricBasic: document.querySelector("#metric-basic"),
  metricCashback: document.querySelector("#metric-cashback"),
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
      entryModes: saved.ui?.entryModes || {},
      countedDrops: saved.ui?.countedDrops || {},
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  normalizeAppData();
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

function isAlzEntry(line) {
  return line.item === "Alz" || line.category === "Alz";
}

function isJewelLine(line) {
  return line?.category === "Jóia" || Object.prototype.hasOwnProperty.call(jewelPrices, line?.item);
}

function normalizeJewelItem(item) {
  return JEWEL_ITEMS.includes(item) ? item : JEWEL_ITEMS[0];
}

function jewelColor(item) {
  return normalizeJewelItem(item).replace("Jóia Enfraquecida ", "");
}

function jewelValue(item) {
  return jewelPrices[normalizeJewelItem(item)] || 0;
}

function inferEntryMode(line) {
  if (line.entryMode) return line.entryMode;
  if (line.priceMode === "gem" || line.category === "Gema") return "gems";
  if (isAlzEntry(line) || line.priceKey) return "npc";
  return "craft";
}

function defaultEntryMode(dungeon) {
  const modes = new Set((dungeon.entries || []).map((line) => inferEntryMode(line)));
  if (modes.has("npc")) return "npc";
  if (modes.has("craft")) return "craft";
  if (modes.has("gems")) return "gems";
  return "npc";
}

function normalizeAppData() {
  app.dungeons.forEach((dungeon) => {
    const jewelLines = (dungeon.basic || []).filter(isJewelLine);
    dungeon.entries = (dungeon.entries || []).map((line) => {
      const normalized = {
        ...line,
        entryMode: inferEntryMode(line),
        category: line.category || categoryForSettingItem(line.item),
      };

      if (isAlzEntry(normalized)) {
        normalized.item = "Alz";
        normalized.category = "Alz";
        delete normalized.price;
        delete normalized.priceKey;
        delete normalized.priceMode;
      }

      return normalized;
    });
    dungeon.basic = (dungeon.basic || []).filter((line) => !isJewelLine(line));
    dungeon.cashback = CASHBACK_THRESHOLDS.map((runs, index) => {
      const existingRewards = Array.isArray(dungeon.cashback) ? dungeon.cashback : [];
      const existing = existingRewards.find((reward) => Number(reward.runs || reward.requiredRuns) === runs) || existingRewards[index];
      const fallbackItem = jewelLines[index]?.item || jewelLines[jewelLines.length - 1]?.item || JEWEL_ITEMS[0];

      return {
        runs: Number(existing?.runs || existing?.requiredRuns || runs),
        item: normalizeJewelItem(existing?.item || existing?.jewel || fallbackItem),
        category: "Jóia",
      };
    });
    if (!app.ui.entryModes[dungeon.id]) {
      app.ui.entryModes[dungeon.id] = defaultEntryMode(dungeon);
    }
  });
}

function formatAlz(value) {
  const rounded = Math.round(Number(value) || 0);
  return `${alzFormat.format(rounded)} Alz`;
}

function formatAlzNumber(value) {
  return alzFormat.format(Math.round(Number(value) || 0));
}

function alzTierClass(value) {
  const absoluteValue = Math.abs(Number(value) || 0);
  return ALZ_TIERS.find((tier) => absoluteValue >= tier.min)?.className || "";
}

function applyAlzDisplay(node, value) {
  node.textContent = formatAlz(value);
  node.classList.remove(
    "alz-value",
    "alz-tier-10k",
    "alz-tier-100k",
    "alz-tier-1m",
    "alz-tier-10m",
    "alz-tier-100m",
    "alz-tier-1b",
    "alz-tier-10b",
    "alz-tier-100b",
  );
  const tierClass = alzTierClass(value);
  node.classList.add("alz-value");
  if (tierClass) node.classList.add(tierClass);
}

function alzHtml(value, attributes = "") {
  const tierClass = alzTierClass(value);
  const className = `alz-value${tierClass ? ` ${tierClass}` : ""}`;
  return `<span class="${className}"${attributes ? ` ${attributes}` : ""}>${formatAlz(value)}</span>`;
}

function iconSvg(icon) {
  const paths = {
    plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
  };

  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true">
      ${paths[icon] || ""}
    </svg>
  `;
}

function formatNumber(value) {
  return decimalFormat.format(Number(value) || 0);
}

function numberValue(value) {
  return Math.max(0, Number(String(value).replace(",", ".")) || 0);
}

function moneyValue(value) {
  return Math.max(0, Number(String(value).replace(/\s/g, "").replace(/\./g, "").replace(",", ".")) || 0);
}

function formatMoneyInput(input) {
  input.value = formatAlzNumber(moneyValue(input.value));
}

function isMoneySettingKey(key) {
  return !key.startsWith("Quantidade");
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

function entryLineCostPerRun(line) {
  if (isAlzEntry(line)) return Number(line.qty) || 0;
  return (Number(line.qty) || 0) * priceForLine(line);
}

function canEditEntryQty(line) {
  return !isAlzEntry(line);
}

function canEditEntryPrice(line) {
  return line.entryMode === "craft" && !line.priceKey && line.priceMode !== "gem" && line.item !== "Alz";
}

function canEditBasicPrice(line) {
  return !line.priceKey;
}

function currentEntryMode(dungeon = currentDungeon()) {
  return app.ui.entryModes[dungeon.id] || defaultEntryMode(dungeon);
}

function activeEntryRecords(dungeon = currentDungeon()) {
  const mode = currentEntryMode(dungeon);
  return (dungeon.entries || [])
    .map((line, index) => ({ line, index }))
    .filter((record) => record.line.entryMode === mode);
}

function effectiveRuns(dungeon = currentDungeon()) {
  const base = app.ui.runs || dungeon.baseRuns || 30;
  return base + (app.ui.useReset && dungeon.canReset ? dungeon.resetRuns || 0 : 0);
}

function entryCost(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return activeEntryRecords(dungeon).reduce((sum, record) => {
    return sum + entryLineCostPerRun(record.line) * runs;
  }, 0);
}

function basicReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return (dungeon.basic || [])
    .filter((line) => !isJewelLine(line))
    .reduce((sum, line) => sum + line.qtyPerRun * priceForLine(line) * runs, 0);
}

function cashbackReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return (dungeon.cashback || [])
    .filter((reward) => runs >= reward.runs)
    .reduce((sum, reward) => sum + jewelValue(reward.item), 0);
}

function countedDrops(dungeon = currentDungeon()) {
  if (!app.ui.countedDrops[dungeon.id]) app.ui.countedDrops[dungeon.id] = [];
  return app.ui.countedDrops[dungeon.id];
}

function dropCandidateInfo(candidate) {
  if (Array.isArray(candidate)) {
    return { item: candidate[0], category: candidate[1] || "Extra" };
  }

  return {
    item: candidate?.item,
    category: candidate?.category || candidate?.farmLine?.category || candidate?.countedLine?.category || "Extra",
  };
}

function addDropCandidate(dungeon, candidate) {
  const info = dropCandidateInfo(candidate);
  if (!info.item) return;

  dungeon.extras = dungeon.extras || [];
  const existingIndex = dungeon.extras.findIndex((current) => dropCandidateInfo(current).item === info.item);
  if (existingIndex >= 0) {
    if (!Array.isArray(candidate) && candidate.farmLine) dungeon.extras[existingIndex] = candidate;
    return;
  }

  dungeon.extras.push(candidate);
}

function addDropToFarm(dungeon, candidateIndex) {
  const [candidate] = dungeon.extras.splice(candidateIndex, 1);
  const info = dropCandidateInfo(candidate);
  if (!info.item) return;

  if (!Array.isArray(candidate) && candidate.farmLine) {
    dungeon.basic.push(clone(candidate.farmLine));
    return;
  }

  countedDrops(dungeon).push(
    !Array.isArray(candidate) && candidate.countedLine
      ? clone(candidate.countedLine)
      : { item: info.item, category: info.category, qty: 1, price: 0 },
  );
}

function removeBasicFromFarm(dungeon, index) {
  const [line] = dungeon.basic.splice(index, 1);
  if (!line) return;
  addDropCandidate(dungeon, {
    item: line.item,
    category: line.category || "Farm",
    farmLine: clone(line),
  });
}

function removeCountedDropFromFarm(dungeon, index) {
  const entries = countedDrops(dungeon);
  const [line] = entries.splice(index, 1);
  if (!line) return;
  addDropCandidate(dungeon, {
    item: line.item,
    category: line.category || "Extra",
    countedLine: clone(line),
  });
}

function farmRecords(dungeon = currentDungeon()) {
  return [
    ...(dungeon.basic || [])
      .map((line, index) => ({ source: "basic", index, line }))
      .filter((record) => !isJewelLine(record.line)),
    ...countedDrops(dungeon).map((line, index) => ({ source: "drop", index, line })),
  ];
}

function farmRecordTotal(record, dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  if (record.source === "basic") {
    return record.line.qtyPerRun * priceForLine(record.line) * runs;
  }

  return record.line.qty * record.line.price;
}

function extraReturn(dungeon = currentDungeon()) {
  return countedDrops(dungeon).reduce((sum, line) => sum + line.qty * line.price, 0);
}

function farmReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return basicReturn(dungeon, runs) + extraReturn(dungeon);
}

function pcReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return app.ui.sellPc ? dungeon.pc * runs * pcUnitProfit() : 0;
}

function profit(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), includeExtras = true) {
  const farm = includeExtras || dungeon.id === currentDungeon().id ? farmReturn(dungeon, runs) : basicReturn(dungeon, runs);
  return farm + cashbackReturn(dungeon, runs) + pcReturn(dungeon, runs) - entryCost(dungeon, runs);
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

function setActiveView(viewName) {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  renderView();
  document.querySelector(".workspace")?.scrollTo({ top: 0, behavior: "smooth" });
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
  const records = activeEntryRecords(dungeon);
  const selectedMode = currentEntryMode(dungeon);
  elements.entryList.innerHTML = `
    <div class="table-row header">
      <span>Item</span>
      <span>Qtd/DG</span>
      <span>Preço</span>
      <span>Total/DG</span>
    </div>
  `;

  if (!records.length) {
    elements.entryList.innerHTML += `<div class="empty-state">Entrada ainda não cadastrada para ${ENTRY_MODE_LABELS[selectedMode]}.</div>`;
    return;
  }

  records.forEach(({ line, index }) => {
    if (isAlzEntry(line)) {
      const row = document.createElement("div");
      row.className = "table-row alz-row";
      row.innerHTML = `
        <div class="item-name">
          <span class="swatch ${swatchClass(line.category || line.item)}"></span>
          <span title="${line.item}">${line.item}</span>
        </div>
        <label class="entry-money-cell">
          <span>Valor/DG</span>
          <input data-entry-index="${index}" data-entry-field="alz" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(line.qty)}" />
        </label>
        <strong class="entry-total" data-entry-total="${index}">${alzHtml(entryLineCostPerRun(line))}</strong>
      `;
      elements.entryList.appendChild(row);
      return;
    }

    const qtyLocked = !canEditEntryQty(line);
    const priceLocked = !canEditEntryPrice(line);
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category || line.item)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      <input data-entry-index="${index}" data-entry-field="qty" type="number" min="0" step="0.01" value="${line.qty}" ${qtyLocked ? "disabled" : ""} />
      <input data-entry-index="${index}" data-entry-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(priceForLine(line))}" ${priceLocked ? "disabled" : ""} />
      <strong class="entry-total" data-entry-total="${index}">${alzHtml(entryLineCostPerRun(line))}</strong>
    `;
    elements.entryList.appendChild(row);
  });
}

function renderEntries() {
  const dungeon = currentDungeon();
  const records = activeEntryRecords(dungeon);
  const selectedMode = currentEntryMode(dungeon);
  elements.entryList.innerHTML = `
    <div class="table-row header entry-row">
      <span>Item</span>
      <span>Qtd/DG</span>
      <span>Preço</span>
      <span>Total/DG</span>
    </div>
  `;

  if (!records.length) {
    elements.entryList.innerHTML += `<div class="empty-state">Entrada ainda não cadastrada para ${ENTRY_MODE_LABELS[selectedMode]}.</div>`;
    return;
  }

  records.forEach(({ line, index }) => {
    const row = document.createElement("div");
    row.className = "table-row entry-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category || line.item)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      <strong>${isAlzEntry(line) ? "Valor/DG" : formatNumber(line.qty)}</strong>
      <strong>${isAlzEntry(line) ? "Moeda" : alzHtml(priceForLine(line))}</strong>
      <strong class="entry-total" data-entry-total="${index}">${alzHtml(entryLineCostPerRun(line))}</strong>
    `;
    elements.entryList.appendChild(row);
  });
}

function renderEntryConfig() {
  const dungeon = currentDungeon();
  const mode = currentEntryMode(dungeon);
  const records = activeEntryRecords(dungeon);
  elements.dgConfigEntryList.innerHTML = `
    <div class="table-row header">
      <span>Item</span>
      <span>Qtd/DG</span>
      <span>Preço</span>
      <span>Total/DG</span>
    </div>
  `;

  if (!records.length) {
    elements.dgConfigEntryList.innerHTML += `<div class="empty-state">Entrada ainda não cadastrada para ${ENTRY_MODE_LABELS[mode]}.</div>`;
    return;
  }

  records.forEach(({ line, index }) => {
    if (isAlzEntry(line)) {
      const row = document.createElement("div");
      row.className = "table-row alz-row";
      row.innerHTML = `
        <div class="item-name">
          <span class="swatch ${swatchClass(line.category || line.item)}"></span>
          <span title="${line.item}">${line.item}</span>
        </div>
        <label class="entry-money-cell">
          <span>Valor/DG</span>
          <input data-entry-index="${index}" data-entry-field="alz" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(line.qty)}" />
        </label>
        <strong class="entry-total" data-entry-total="${index}">${alzHtml(entryLineCostPerRun(line))}</strong>
      `;
      elements.dgConfigEntryList.appendChild(row);
      return;
    }

    const qtyLocked = !canEditEntryQty(line);
    const priceLocked = !canEditEntryPrice(line);
    const row = document.createElement("div");
    row.className = "table-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category || line.item)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      <input data-entry-index="${index}" data-entry-field="qty" type="number" min="0" step="0.01" value="${line.qty}" ${qtyLocked ? "disabled" : ""} />
      <input data-entry-index="${index}" data-entry-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(priceForLine(line))}" ${priceLocked ? "disabled" : ""} />
      <strong class="entry-total" data-entry-total="${index}">${alzHtml(entryLineCostPerRun(line))}</strong>
    `;
    elements.dgConfigEntryList.appendChild(row);
  });
}

function renderBasicFarm() {
  const dungeon = currentDungeon();
  const records = farmRecords(dungeon);

  elements.basicFarmList.innerHTML = `
    <div class="table-row header farm-row">
      <span>Item</span>
      <span>Qtd</span>
      <span>Preço</span>
      <span>Total</span>
      <span></span>
    </div>
  `;

  if (!records.length) {
    elements.basicFarmList.innerHTML += `<div class="empty-state">Farm ainda não tem itens.</div>`;
    return;
  }

  records.forEach((record) => {
    const { line, index, source } = record;
    const isBasic = source === "basic";
    const priceLocked = isBasic && !canEditBasicPrice(line);
    const row = document.createElement("div");
    row.className = "table-row farm-row";
    row.innerHTML = `
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category)}"></span>
        <span title="${line.item}">${line.item}</span>
      </div>
      ${
        isBasic
          ? `<input data-basic-index="${index}" data-basic-field="qtyPerRun" type="number" min="0" step="0.01" value="${line.qtyPerRun}" />`
          : `<input data-drop-index="${index}" data-drop-field="qty" type="number" min="0" step="1" value="${line.qty}" />`
      }
      ${
        isBasic
          ? `<input data-basic-index="${index}" data-basic-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(priceForLine(line))}" ${priceLocked ? "disabled" : ""} />`
          : `<input data-drop-index="${index}" data-drop-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(line.price)}" />`
      }
      <strong data-farm-total-source="${source}" data-farm-total-index="${index}">${alzHtml(farmRecordTotal(record, dungeon))}</strong>
      <button class="remove-button" type="button" aria-label="Remover ${line.item} do Farm">${iconSvg("x")}</button>
    `;
    row.querySelector(".remove-button").addEventListener("click", () => {
      if (source === "basic") {
        removeBasicFromFarm(dungeon, index);
      } else {
        removeCountedDropFromFarm(dungeon, index);
      }
      saveData();
      render();
    });
    elements.basicFarmList.appendChild(row);
  });
}

function renderCashback() {
  const dungeon = currentDungeon();
  const runs = effectiveRuns(dungeon);
  elements.cashbackList.innerHTML = `
    <div class="cashback-row header">
      <span>Meta</span>
      <span>Jóia</span>
      <span>Valor</span>
      <span>Status</span>
    </div>
  `;

  (dungeon.cashback || []).forEach((reward, index) => {
    const row = document.createElement("div");
    row.className = `cashback-row ${runs >= reward.runs ? "available" : ""}`;
    row.innerHTML = `
      <strong>${formatNumber(reward.runs)} DGs</strong>
      <select data-cashback-index="${index}" aria-label="Cor da jóia do cashback de ${reward.runs} DGs">
        ${JEWEL_ITEMS.map(
          (item) => `<option value="${item}" ${normalizeJewelItem(reward.item) === item ? "selected" : ""}>${jewelColor(item)}</option>`,
        ).join("")}
      </select>
      <strong data-cashback-value="${index}">${alzHtml(jewelValue(reward.item))}</strong>
      <span data-cashback-status="${index}">${runs >= reward.runs ? "Liberado" : `${formatNumber(reward.runs - runs)} DGs restantes`}</span>
    `;
    elements.cashbackList.appendChild(row);
  });
}

function renderCashback() {
  const dungeon = currentDungeon();
  const runs = effectiveRuns(dungeon);
  elements.cashbackList.innerHTML = `
    <div class="cashback-row header">
      <span>Meta</span>
      <span>Jóia</span>
      <span>Valor</span>
      <span>Status</span>
    </div>
  `;

  (dungeon.cashback || []).forEach((reward, index) => {
    const row = document.createElement("div");
    row.className = `cashback-row ${runs >= reward.runs ? "available" : ""}`;
    row.innerHTML = `
      <strong>${formatNumber(reward.runs)} DGs</strong>
      <strong>${jewelColor(reward.item)}</strong>
      <strong data-cashback-value="${index}">${alzHtml(jewelValue(reward.item))}</strong>
      <span data-cashback-status="${index}">${runs >= reward.runs ? "Liberado" : `${formatNumber(reward.runs - runs)} DGs restantes`}</span>
    `;
    elements.cashbackList.appendChild(row);
  });
}

function renderCashbackConfig() {
  const dungeon = currentDungeon();
  elements.dgConfigCashbackList.innerHTML = `
    <div class="cashback-row header">
      <span>Meta</span>
      <span>Jóia</span>
      <span>Valor</span>
      <span></span>
    </div>
  `;

  (dungeon.cashback || []).forEach((reward, index) => {
    const row = document.createElement("div");
    row.className = "cashback-row";
    row.innerHTML = `
      <label class="compact-field">
        <span>DGs</span>
        <input data-cashback-config-index="${index}" data-cashback-config-field="runs" type="number" min="1" step="1" value="${reward.runs}" />
      </label>
      <select data-cashback-config-index="${index}" data-cashback-config-field="item" aria-label="Cor da jóia do cashback de ${reward.runs} DGs">
        ${JEWEL_ITEMS.map(
          (item) => `<option value="${item}" ${normalizeJewelItem(reward.item) === item ? "selected" : ""}>${jewelColor(item)}</option>`,
        ).join("")}
      </select>
      <strong>${alzHtml(jewelValue(reward.item))}</strong>
      <span>1 jóia</span>
    `;
    elements.dgConfigCashbackList.appendChild(row);
  });
}

function renderExtraDrops() {
  const dungeon = currentDungeon();
  const used = new Set(farmRecords(dungeon).map((record) => record.line.item));
  elements.extraDropList.innerHTML = "";

  (dungeon.extras || [])
    .map((candidate, index) => ({ candidate, index, ...dropCandidateInfo(candidate) }))
    .filter(({ item }) => item && !used.has(item))
    .forEach(({ index, item, category }) => {
      const row = document.createElement("div");
      row.className = "drop-row";
      row.innerHTML = `
        <div>
          <strong title="${item}">${item}</strong>
          <small>${category}</small>
        </div>
        <button class="icon-button" type="button" title="Adicionar" aria-label="Adicionar ${item}">${iconSvg("plus")}</button>
      `;
      row.querySelector("button").addEventListener("click", () => {
        addDropToFarm(dungeon, index);
        saveData();
        render();
      });
      elements.extraDropList.appendChild(row);
    });

  if (!elements.extraDropList.children.length) {
    elements.extraDropList.innerHTML = `<div class="empty-state">Todos os drops listados já estão no Farm.</div>`;
  }
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
                ${
                  isMoneySettingKey(key)
                    ? `<input data-setting-key="${key}" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(app.settings[key] || 0)}" />`
                    : `<input data-setting-key="${key}" type="number" min="0" step="1" value="${app.settings[key] || 0}" />`
                }
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

function renderDgConfig() {
  const dungeon = currentDungeon();
  elements.dgConfigTitle.textContent = dungeon.name;
  elements.dgConfigEntryModeSelect.value = currentEntryMode(dungeon);
  elements.dgConfigPc.value = dungeon.pc;
  renderEntryConfig();
  renderCashbackConfig();
}

function renderRanking() {
  const ranked = [...app.dungeons].sort((a, b) => rankingValue(b) - rankingValue(a));
  elements.rankingTable.innerHTML = `
    <div class="rank-row header">
      <span>#</span>
      <span>DG</span>
      <span>Custo</span>
      <span>Farm</span>
      <span>Cashback</span>
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
      <strong>${alzHtml(entryCost(dungeon, runs))}</strong>
      <strong>${alzHtml(farmReturn(dungeon, runs))}</strong>
      <strong>${alzHtml(cashbackReturn(dungeon, runs))}</strong>
      <strong>${alzHtml(pcReturn(dungeon, runs))}</strong>
      <span>${formatNumber(dungeon.minutes * runs)} min</span>
      <strong>${alzHtml(rankingValue(dungeon))}</strong>
    `;
    elements.rankingTable.appendChild(row);
  });
}

function rankingRuns(dungeon) {
  return (dungeon.baseRuns || 30) + (dungeon.canReset ? dungeon.resetRuns || 0 : 0);
}

function rankingValue(dungeon) {
  const runs = rankingRuns(dungeon);
  const baseProfit = farmReturn(dungeon, runs) + cashbackReturn(dungeon, runs) + pcReturn(dungeon, runs) - entryCost(dungeon, runs);
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
  const farm = farmReturn(dungeon, runs);
  const cashback = cashbackReturn(dungeon, runs);
  const pc = pcReturn(dungeon, runs);

  elements.totalRuns.textContent = formatNumber(runs);
  applyAlzDisplay(elements.metricEntryCost, entry);
  applyAlzDisplay(elements.metricBasic, farm);
  applyAlzDisplay(elements.metricCashback, cashback);
  applyAlzDisplay(elements.metricPc, pc);
  applyAlzDisplay(elements.metricProfit, farm + cashback + pc - entry);

  elements.pcStatus.textContent = app.ui.sellPc ? "Ativo" : "Inativo";
  elements.pcPerRunDisplay.textContent = formatNumber(dungeon.pc);
  applyAlzDisplay(elements.pcUnitValue, pcUnitProfit());
  elements.pcTotalCount.textContent = formatNumber(dungeon.pc * runs);
  applyAlzDisplay(elements.pcTotalValue, pc);

  applyAlzDisplay(elements.gemUnitValue, gemUnitValue());
  applyAlzDisplay(elements.protectorCost, protectorCost());
  applyAlzDisplay(elements.pcProfit100, (app.settings["Protetor PC (100 PC)"] || 0) - protectorCost());
  applyAlzDisplay(elements.pcProfit1, pcUnitProfit());

  document.querySelectorAll("[data-entry-total]").forEach((node) => {
    const line = dungeon.entries[Number(node.dataset.entryTotal)];
    applyAlzDisplay(node, entryLineCostPerRun(line));
  });

  document.querySelectorAll("[data-farm-total-source]").forEach((node) => {
    const source = node.dataset.farmTotalSource;
    const index = Number(node.dataset.farmTotalIndex);
    const line = source === "basic" ? dungeon.basic[index] : countedDrops(dungeon)[index];
    if (!line) return;
    applyAlzDisplay(node, farmRecordTotal({ source, index, line }, dungeon, runs));
  });

  document.querySelectorAll("[data-cashback-value]").forEach((node) => {
    const reward = dungeon.cashback[Number(node.dataset.cashbackValue)];
    applyAlzDisplay(node, jewelValue(reward.item));
  });

  document.querySelectorAll("[data-cashback-status]").forEach((node) => {
    const reward = dungeon.cashback[Number(node.dataset.cashbackStatus)];
    node.textContent = runs >= reward.runs ? "Liberado" : `${formatNumber(reward.runs - runs)} DGs restantes`;
  });

}

function render() {
  const dungeon = currentDungeon();
  elements.dungeonTitle.textContent = dungeon.name;
  elements.runsInput.value = app.ui.runs || dungeon.baseRuns || 30;
  elements.resetToggle.checked = app.ui.useReset;
  elements.resetToggle.disabled = !dungeon.canReset;
  elements.sellPcToggle.checked = app.ui.sellPc;
  elements.entryModeSelect.value = currentEntryMode(dungeon);
  elements.dgConfigEntryModeSelect.value = currentEntryMode(dungeon);
  renderView();
  renderDungeonButtons();
  renderEntries();
  renderBasicFarm();
  renderCashback();
  renderExtraDrops();
  renderSettings();
  renderDgConfig();
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
  renderCashback();
  refreshNumbers();
  renderRanking();
});

elements.resetToggle.addEventListener("change", (event) => {
  app.ui.useReset = event.target.checked;
  saveData();
  renderCashback();
  refreshNumbers();
});

elements.sellPcToggle.addEventListener("change", (event) => {
  app.ui.sellPc = event.target.checked;
  saveData();
  refreshNumbers();
  renderRanking();
});

elements.entryModeSelect.addEventListener("change", (event) => {
  app.ui.entryModes[currentDungeon().id] = event.target.value;
  saveData();
  elements.dgConfigEntryModeSelect.value = event.target.value;
  renderEntries();
  renderEntryConfig();
  refreshNumbers();
  renderRanking();
});

elements.dgConfigEntryModeSelect.addEventListener("change", (event) => {
  app.ui.entryModes[currentDungeon().id] = event.target.value;
  saveData();
  elements.entryModeSelect.value = event.target.value;
  renderEntries();
  renderEntryConfig();
  refreshNumbers();
  renderRanking();
});

elements.openDgSettings.addEventListener("click", () => {
  setActiveView("dg-settings");
  renderDgConfig();
});

elements.backToFarm.addEventListener("click", () => {
  setActiveView("dungeon");
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.dataset.moneyInput !== undefined) {
    formatMoneyInput(target);
  }

  if (target.dataset.cashbackConfigIndex === undefined) return;

  const reward = currentDungeon().cashback[Number(target.dataset.cashbackConfigIndex)];
  if (target.dataset.cashbackConfigField !== "item") return;
  reward.item = normalizeJewelItem(target.value);
  saveData();
  renderCashback();
  renderCashbackConfig();
  refreshNumbers();
  renderRanking();
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
    entryModes: {},
    countedDrops: {},
  };
  normalizeAppData();
  render();
});

document.addEventListener("input", (event) => {
  const target = event.target;
  const dungeon = currentDungeon();

  if (target.dataset.entryIndex !== undefined) {
    const line = dungeon.entries[Number(target.dataset.entryIndex)];
    if (target.dataset.entryField === "alz" && isAlzEntry(line)) {
      line.qty = moneyValue(target.value);
    }
    if (target.dataset.entryField === "qty" && canEditEntryQty(line)) {
      line.qty = numberValue(target.value);
    }
    if (target.dataset.entryField === "price" && canEditEntryPrice(line)) {
      line.price = moneyValue(target.value);
    }
    saveData();
    renderEntries();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.cashbackConfigIndex !== undefined) {
    const reward = dungeon.cashback[Number(target.dataset.cashbackConfigIndex)];
    if (target.dataset.cashbackConfigField === "runs") {
      reward.runs = Math.max(1, Math.round(numberValue(target.value) || 1));
    }
    saveData();
    renderCashback();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.basicIndex !== undefined) {
    const line = dungeon.basic[Number(target.dataset.basicIndex)];
    if (target.dataset.basicField === "qtyPerRun") line.qtyPerRun = numberValue(target.value);
    if (target.dataset.basicField === "price" && canEditBasicPrice(line)) {
      line.price = moneyValue(target.value);
    }
    saveData();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.dropIndex !== undefined) {
    const line = countedDrops(dungeon)[Number(target.dataset.dropIndex)];
    line[target.dataset.dropField] = target.dataset.dropField === "price" ? moneyValue(target.value) : numberValue(target.value);
    saveData();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.settingKey) {
    app.settings[target.dataset.settingKey] = isMoneySettingKey(target.dataset.settingKey) ? moneyValue(target.value) : numberValue(target.value);
    saveData();
    renderEntries();
    renderEntryConfig();
    renderBasicFarm();
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
normalizeAppData();
render();
