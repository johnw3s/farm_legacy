const STORAGE_KEY = "farmLegacy.web.v3";
const DATA_VERSION = 6;
const MARKET_TAX_SETTING = "Taxa do Mercado (%)";
const WEEK_DAYS = [
  { id: 1, short: "Seg", name: "Segunda" },
  { id: 2, short: "Ter", name: "Terça" },
  { id: 3, short: "Qua", name: "Quarta" },
  { id: 4, short: "Qui", name: "Quinta" },
  { id: 5, short: "Sex", name: "Sexta" },
  { id: 6, short: "Sáb", name: "Sábado" },
  { id: 0, short: "Dom", name: "Domingo" },
];

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
  [MARKET_TAX_SETTING]: 4,
  "Material Graduado": 0,
  "Pedra Bruta da Dimensão (10 un.)": 1000000,
  "PC por item de craft": 2,
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

const JEWEL_ITEMS = Object.keys(jewelPrices);
const DEFAULT_RESET_GEMS = 25;

const DX_PREMIUM_IDS = new Set(["catacumba-premium", "caverna-premium", "morada-premium", "locomotiva-premium"]);
const DX_DIFICIL_IDS = new Set(["catacumba-dificil", "caverna-dificil", "morada-dificil", "locomotiva-dificil"]);
const VALE_LIMIT_IDS = new Set(["vale-dificil", "vale-desperto"]);

const cashbackTemplates = {
  torre2: [[28, "Jóia Enfraquecida Laranja"]],
  templo1: [[28, "Jóia Enfraquecida Amarela"]],
  castelo: [
    [15, "Jóia Enfraquecida Laranja"],
    [28, "Jóia Enfraquecida Laranja"],
  ],
  salao: [[15, "Jóia Enfraquecida Laranja"]],
  siena1: [
    [15, "Jóia Enfraquecida Vermelha"],
    [28, "Jóia Enfraquecida Laranja"],
  ],
  ilha: [
    [15, "Jóia Enfraquecida Vermelha"],
    [28, "Jóia Enfraquecida Laranja"],
  ],
  siena2: [
    [15, "Jóia Enfraquecida Vermelha"],
    [28, "Jóia Enfraquecida Laranja"],
  ],
  templo2: [
    [15, "Jóia Enfraquecida Laranja"],
    [28, "Jóia Enfraquecida Amarela"],
  ],
  entreposto: [
    [15, "Jóia Enfraquecida Laranja"],
    [28, "Jóia Enfraquecida Amarela"],
  ],
  pandemonium: [
    [15, "Jóia Enfraquecida Amarela"],
    [28, "Jóia Enfraquecida Verde"],
  ],
  torre3p2: [
    [15, "Jóia Enfraquecida Verde"],
    [28, "Jóia Enfraquecida Verde"],
  ],
  "ilha-desperta": [
    [15, "Jóia Enfraquecida Verde"],
    [28, "Jóia Enfraquecida Verde"],
  ],
  "templo2-desperto": [
    [15, "Jóia Enfraquecida Azul"],
    [28, "Jóia Enfraquecida Violeta"],
    [58, "Jóia Enfraquecida Branca"],
  ],
  acheron: [
    [15, "Jóia Enfraquecida Azul"],
    [28, "Jóia Enfraquecida Azul"],
    [58, "Jóia Enfraquecida Violeta"],
  ],
  "castelo-apocrifos": [
    [15, "Jóia Enfraquecida Azul"],
    [28, "Jóia Enfraquecida Violeta"],
    [58, "Jóia Enfraquecida Branca"],
  ],
  torre3: [
    [15, "Jóia Enfraquecida Azul"],
    [28, "Jóia Enfraquecida Violeta"],
    [50, "Jóia Enfraquecida Branca"],
  ],
  "catacumba-premium": [
    [10, "Jóia Enfraquecida Laranja"],
    [14, "Jóia Enfraquecida Amarela"],
  ],
  "caverna-premium": [
    [10, "Jóia Enfraquecida Laranja"],
    [14, "Jóia Enfraquecida Amarela"],
  ],
  "morada-premium": [
    [10, "Jóia Enfraquecida Laranja"],
    [14, "Jóia Enfraquecida Amarela"],
  ],
  "locomotiva-premium": [
    [10, "Jóia Enfraquecida Laranja"],
    [14, "Jóia Enfraquecida Amarela"],
  ],
};

const ENTRY_MODE_LABELS = {
  gems: "Gemas Arcanas",
  craft: "Craft (Chloe)",
  npc: "NPC (Yul)",
};
const ENTRY_MODE_SHORT_LABELS = {
  gems: "Gemas",
  craft: "Craft",
  npc: "NPC",
};
const ENTRY_MODE_ORDER = ["npc", "craft", "gems"];

const DIMENSION_STONE_PACK_KEY = "Pedra Bruta da Dimensão (10 un.)";
const CRAFT_ITEM_PC_COST_KEY = "PC por item de craft";

const craftRecipes = {
  lago: { successRate: 0.9, item: "Coral Ilusório", itemQty: 1, stoneQty: 1 },
  estacao: { successRate: 0.9, item: "Cabeça Máquina", itemQty: 1, stoneQty: 1 },
  torre1: { successRate: 0.85, item: "Crânio Astral", itemQty: 1, stoneQty: 2 },
  vulcanica: { successRate: 0.85, item: "Rubi Infernal", itemQty: 1, stoneQty: 2 },
  torre2: { successRate: 0.8, item: "Crânio Astral", itemQty: 1, stoneQty: 3 },
  templo1: { successRate: 0.8, item: "Casca de Besouro", itemQty: 1, stoneQty: 3 },
  castelo: { successRate: 0.75, item: "Coral Ilusório", itemQty: 1, stoneQty: 4 },
  siena1: { successRate: 0.75, item: "Frutinha Parasitada", itemQty: 1, stoneQty: 4 },
  ilha: { successRate: 0.7, item: "Rubi Infernal", itemQty: 1, stoneQty: 5 },
  siena2: { successRate: 0.7, item: "Frutinha Parasitada", itemQty: 1, stoneQty: 5 },
  salao: { successRate: 0.75, item: "Coral Ilusório", itemQty: 1, stoneQty: 6 },
  templo2: { successRate: 1, item: "Casca de Besouro", itemQty: 1, stoneQty: 6 },
};

const npcEntryTemplates = {
  lago: { pc: 1, alz: 1 },
  estacao: { pc: 1, alz: 1 },
  vulcanica: {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  templo1: {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  templo2: {
    pc: 9,
    alz: 1000000,
    items: [["Núcleo de Aprimoramento (Altíssimo)", 1]],
  },
  ilha: {
    pc: 6,
    alz: 800000,
    items: [["Núcleo de Aprimoramento (Alto)", 1]],
  },
  torre1: {
    pc: 2,
    alz: 500000,
    items: [["Núcleo de Aprimoramento (Alto)", 1]],
  },
  torre2: {
    pc: 4,
    alz: 800000,
    items: [["Núcleo de Aprimoramento (Alto)", 1]],
  },
  "vale-dificil": {
    pc: 4,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
  "vale-desperto": {
    pc: 5,
    alz: 2000000,
    items: [
      ["Núcleo Arcano (Altíssimo)", 2],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  siena1: {
    pc: 6,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Altíssimo)", 1],
      ["Núcleo de Aprimoramento (Alto)", 1],
    ],
  },
  siena2: {
    pc: 7,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Altíssimo)", 1],
      ["Núcleo de Aprimoramento (Alto)", 1],
    ],
  },
  castelo: {
    pc: 4,
    alz: 500000,
    items: [
      ["Núcleo de Aprimoramento (Altíssimo)", 1],
      ["Núcleo de Aprimoramento (Alto)", 1],
    ],
  },
  salao: {
    pc: 7,
    alz: 500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
  entreposto: {
    pc: 10,
    alz: 1000000,
    items: [
      ["Núcleo Arcano (Altíssimo)", 1],
      ["Núcleo de Aprimoramento (Altíssimo)", 1],
    ],
  },
  pandemonium: {
    pc: 6,
    alz: 1000000,
    items: [
      ["Núcleo Arcano (Altíssimo)", 1],
      ["Núcleo de Aprimoramento (Altíssimo)", 1],
    ],
  },
  acheron: {
    pc: 6,
    alz: 500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  "ilha-desperta": {
    pc: 8,
    alz: 500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  torre3p2: {
    pc: 7,
    alz: 500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  "templo2-desperto": {
    pc: 11,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  torre3: {
    pc: 11,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  "castelo-apocrifos": {
    pc: 7,
    alz: 1000000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 5],
      ["Núcleo de Aprimoramento (Altíssimo)", 2],
      ["Material Graduado", 1],
    ],
  },
  "catacumba-dificil": {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  "caverna-dificil": {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  "morada-dificil": {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  "locomotiva-dificil": {
    pc: 3,
    alz: 300000,
    items: [["Núcleo de Aprimoramento (Médio)", 1]],
  },
  "catacumba-desperta": {
    pc: 5,
    alz: 1500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
  "caverna-desperta": {
    pc: 5,
    alz: 1500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
  "morada-desperta": {
    pc: 5,
    alz: 1500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
  "locomotiva-desperta": {
    pc: 5,
    alz: 1500000,
    items: [
      ["Núcleo de Aprimoramento (Alto)", 1],
      ["Núcleo Arcano (Alto)", 1],
    ],
  },
};

const gemOnlyEntryTemplates = {
  "catacumba-premium": { pc: 4, item: "Gema Arcana", qty: 20 },
  "caverna-premium": { pc: 4, item: "Gema Arcana", qty: 20 },
  "morada-premium": { pc: 4, item: "Gema Arcana", qty: 20 },
  "locomotiva-premium": { pc: 4, item: "Gema Arcana", qty: 20 },
};

const removedDungeonIds = new Set(["salao-apocrifos"]);

function categoryForSettingItem(item) {
  if (item.startsWith("Núcleo de Aprimoramento")) return "Núcleo de Aprimoramento";
  if (item.startsWith("Núcleo Arcano")) return "Núcleo Arcano";
  if (item === "Material Graduado") return "Material";
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

function craftEntry(recipeId) {
  const recipe = craftRecipes[recipeId];
  return {
    item: recipe ? `Craft: ${recipe.item}` : "Craft (Chloe)",
    qty: 1,
    category: "Craft",
    entryMode: "craft",
    priceMode: "craftRecipe",
    craftRecipeId: recipeId,
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

const catacumbaDxBasic = [
  farmSetting("Núcleo Arcano (Alto)", 0.1, "Núcleo Arcano"),
  farmSetting("Núcleo Arcano (Altíssimo)", 0.18, "Núcleo Arcano"),
  farmSetting("Núcleo de Aprimoramento (Alto)", 0.43, "Núcleo de Aprimoramento"),
  farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.53, "Núcleo de Aprimoramento"),
  jewel("Jóia Enfraquecida Amarela", 1),
  jewel("Jóia Enfraquecida Laranja", 1),
];

const catacumbaDxExtras = [
  ...highValueDrops,
  drop("Espelho da Observação (Ouro)", "Especial"),
  drop("Gema da Liberação", "Gema"),
  drop("Livro de Treinamento de Minesta - Capítulo 28", "Livro"),
  drop("Pedaço do Cartão do Mercenário - Leedy", "Mercenário"),
  drop("Pedra Luminosa de Selena", "Especial"),
];

const cavernaDxBasic = [
  farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
  farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
  farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
  farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
  jewel("Jóia Enfraquecida Amarela", 1),
  jewel("Jóia Enfraquecida Laranja", 1),
];

const cavernaDxExtras = [
  ...highValueDrops,
  drop("Gema da Liberação", "Gema"),
  drop("Livro de Treinamento de Minesta - Capítulo 28", "Livro"),
];

const moradaDxBasic = [
  farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
  farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
  farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
  farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
  jewel("Jóia Enfraquecida Amarela", 1),
  jewel("Jóia Enfraquecida Laranja", 1),
];

const moradaDxExtras = [
  ...highValueDrops,
  drop("Gema da Liberação", "Gema"),
  drop("Pedra Luminosa de Selena", "Especial"),
];

const locomotivaDxBasic = [
  farmSetting("Núcleo Arcano (Alto)", 0.12, "Núcleo Arcano"),
  farmSetting("Núcleo Arcano (Altíssimo)", 0.16, "Núcleo Arcano"),
  farmSetting("Núcleo de Aprimoramento (Alto)", 0.44, "Núcleo de Aprimoramento"),
  farmSetting("Núcleo de Aprimoramento (Altíssimo)", 0.5, "Núcleo de Aprimoramento"),
  jewel("Jóia Enfraquecida Amarela", 1),
  jewel("Jóia Enfraquecida Laranja", 1),
];

const locomotivaDxExtras = [
  ...highValueDrops,
  drop("Gema da Liberação", "Gema"),
  drop("Pedaço do Cartão do Mercenário - Leedy", "Mercenário"),
];

function dxVariantDungeons(baseId, name, minutes, basic, extras) {
  return [
    {
      id: `${baseId}-dificil`,
      name: `${name} (Difícil)`,
      pc: 3,
      minutes,
      baseRuns: 30,
      canReset: false,
      resetRuns: 0,
      entries: npcEntryLines(`${baseId}-dificil`),
      basic,
      extras,
    },
    {
      id: `${baseId}-desperta`,
      name: `${name} (Desperta)`,
      pc: 5,
      minutes,
      baseRuns: 30,
      canReset: false,
      resetRuns: 0,
      entries: npcEntryLines(`${baseId}-desperta`),
      basic,
      extras,
    },
  ];
}

const defaultDungeons = [
  {
    id: "lago",
    name: "Lago do Crepúsculo",
    pc: 5,
    minutes: 2.2,
    baseRuns: 30,
    canReset: false,
    resetRuns: 0,
    entries: [craftEntry("lago")],
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
    entries: [craftEntry("estacao")],
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
    entries: [craftEntry("torre1")],
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
    entries: [craftEntry("vulcanica")],
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
    entries: [craftEntry("torre2")],
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
    entries: [craftEntry("templo1")],
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
      craftEntry("castelo"),
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
    entries: [craftEntry("salao")],
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
      craftEntry("siena1"),
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
    entries: [craftEntry("ilha")],
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
      craftEntry("siena2"),
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
    entries: [craftEntry("templo2")],
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
      settingItem("Núcleo de Aprimoramento (Alto)", 5),
      settingItem("Núcleo de Aprimoramento (Altíssimo)", 2),
      settingItem("Material Graduado", 1),
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
  ...dxVariantDungeons("catacumba", "Catacumba Gélida", 1.4, catacumbaDxBasic, catacumbaDxExtras),
  ...dxVariantDungeons("caverna", "Caverna do Pânico", 1.5, cavernaDxBasic, cavernaDxExtras),
  ...dxVariantDungeons("morada", "Morada das Chamas Infernais", 1.5, moradaDxBasic, moradaDxExtras),
  ...dxVariantDungeons("locomotiva", "Locomotiva Louca", 1.5, locomotivaDxBasic, locomotivaDxExtras),
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
    sellPc: true,
    rankMode: "hour",
    activeView: "ranking",
    favoriteDungeons: [],
    farmPlan: [],
    farmLogs: [],
    dailyDraft: null,
    entryModes: {},
    activeEntryModes: {},
    entryConfigOpen: {},
    countedDrops: {},
  },
};

const elements = {
  dungeonPicker: document.querySelector(".dungeon-picker"),
  dungeonButtons: document.querySelector("#dungeon-buttons"),
  dungeonSearch: document.querySelector("#dungeon-search"),
  dungeonTitle: document.querySelector("#dungeon-title"),
  runsInput: document.querySelector("#runs-input"),
  sellPcToggle: document.querySelector("#sell-pc-toggle"),
  resetCostDisplay: document.querySelector("#reset-cost-display"),
  entryList: document.querySelector("#entry-list"),
  entryModeSelect: document.querySelector("#entry-mode-select"),
  farmTimeMinutes: document.querySelector("#farm-time-minutes"),
  farmTimeSeconds: document.querySelector("#farm-time-seconds"),
  dgConfigTitle: document.querySelector("#dg-config-title"),
  dgConfigEntrySections: document.querySelector("#dg-config-entry-sections"),
  dgConfigPc: document.querySelector("#dg-config-pc"),
  dgConfigEnabled: document.querySelector("#dg-config-enabled"),
  dgConfigCashbackList: document.querySelector("#dg-config-cashback-list"),
  openDgSettings: document.querySelector("#open-dg-settings"),
  backToFarm: document.querySelector("#back-to-farm"),
  settingsMenuToggle: document.querySelector("#settings-menu-toggle"),
  settingsMenuOptions: document.querySelector("#settings-menu-options"),
  basicFarmList: document.querySelector("#basic-farm-list"),
  cashbackList: document.querySelector("#cashback-list"),
  extraDropList: document.querySelector("#extra-drop-list"),
  pcPerRunDisplay: document.querySelector("#pc-per-run-display"),
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
  planDungeonSelect: document.querySelector("#plan-dungeon-select"),
  planEntryModeSelect: document.querySelector("#plan-entry-mode-select"),
  planRunsInput: document.querySelector("#plan-runs-input"),
  addPlanItem: document.querySelector("#add-plan-item"),
  planItemList: document.querySelector("#plan-item-list"),
  planDayList: document.querySelector("#plan-day-list"),
  planWeekCost: document.querySelector("#plan-week-cost"),
  planWeekReturn: document.querySelector("#plan-week-return"),
  planWeekProfit: document.querySelector("#plan-week-profit"),
  planWeekTime: document.querySelector("#plan-week-time"),
  logDateInput: document.querySelector("#log-date-input"),
  logDungeonSelect: document.querySelector("#log-dungeon-select"),
  logEntryModeSelect: document.querySelector("#log-entry-mode-select"),
  logRunsInput: document.querySelector("#log-runs-input"),
  logSellPcToggle: document.querySelector("#log-sell-pc-toggle"),
  logNotesInput: document.querySelector("#log-notes-input"),
  saveFarmLog: document.querySelector("#save-farm-log"),
  logPreviewCost: document.querySelector("#log-preview-cost"),
  logPreviewReturn: document.querySelector("#log-preview-return"),
  logPreviewProfit: document.querySelector("#log-preview-profit"),
  logPreviewTime: document.querySelector("#log-preview-time"),
  logPreviewBreakdown: document.querySelector("#log-preview-breakdown"),
  logFarmList: document.querySelector("#log-farm-list"),
  logDropList: document.querySelector("#log-drop-list"),
  loadStandardFarm: document.querySelector("#load-standard-farm"),
  clearLogFarm: document.querySelector("#clear-log-farm"),
  logManualItem: document.querySelector("#log-manual-item"),
  logManualPrice: document.querySelector("#log-manual-price"),
  addManualLogItem: document.querySelector("#add-manual-log-item"),
  farmLogList: document.querySelector("#farm-log-list"),
  summaryMonthInput: document.querySelector("#summary-month-input"),
  summaryMonthCost: document.querySelector("#summary-month-cost"),
  summaryMonthReturn: document.querySelector("#summary-month-return"),
  summaryMonthProfit: document.querySelector("#summary-month-profit"),
  summaryMonthTime: document.querySelector("#summary-month-time"),
  summaryChart: document.querySelector("#summary-chart"),
  summaryCalendar: document.querySelector("#summary-calendar"),
  summaryLogList: document.querySelector("#summary-log-list"),
  resetLocalData: document.querySelector("#reset-local-data"),
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeDungeonsWithDefaults(savedDungeons) {
  if (!Array.isArray(savedDungeons)) return clone(defaultDungeons);

  const savedById = new Map(savedDungeons.map((dungeon) => [dungeon.id, dungeon]));
  return clone(defaultDungeons).map((defaultDungeon) => {
    const savedDungeon = savedById.get(defaultDungeon.id);
    if (!savedDungeon) return defaultDungeon;

    return {
      ...defaultDungeon,
      ...savedDungeon,
      entries: Array.isArray(savedDungeon.entries) ? savedDungeon.entries : defaultDungeon.entries,
      basic: Array.isArray(savedDungeon.basic) ? savedDungeon.basic : defaultDungeon.basic,
      extras: Array.isArray(savedDungeon.extras) ? savedDungeon.extras : defaultDungeon.extras,
      cashback: Array.isArray(savedDungeon.cashback) ? savedDungeon.cashback : defaultDungeon.cashback,
    };
  });
}

function loadSavedData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;
    app.savedDataVersion = Number(saved.dataVersion || 0);
    app.settings = { ...clone(defaultSettings), ...(saved.settings || {}) };
    app.dungeons = mergeDungeonsWithDefaults(saved.dungeons);
    app.ui = {
      ...app.ui,
      ...(saved.ui || {}),
      activeView: "ranking",
      rankMode: saved.ui?.rankMode === "rush" ? "rush" : "hour",
      favoriteDungeons: Array.isArray(saved.ui?.favoriteDungeons) ? saved.ui.favoriteDungeons : [],
      farmPlan: Array.isArray(saved.ui?.farmPlan) ? saved.ui.farmPlan : [],
      farmLogs: Array.isArray(saved.ui?.farmLogs) ? saved.ui.farmLogs : [],
      dailyDraft: saved.ui?.dailyDraft || null,
      entryModes: saved.ui?.entryModes || {},
      activeEntryModes: saved.ui?.activeEntryModes || {},
      entryConfigOpen: saved.ui?.entryConfigOpen || {},
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
      dataVersion: DATA_VERSION,
    }),
  );
}

function isAlzEntry(line) {
  return line.item === "Alz" || line.category === "Alz";
}

function isJewelLine(line) {
  return line?.category === "Jóia" || Object.prototype.hasOwnProperty.call(jewelPrices, line?.item);
}

function isCraftRecipeEntry(line) {
  return line?.priceMode === "craftRecipe" && Boolean(line?.craftRecipeId);
}

function normalizeJewelItem(item) {
  return JEWEL_ITEMS.includes(item) ? item : JEWEL_ITEMS[0];
}

function jewelColor(item) {
  return normalizeJewelItem(item).replace("Jóia Enfraquecida ", "");
}

function jewelToneClass(item) {
  const tones = {
    Vermelha: "red",
    Laranja: "orange",
    Amarela: "yellow",
    Verde: "green",
    Azul: "blue",
    Violeta: "violet",
    Branca: "white",
  };
  return `jewel-${tones[jewelColor(item)] || "yellow"}`;
}

function jewelIconHtml(item) {
  return `<span class="jewel-coin ${jewelToneClass(item)}" aria-hidden="true"></span>`;
}

function itemNameHtml(item, category, options = {}) {
  const title = escapeHtml(options.title || item);
  const label = escapeHtml(item);
  const small = options.small ? `<small>${escapeHtml(options.small)}</small>` : "";

  if (isJewelLine({ item, category })) {
    return `${jewelIconHtml(item)}<span title="${title}">${label}</span>${small}`;
  }

  return `<span class="swatch ${swatchClass(category || item)}"></span><span title="${title}">${label}</span>${small}`;
}

function inlineItemNameHtml(item, category) {
  const label = escapeHtml(item);
  if (isJewelLine({ item, category })) {
    return `${jewelIconHtml(item)}<span>${label}</span>`;
  }
  return label;
}

function jewelValue(item) {
  return jewelPrices[normalizeJewelItem(item)] || 0;
}

function cashbackRewardValue(reward, dungeon = currentDungeon(), entryMode = currentEntryMode(dungeon)) {
  return jewelValue(reward.item) + integerValue(reward.entryQty) * entryCostForMode(dungeon, entryMode, 1);
}

function defaultCashbackForDungeon(dungeon) {
  return (cashbackTemplates[dungeon.id] || []).map(([runs, item]) => ({
    runs,
    item,
    entryQty: 0,
    category: "Jóia",
  }));
}

function normalizeCashbackRewards(rewards) {
  if (!Array.isArray(rewards)) return [];
  return rewards
    .map((reward) => ({
      runs: Math.max(1, Math.round(Number(reward?.runs || reward?.requiredRuns) || 1)),
      item: normalizeJewelItem(reward?.item || reward?.jewel),
      entryQty: integerValue(reward?.entryQty ?? reward?.entries ?? 0),
      category: "Jóia",
    }))
    .sort((a, b) => a.runs - b.runs);
}

function defaultBaseRunLimit(dungeon) {
  if (DX_PREMIUM_IDS.has(dungeon.id)) return 15;
  if (DX_DIFICIL_IDS.has(dungeon.id) || VALE_LIMIT_IDS.has(dungeon.id)) return 20;
  return 30;
}

function baseRunLimit(dungeon = currentDungeon()) {
  return Math.max(1, Math.round(Number(dungeon.baseRuns) || defaultBaseRunLimit(dungeon)));
}

function dungeonTimeParts(dungeon = currentDungeon()) {
  const totalSeconds = Math.max(0, Math.round(numberValue(dungeon.minutes) * 60));
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
  };
}

function setDungeonTimeFromParts(dungeon = currentDungeon(), minutes = 0, seconds = 0) {
  const totalSeconds = integerValue(minutes) * 60 + Math.min(59, integerValue(seconds));
  dungeon.minutes = totalSeconds / 60;
}

function resetGemQty(dungeon = currentDungeon()) {
  return Math.max(0, Math.round(Number(dungeon.resetCostGems ?? DEFAULT_RESET_GEMS)));
}

function resetCount(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return Math.max(0, Math.ceil((runs - baseRunLimit(dungeon)) / baseRunLimit(dungeon)));
}

function resetCost(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return resetCount(dungeon, runs) * resetGemQty(dungeon) * gemUnitValue();
}

function farmLineQty(line, dungeon = currentDungeon()) {
  if (line.qty !== undefined) return integerValue(line.qty);
  if (line.qtyPerRun !== undefined) return integerValue(numberValue(line.qtyPerRun) * baseRunLimit(dungeon));
  return 0;
}

function normalizeFarmLine(line, dungeon = currentDungeon()) {
  const normalized = { ...line, qty: farmLineQty(line, dungeon) };
  delete normalized.qtyPerRun;
  return normalized;
}

function inferEntryMode(line) {
  if (line.entryMode) return line.entryMode;
  if (isCraftRecipeEntry(line)) return "craft";
  if (line.priceMode === "gem" || line.category === "Gema") return "gems";
  if (isAlzEntry(line) || line.priceKey) return "npc";
  return "craft";
}

function defaultEntryMode(dungeon) {
  const modes = availableEntryModes(dungeon);
  if (modes.includes("npc")) return "npc";
  if (modes.includes("craft")) return "craft";
  if (modes.includes("gems")) return "gems";
  return "npc";
}

function ensureCraftRecipeEntry(dungeon) {
  const recipe = craftRecipes[dungeon.id];
  if (!recipe) return;

  dungeon.entries = (dungeon.entries || []).filter((line) => {
    if (isCraftRecipeEntry(line)) return true;
    if (inferEntryMode(line) !== "craft") return true;
    return line.item !== recipe.item && !String(line.item || "").includes("Pedra");
  });

  const existing = dungeon.entries.find((line) => isCraftRecipeEntry(line) && line.craftRecipeId === dungeon.id);
  if (existing) {
    existing.item = `Craft: ${recipe.item}`;
    existing.qty = 1;
    existing.category = "Craft";
    existing.entryMode = "craft";
    return;
  }

  dungeon.entries.unshift(craftEntry(dungeon.id));
}

function npcEntryLines(dungeonId) {
  const template = npcEntryTemplates[dungeonId];
  if (!template) return [];

  return [
    alzEntry(template.alz),
    ...(template.items || []).map(([item, qty]) => settingItem(item, qty, "npc")),
  ];
}

function ensureNpcEntryTemplate(dungeon, forceTemplate = false) {
  const template = npcEntryTemplates[dungeon.id];
  if (!template) return;

  const hasNpcEntry = (dungeon.entries || []).some((line) => inferEntryMode(line) === "npc");
  if (forceTemplate || !hasNpcEntry) {
    dungeon.pc = template.pc;
    dungeon.entries = [
      ...(dungeon.entries || []).filter((line) => inferEntryMode(line) !== "npc"),
      ...npcEntryLines(dungeon.id),
    ];
  }
}

function ensureGemOnlyEntryTemplate(dungeon) {
  const template = gemOnlyEntryTemplates[dungeon.id];
  if (!template) return;

  dungeon.pc = template.pc;
  dungeon.entries = [gemEntry(template.item, template.qty)];
  dungeon.gemEntryEnabled = true;
}

function ensureGemEntryLine(dungeon) {
  dungeon.entries = dungeon.entries || [];
  let line = dungeon.entries.find((entry) => inferEntryMode(entry) === "gems");
  if (!line) {
    line = gemEntry("Gema Arcana", 20);
    dungeon.entries.push(line);
  }

  line.item = line.item || "Gema Arcana";
  line.category = "Gema";
  line.entryMode = "gems";
  line.priceMode = "gem";
  line.qty = integerValue(line.qty) || 20;
  return line;
}

function npcEntryIsAvailable(dungeon) {
  return (dungeon.entries || [])
    .filter((line) => inferEntryMode(line) === "npc")
    .some((line) => !isAlzEntry(line) || Number(line.qty) > 0);
}

function availableEntryModes(dungeon = currentDungeon()) {
  const modes = [];
  if (npcEntryIsAvailable(dungeon)) modes.push("npc");
  if (craftRecipes[dungeon.id]) modes.push("craft");
  if (dungeon.gemEntryEnabled) modes.push("gems");
  return modes.sort((a, b) => ENTRY_MODE_ORDER.indexOf(a) - ENTRY_MODE_ORDER.indexOf(b));
}

function activeEntryModes(dungeon = currentDungeon()) {
  const modes = availableEntryModes(dungeon);
  if (!modes.length) return [];

  const saved = app.ui.activeEntryModes?.[dungeon.id];
  if (!Array.isArray(saved)) return [...modes];

  const active = saved.filter((mode) => modes.includes(mode));
  return active.length ? active : [modes[0]];
}

function normalizeActiveEntryModes(dungeon = currentDungeon()) {
  if (!app.ui.activeEntryModes) app.ui.activeEntryModes = {};
  app.ui.activeEntryModes[dungeon.id] = activeEntryModes(dungeon);
}

function setEntryModeActive(dungeon, mode, enabled) {
  const modes = availableEntryModes(dungeon);
  if (!modes.includes(mode)) return false;

  const active = new Set(activeEntryModes(dungeon));
  if (enabled) {
    active.add(mode);
  } else if (active.size > 1) {
    active.delete(mode);
  }

  app.ui.activeEntryModes[dungeon.id] = modes.filter((availableMode) => active.has(availableMode));
  return app.ui.activeEntryModes[dungeon.id].includes(mode) === enabled;
}

function ensureAvailableEntryMode(dungeon = currentDungeon()) {
  const modes = availableEntryModes(dungeon);
  if (!modes.length) return;
  if (!modes.includes(app.ui.entryModes[dungeon.id])) {
    app.ui.entryModes[dungeon.id] = modes[0];
  }
}

function renderEntryModeOptions() {
  if (!elements.entryModeSelect) return;
  const dungeon = currentDungeon();
  const modes = availableEntryModes(dungeon);
  elements.entryModeSelect.innerHTML = modes
    .map((mode) => `<option value="${mode}">${ENTRY_MODE_LABELS[mode]}</option>`)
    .join("");
  elements.entryModeSelect.disabled = modes.length <= 1;
  if (modes.includes(currentEntryMode(dungeon))) {
    elements.entryModeSelect.value = currentEntryMode(dungeon);
  }
}

function entryConfigKey(dungeon, mode) {
  return `${dungeon.id}:${mode}`;
}

function entryConfigIsOpen(dungeon, mode) {
  return Boolean(app.ui.entryConfigOpen[entryConfigKey(dungeon, mode)]);
}

function normalizeAppData() {
  app.dungeons = app.dungeons.filter((dungeon) => !removedDungeonIds.has(dungeon.id));

  if (!app.dungeons.some((dungeon) => dungeon.id === app.ui.selectedDungeon)) {
    app.ui.selectedDungeon = app.dungeons[0]?.id || "lago";
  }

  const useCurrentDefaults = (app.savedDataVersion || 0) < DATA_VERSION;

  app.dungeons.forEach((dungeon) => {
    dungeon.enabled = dungeon.enabled !== false;
    dungeon.baseRuns = useCurrentDefaults ? defaultBaseRunLimit(dungeon) : baseRunLimit(dungeon);
    dungeon.resetCostGems = useCurrentDefaults ? DEFAULT_RESET_GEMS : resetGemQty(dungeon);
    dungeon.entries = (dungeon.entries || []).map((line) => {
      const normalized = {
        ...line,
        entryMode: inferEntryMode(line),
          category: line.category || categoryForSettingItem(line.item),
      };

      if (isCraftRecipeEntry(normalized)) {
        normalized.qty = 1;
        normalized.category = "Craft";
        normalized.entryMode = "craft";
        delete normalized.price;
        delete normalized.priceKey;
      }

      if (isAlzEntry(normalized)) {
        normalized.item = "Alz";
        normalized.category = "Alz";
        normalized.entryMode = "npc";
        delete normalized.price;
        delete normalized.priceKey;
        delete normalized.priceMode;
      }

      if (!isAlzEntry(normalized) && !isCraftRecipeEntry(normalized)) {
        normalized.qty = integerValue(normalized.qty);
      }

      return normalized;
    });
    if (Array.isArray(app.ui.countedDrops[dungeon.id])) {
      app.ui.countedDrops[dungeon.id] = app.ui.countedDrops[dungeon.id].map((line) => ({
        ...line,
        qty: integerValue(line.qty),
      }));
    }
    dungeon.gemEntryEnabled = Boolean(dungeon.gemEntryEnabled ?? (dungeon.entries || []).some((line) => inferEntryMode(line) === "gems"));
    ensureGemEntryLine(dungeon);
    ensureCraftRecipeEntry(dungeon);
    ensureNpcEntryTemplate(dungeon, useCurrentDefaults);
    ensureGemOnlyEntryTemplate(dungeon);
    dungeon.basic = (dungeon.basic || [])
      .filter((line) => !isJewelLine(line))
      .map((line) => normalizeFarmLine(line, dungeon));
    dungeon.cashback = normalizeCashbackRewards(
      useCurrentDefaults || !Array.isArray(dungeon.cashback) ? defaultCashbackForDungeon(dungeon) : dungeon.cashback,
    );
    if (!app.ui.entryModes[dungeon.id]) {
      app.ui.entryModes[dungeon.id] = defaultEntryMode(dungeon);
    }
    ensureAvailableEntryMode(dungeon);
    normalizeActiveEntryModes(dungeon);
  });

  app.ui.farmLogs = farmLogs().map(normalizedFarmLog);
  if (app.ui.dailyDraft?.dungeonId && app.dungeons.some((dungeon) => dungeon.id === app.ui.dailyDraft.dungeonId)) {
    app.ui.dailyDraft.items = normalizedLogItems(app.ui.dailyDraft.items);
  } else {
    app.ui.dailyDraft = null;
  }
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
    "cost-value",
    "alz-tier-10k",
    "alz-tier-100k",
    "alz-tier-1m",
    "alz-tier-10m",
    "alz-tier-100m",
    "alz-tier-1b",
    "alz-tier-10b",
    "alz-tier-100b",
    "metric-multi-value",
  );
  const tierClass = alzTierClass(value);
  node.classList.add("alz-value");
  if (tierClass) node.classList.add(tierClass);
}

function applyCostDisplay(node, value) {
  node.textContent = `- ${formatAlz(Math.abs(value))}`;
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
    "metric-multi-value",
  );
  node.classList.add("alz-value", "cost-value");
}

function alzHtml(value, attributes = "") {
  const tierClass = alzTierClass(value);
  const className = `alz-value${tierClass ? ` ${tierClass}` : ""}`;
  return `<span class="${className}"${attributes ? ` ${attributes}` : ""}>${formatAlz(value)}</span>`;
}

function costAlzHtml(value, attributes = "") {
  return `<span class="alz-value cost-value"${attributes ? ` ${attributes}` : ""}>- ${formatAlz(Math.abs(value))}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function iconSvg(icon) {
  const paths = {
    plus: '<path d="M12 5v14"></path><path d="M5 12h14"></path>',
    x: '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>',
    star: '<path d="m12 3 2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.4-2.84-5.4 2.84 1.03-6-4.36-4.25 6.03-.88L12 3Z"></path>',
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

function integerValue(value) {
  return Math.max(0, Math.round(numberValue(value)));
}

function moneyValue(value) {
  return Math.max(0, Number(String(value).replace(/\s/g, "").replace(/\./g, "").replace(",", ".")) || 0);
}

function formatMoneyInput(input) {
  input.value = formatAlzNumber(moneyValue(input.value));
}

function isMoneySettingKey(key) {
  return !key.startsWith("Quantidade") && key !== CRAFT_ITEM_PC_COST_KEY && key !== MARKET_TAX_SETTING;
}

function currentDungeon() {
  return app.dungeons.find((dungeon) => dungeon.id === app.ui.selectedDungeon) || app.dungeons[0];
}

function isDungeonEnabled(dungeon) {
  return dungeon?.enabled !== false;
}

function enabledDungeons() {
  return app.dungeons.filter(isDungeonEnabled);
}

function selectableDungeons() {
  return enabledDungeons().length ? enabledDungeons() : app.dungeons;
}

function favoriteDungeonIds() {
  if (!Array.isArray(app.ui.favoriteDungeons)) app.ui.favoriteDungeons = [];
  return app.ui.favoriteDungeons;
}

function isFavoriteDungeon(dungeonId) {
  return favoriteDungeonIds().includes(dungeonId);
}

function toggleFavoriteDungeon(dungeonId) {
  const favorites = favoriteDungeonIds();
  if (favorites.includes(dungeonId)) {
    app.ui.favoriteDungeons = favorites.filter((id) => id !== dungeonId);
  } else {
    favorites.push(dungeonId);
  }
}

function favoriteButtonHtml(dungeon, compact = false) {
  const active = isFavoriteDungeon(dungeon.id);
  return `
    <button
      class="favorite-button ${active ? "active" : ""} ${compact ? "compact" : ""}"
      data-favorite-dungeon="${dungeon.id}"
      type="button"
      aria-pressed="${active}"
      aria-label="${active ? "Remover dos favoritos" : "Adicionar aos favoritos"}: ${dungeon.name}"
      title="${active ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
    >
      ${iconSvg("star")}
    </button>
  `;
}

function gemUnitValue() {
  return (app.settings["Card Cash Ouro (1000 Cash)"] || 0) / 1000;
}

function marketTaxRate() {
  return Math.min(1, Math.max(0, numberValue(app.settings[MARKET_TAX_SETTING] ?? 4) / 100));
}

function auctionNet(value) {
  return Math.max(0, (Number(value) || 0) * (1 - marketTaxRate()));
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

function pcProfit100() {
  return auctionNet(app.settings["Protetor PC (100 PC)"] || 0) - protectorCost();
}

function pcUnitProfit() {
  return pcProfit100() / 100;
}

function craftStoneUnitValue() {
  return (app.settings[DIMENSION_STONE_PACK_KEY] || 0) / 10;
}

function craftItemUnitValue() {
  return (app.settings[CRAFT_ITEM_PC_COST_KEY] || 0) * pcUnitProfit();
}

function craftRecipeForLine(line) {
  return isCraftRecipeEntry(line) ? craftRecipes[line.craftRecipeId] : null;
}

function craftRecipeAttemptCost(recipe) {
  if (!recipe) return 0;
  return recipe.itemQty * craftItemUnitValue() + recipe.stoneQty * craftStoneUnitValue();
}

function craftRecipeExpectedCost(recipe) {
  if (!recipe?.successRate) return 0;
  return craftRecipeAttemptCost(recipe) / recipe.successRate;
}

function craftRecipeDetails(recipe) {
  if (!recipe) return "";
  return `${recipe.itemQty} ${recipe.item} + ${recipe.stoneQty} Pedra Bruta da Dimensão`;
}

function craftRecipeChance(recipe) {
  return `${formatNumber((recipe?.successRate || 0) * 100)}%`;
}

function priceForLine(line) {
  if (line.priceMode === "gem") return gemUnitValue();
  if (isCraftRecipeEntry(line)) return craftRecipeExpectedCost(craftRecipeForLine(line));
  if (line.priceKey) return app.settings[line.priceKey] || 0;
  return line.price || 0;
}

function entryLineCostPerRun(line) {
  if (isAlzEntry(line)) return Number(line.qty) || 0;
  return integerValue(line.qty) * priceForLine(line);
}

function canEditEntryQty(line) {
  return !isAlzEntry(line) && !isCraftRecipeEntry(line);
}

function canEditEntryPrice(line) {
  return line.entryMode === "craft" && !line.priceKey && line.priceMode !== "gem" && !isCraftRecipeEntry(line) && line.item !== "Alz";
}

function canEditBasicPrice(line) {
  return !line.priceKey;
}

function currentEntryMode(dungeon = currentDungeon()) {
  const mode = app.ui.entryModes[dungeon.id] || defaultEntryMode(dungeon);
  const modes = availableEntryModes(dungeon);
  return modes.includes(mode) ? mode : modes[0] || "npc";
}

function entryRecordsForMode(dungeon = currentDungeon(), mode = currentEntryMode(dungeon)) {
  return (dungeon.entries || [])
    .map((line, index) => ({ line, index }))
    .filter((record) => record.line.entryMode === mode && !(mode === "craft" && isAlzEntry(record.line)));
}

function activeEntryRecords(dungeon = currentDungeon()) {
  return entryRecordsForMode(dungeon, currentEntryMode(dungeon));
}

function ensureAlzEntryForMode(dungeon = currentDungeon(), mode = currentEntryMode(dungeon)) {
  dungeon.entries = dungeon.entries || [];
  let index = dungeon.entries.findIndex((line) => isAlzEntry(line) && line.entryMode === mode);
  if (index < 0) {
    dungeon.entries.unshift(alzEntry(0));
    dungeon.entries[0].entryMode = mode;
    index = 0;
  }
  return { line: dungeon.entries[index], index };
}

function entryItemOptions() {
  return [
    ...Object.keys(app.settings).filter((key) => key.startsWith("Núcleo Arcano")),
    ...Object.keys(app.settings).filter((key) => key.startsWith("Núcleo de Aprimoramento")),
    "Material Graduado",
  ];
}

function entryItemOptionsHtml() {
  return entryItemOptions()
    .map((item) => `<option value="${item}">${item}</option>`)
    .join("");
}

function addEntryItemToMode(mode, item, qty = 1) {
  const dungeon = currentDungeon();
  if (!item || qty <= 0) return;

  const existing = dungeon.entries.find((line) => line.entryMode === mode && line.item === item);
  if (existing) {
    existing.qty = integerValue(existing.qty) + integerValue(qty);
  } else {
    dungeon.entries.push(settingItem(item, integerValue(qty), mode));
  }
}

function removeEntryLine(index) {
  const dungeon = currentDungeon();
  const line = dungeon.entries[index];
  if (!line || isAlzEntry(line)) return;
  dungeon.entries.splice(index, 1);
}

function effectiveRuns(dungeon = currentDungeon()) {
  return Math.max(1, Math.round(Number(app.ui.runs) || baseRunLimit(dungeon)));
}

function entryCost(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  const entryRunsCost = activeEntryRecords(dungeon).reduce((sum, record) => {
    return sum + entryLineCostPerRun(record.line) * runs;
  }, 0);
  return entryRunsCost + resetCost(dungeon, runs);
}

function entryCostForMode(dungeon, mode, runs = 1) {
  return (dungeon.entries || [])
    .filter((line) => line.entryMode === mode && !(mode === "craft" && isAlzEntry(line)))
    .reduce((sum, line) => sum + entryLineCostPerRun(line) * runs, 0);
}

function entryCostForPlan(dungeon, mode, runs = 1) {
  return entryCostForMode(dungeon, mode, runs) + resetCost(dungeon, runs);
}

function basicReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  const gross = (dungeon.basic || [])
    .filter((line) => !isJewelLine(line))
    .reduce((sum, line) => sum + farmLineQty(line, dungeon) * priceForLine(line), 0);
  return auctionNet(gross);
}

function cashbackReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), entryMode = currentEntryMode(dungeon)) {
  return (dungeon.cashback || [])
    .filter((reward) => runs >= reward.runs)
    .reduce((sum, reward) => sum + cashbackRewardValue(reward, dungeon, entryMode), 0);
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
    dungeon.basic.push(normalizeFarmLine(candidate.farmLine, dungeon));
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
  let gross = 0;
  if (record.source === "basic") {
    gross = farmLineQty(record.line, dungeon) * priceForLine(record.line);
  } else {
    gross = integerValue(record.line.qty) * record.line.price;
  }

  return auctionNet(gross);
}

function extraReturn(dungeon = currentDungeon()) {
  const gross = countedDrops(dungeon).reduce((sum, line) => sum + integerValue(line.qty) * line.price, 0);
  return auctionNet(gross);
}

function farmReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return basicReturn(dungeon, runs) + extraReturn(dungeon);
}

function pcReturn(dungeon = currentDungeon(), runs = effectiveRuns(dungeon)) {
  return app.ui.sellPc ? dungeon.pc * runs * pcUnitProfit() : 0;
}

function pcReturnForOption(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), sellPc = true) {
  return sellPc ? dungeon.pc * runs * pcUnitProfit() : 0;
}

function farmEstimate(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), entryMode = currentEntryMode(dungeon), sellPc = app.ui.sellPc) {
  const cost = entryCostForPlan(dungeon, entryMode, runs);
  const farm = farmReturn(dungeon, runs);
  const cashback = cashbackReturn(dungeon, runs, entryMode);
  const pc = pcReturnForOption(dungeon, runs, sellPc);
  const retorno = farm + cashback + pc;
  const lucro = retorno - cost;
  const minutes = dungeon.minutes * runs;
  return { cost, farm, cashback, pc, retorno, lucro, minutes };
}

function profit(dungeon = currentDungeon(), runs = effectiveRuns(dungeon), includeExtras = true) {
  const entryMode = activeEntryModes(dungeon)[0] || currentEntryMode(dungeon);
  const farm = includeExtras || dungeon.id === currentDungeon().id ? farmReturn(dungeon, runs) : basicReturn(dungeon, runs);
  return farm + cashbackReturn(dungeon, runs, entryMode) + pcReturn(dungeon, runs) - entryCostForPlan(dungeon, entryMode, runs);
}

function planItems() {
  if (!Array.isArray(app.ui.farmPlan)) app.ui.farmPlan = [];
  return app.ui.farmPlan;
}

function planItemDungeon(item) {
  return app.dungeons.find((dungeon) => dungeon.id === item.dungeonId) || app.dungeons[0];
}

function normalizedPlanItem(item) {
  const dungeon = planItemDungeon(item);
  const modes = availableEntryModes(dungeon);
  const mode = modes.includes(item.entryMode) ? item.entryMode : defaultEntryMode(dungeon);
  const days = Array.isArray(item.days) && item.days.length ? item.days.map(integerValue) : [1, 2, 3, 4, 5];
  return {
    id: item.id || `plan-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    dungeonId: dungeon.id,
    entryMode: mode,
    runs: Math.max(1, integerValue(item.runs) || baseRunLimit(dungeon)),
    days: [...new Set(days)].filter((day) => WEEK_DAYS.some((weekDay) => weekDay.id === day)),
  };
}

function planItemTotals(item) {
  const normalized = normalizedPlanItem(item);
  const dungeon = planItemDungeon(normalized);
  const runs = normalized.runs;
  return { ...normalized, dungeon, runs, ...farmEstimate(dungeon, runs, normalized.entryMode, app.ui.sellPc) };
}

function planDayTotals(dayId) {
  return planItems()
    .map(planItemTotals)
    .filter((item) => item.days.includes(dayId))
    .reduce(
      (sum, item) => ({
        cost: sum.cost + item.cost,
        retorno: sum.retorno + item.retorno,
        lucro: sum.lucro + item.lucro,
        minutes: sum.minutes + item.minutes,
        count: sum.count + 1,
      }),
      { cost: 0, retorno: 0, lucro: 0, minutes: 0, count: 0 },
    );
}

function farmLogs() {
  if (!Array.isArray(app.ui.farmLogs)) app.ui.farmLogs = [];
  return app.ui.farmLogs;
}

function todayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function currentMonthIso() {
  return todayIso().slice(0, 7);
}

function dateLabel(isoDate) {
  if (!isoDate) return "";
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function selectedLogDungeon() {
  return app.dungeons.find((dungeon) => dungeon.id === elements.logDungeonSelect?.value) || currentDungeon();
}

function selectedLogRuns(dungeon = selectedLogDungeon()) {
  return Math.max(1, integerValue(elements.logRunsInput?.value) || baseRunLimit(dungeon));
}

function selectedLogEntryMode(dungeon = selectedLogDungeon()) {
  const modes = availableEntryModes(dungeon);
  const selectedMode = elements.logEntryModeSelect?.value;
  return modes.includes(selectedMode) ? selectedMode : defaultEntryMode(dungeon);
}

function normalizeLogItem(item) {
  return {
    item: String(item?.item || "").trim(),
    category: item?.category || "Drop",
    qty: integerValue(item?.qty),
    price: moneyValue(item?.price ?? 0),
  };
}

function normalizedLogItems(items) {
  return (Array.isArray(items) ? items : [])
    .map(normalizeLogItem)
    .filter((item) => item.item && item.qty > 0);
}

function resetDailyDraft(dungeon = selectedLogDungeon()) {
  app.ui.dailyDraft = {
    dungeonId: dungeon.id,
    items: [],
  };
  return app.ui.dailyDraft;
}

function dailyDraft(dungeon = selectedLogDungeon()) {
  if (!app.ui.dailyDraft || app.ui.dailyDraft.dungeonId !== dungeon.id) {
    return resetDailyDraft(dungeon);
  }
  app.ui.dailyDraft.items = normalizedLogItems(app.ui.dailyDraft.items);
  return app.ui.dailyDraft;
}

function dailyDraftItems(dungeon = selectedLogDungeon()) {
  return dailyDraft(dungeon).items;
}

function knownDropPrice(item) {
  if (Object.prototype.hasOwnProperty.call(app.settings, item)) return app.settings[item] || 0;
  if (Object.prototype.hasOwnProperty.call(jewelPrices, item)) return jewelValue(item);
  return 0;
}

function logQtyFromFarmRecord(record, dungeon = selectedLogDungeon(), runs = selectedLogRuns(dungeon)) {
  if (record.source === "basic") {
    return integerValue((integerValue(record.line.qty) / baseRunLimit(dungeon)) * runs);
  }
  return integerValue(record.line.qty) || 1;
}

function logItemFromFarmRecord(record, dungeon = selectedLogDungeon(), runs = selectedLogRuns(dungeon)) {
  return normalizeLogItem({
    item: record.line.item,
    category: record.line.category || "Farm",
    qty: Math.max(1, logQtyFromFarmRecord(record, dungeon, runs)),
    price: priceForLine(record.line),
  });
}

function logItemFromDropCandidate(candidate) {
  const info = dropCandidateInfo(candidate);
  const sourceLine = !Array.isArray(candidate) && (candidate.farmLine || candidate.countedLine);
  return normalizeLogItem({
    item: info.item,
    category: info.category,
    qty: sourceLine ? integerValue(sourceLine.qty) || 1 : 1,
    price: sourceLine ? priceForLine(sourceLine) || sourceLine.price || knownDropPrice(info.item) : knownDropPrice(info.item),
  });
}

function addLogItem(item) {
  const draft = dailyDraft();
  const normalized = normalizeLogItem(item);
  if (!normalized.item) return;
  const existing = draft.items.find((current) => current.item === normalized.item);
  if (existing) {
    existing.qty = integerValue(existing.qty) + Math.max(1, normalized.qty);
    if (!existing.price && normalized.price) existing.price = normalized.price;
  } else {
    draft.items.push({
      ...normalized,
      qty: Math.max(1, normalized.qty),
    });
  }
}

function logDropCandidates(dungeon = selectedLogDungeon()) {
  const draftItems = new Set(dailyDraftItems(dungeon).map((item) => item.item));
  const standardCandidates = farmRecords(dungeon).map((record) => ({
    item: record.line.item,
    category: record.line.category || "Farm",
    price: priceForLine(record.line),
    qty: logQtyFromFarmRecord(record, dungeon),
    source: "standard",
    record,
  }));
  const extraCandidates = (dungeon.extras || []).map((candidate, index) => {
    const info = dropCandidateInfo(candidate);
    return {
      ...info,
      price: knownDropPrice(info.item),
      qty: 1,
      source: "extra",
      index,
      candidate,
    };
  });

  return [...standardCandidates, ...extraCandidates]
    .filter((candidate) => candidate.item && !draftItems.has(candidate.item))
    .sort((a, b) => String(a.category).localeCompare(String(b.category)) || String(a.item).localeCompare(String(b.item)));
}

function loadStandardFarmToDraft() {
  const dungeon = selectedLogDungeon();
  const runs = selectedLogRuns(dungeon);
  app.ui.dailyDraft = {
    dungeonId: dungeon.id,
    items: farmRecords(dungeon).map((record) => logItemFromFarmRecord(record, dungeon, runs)),
  };
}

function farmReturnFromLogItems(items) {
  const gross = normalizedLogItems(items).reduce((sum, item) => sum + integerValue(item.qty) * moneyValue(item.price), 0);
  return auctionNet(gross);
}

function selectedLogEstimate() {
  const dungeon = selectedLogDungeon();
  const runs = selectedLogRuns(dungeon);
  const entryMode = selectedLogEntryMode(dungeon);
  const sellPc = elements.logSellPcToggle?.checked ?? app.ui.sellPc;
  const cost = entryCostForPlan(dungeon, entryMode, runs);
  const items = normalizedLogItems(dailyDraftItems(dungeon));
  const farm = farmReturnFromLogItems(items);
  const cashback = cashbackReturn(dungeon, runs);
  const pc = pcReturnForOption(dungeon, runs, sellPc);
  const retorno = farm + cashback + pc;
  const lucro = retorno - cost;
  const minutes = dungeon.minutes * runs;
  return { dungeon, runs, entryMode, sellPc, items, cost, farm, cashback, pc, retorno, lucro, minutes };
}

function normalizedFarmLog(log) {
  const dungeon = app.dungeons.find((item) => item.id === log?.dungeonId) || app.dungeons[0];
  const runs = Math.max(1, integerValue(log?.runs) || baseRunLimit(dungeon));
  const entryMode = availableEntryModes(dungeon).includes(log?.entryMode) ? log.entryMode : defaultEntryMode(dungeon);
  const sellPc = log?.sellPc !== false;
  const estimate = farmEstimate(dungeon, runs, entryMode, sellPc);
  const items = normalizedLogItems(log?.items || []);
  const itemFarm = items.length ? farmReturnFromLogItems(items) : estimate.farm;
  const farm = Number.isFinite(Number(log?.farm)) ? Number(log.farm) : itemFarm;
  const cashback = Number.isFinite(Number(log?.cashback)) ? Number(log.cashback) : estimate.cashback;
  const pc = Number.isFinite(Number(log?.pc)) ? Number(log.pc) : estimate.pc;
  const retorno = Number.isFinite(Number(log?.retorno)) ? Number(log.retorno) : farm + cashback + pc;
  const cost = Number.isFinite(Number(log?.cost)) ? Number(log.cost) : estimate.cost;

  return {
    id: log?.id || `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: log?.date || todayIso(),
    dungeonId: dungeon.id,
    dungeonName: log?.dungeonName || dungeon.name,
    runs,
    entryMode,
    sellPc,
    notes: log?.notes || "",
    items,
    cost,
    farm,
    cashback,
    pc,
    retorno,
    lucro: Number.isFinite(Number(log?.lucro)) ? Number(log.lucro) : retorno - cost,
    minutes: Number.isFinite(Number(log?.minutes)) ? Number(log.minutes) : estimate.minutes,
    createdAt: log?.createdAt || new Date().toISOString(),
  };
}

function sortedFarmLogs(logs = farmLogs()) {
  return logs
    .map(normalizedFarmLog)
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}

function aggregateLogs(logs) {
  return logs.reduce(
    (sum, log) => ({
      cost: sum.cost + log.cost,
      retorno: sum.retorno + log.retorno,
      lucro: sum.lucro + log.lucro,
      minutes: sum.minutes + log.minutes,
      runs: sum.runs + log.runs,
      count: sum.count + 1,
    }),
    { cost: 0, retorno: 0, lucro: 0, minutes: 0, runs: 0, count: 0 },
  );
}

function farmLogRowHtml(log, options = {}) {
  const showDate = options.showDate !== false;
  const dungeonName = escapeHtml(log.dungeonName);
  const notes = escapeHtml(log.notes);
  const itemCount = Array.isArray(log.items) ? log.items.length : 0;
  return `
    <div class="farm-log-row">
      <div>
        <strong title="${dungeonName}">${dungeonName}</strong>
        <small>${showDate ? `${dateLabel(log.date)} • ` : ""}${formatNumber(log.runs)} DGs • ${ENTRY_MODE_LABELS[log.entryMode] || "Entrada"}${log.sellPc ? " • PC vendido" : " • PC guardado"}${itemCount ? ` • ${itemCount} item${itemCount > 1 ? "s" : ""}` : ""}</small>
        ${notes ? `<em>${notes}</em>` : ""}
      </div>
      <strong>${costAlzHtml(log.cost)}</strong>
      <strong>${alzHtml(log.retorno)}</strong>
      <strong>${alzHtml(log.lucro)}</strong>
      <span>${formatNumber(log.minutes)} min</span>
      <button class="remove-button" data-remove-farm-log="${log.id}" type="button" aria-label="Remover registro de ${dungeonName}">${iconSvg("x")}</button>
    </div>
  `;
}

function logsByDate(logs) {
  return logs.reduce((groups, log) => {
    groups[log.date] = groups[log.date] || [];
    groups[log.date].push(log);
    return groups;
  }, {});
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
  const viewName = app.ui.activeView || activeTab?.dataset.view || "dungeon";
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  document.querySelector(`#${viewName}-view`)?.classList.add("active-view");
  if (elements.dungeonPicker) {
    elements.dungeonPicker.hidden = !["dungeon", "dg-settings"].includes(viewName);
  }
}

function setActiveView(viewName) {
  if (viewName === "dungeon" && !isDungeonEnabled(currentDungeon())) {
    app.ui.selectedDungeon = selectableDungeons()[0]?.id || app.dungeons[0]?.id;
    app.ui.runs = baseRunLimit(currentDungeon());
  }
  app.ui.activeView = viewName;
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
  });
  saveData();
  renderView();
  document.querySelector(".workspace")?.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDungeonButtons() {
  const query = elements.dungeonSearch.value.trim().toLowerCase();
  elements.dungeonButtons.innerHTML = "";
  const showAll = app.ui.activeView === "dg-settings";
  const list = showAll ? app.dungeons : selectableDungeons();

  list
    .map((dungeon, order) => ({ dungeon, order }))
    .filter(({ dungeon }) => dungeon.name.toLowerCase().includes(query))
    .sort((a, b) => Number(isFavoriteDungeon(b.dungeon.id)) - Number(isFavoriteDungeon(a.dungeon.id)) || a.order - b.order)
    .forEach(({ dungeon }) => {
      const row = document.createElement("div");
      row.className = `dungeon-button-row ${dungeon.id === app.ui.selectedDungeon ? "active" : ""}`;
      row.innerHTML = `
        ${favoriteButtonHtml(dungeon, true)}
        <button class="dungeon-button ${dungeon.id === app.ui.selectedDungeon ? "active" : ""}" type="button">${dungeon.name}</button>
      `;
      row.querySelector(".dungeon-button").addEventListener("click", () => {
        app.ui.selectedDungeon = dungeon.id;
        app.ui.runs = baseRunLimit(dungeon);
        saveData();
        render();
      });
      elements.dungeonButtons.appendChild(row);
    });
}

function renderEntries() {
  const dungeon = currentDungeon();
  const modes = availableEntryModes(dungeon);
  const enabledModes = activeEntryModes(dungeon);
  elements.entryList.innerHTML = "";

  if (!modes.length) {
    elements.entryList.innerHTML += `<div class="empty-state">Entrada ainda não cadastrada para esta DG.</div>`;
    return;
  }

  modes.forEach((mode) => {
    const isActive = enabledModes.includes(mode);
    const isLastActive = isActive && enabledModes.length === 1;
    const records = entryRecordsForMode(dungeon, mode);
    const section = document.createElement("section");
    section.className = `entry-mode-card ${isActive ? "active" : "inactive"}`;
    section.innerHTML = `
      <div class="entry-mode-card-head">
        <div>
          <span>${ENTRY_MODE_LABELS[mode]}</span>
          <strong>${costAlzHtml(entryCostForMode(dungeon, mode, 1))}</strong>
        </div>
        <label class="mini-toggle" title="${isLastActive ? "Pelo menos uma entrada precisa ficar ativa" : "Usar esta entrada no cálculo"}">
          <input data-entry-mode-toggle="${mode}" type="checkbox" ${isActive ? "checked" : ""} ${isLastActive ? "disabled" : ""} />
          <span></span>
        </label>
      </div>
      <div class="entry-mode-card-list">
        ${
          records.length
            ? records
                .map(({ line, index }) => {
                  const recipe = craftRecipeForLine(line);
                  const title = recipe ? craftRecipeDetails(recipe) : line.item;
                  const label = recipe ? "Craft (Chloe)" : line.item;
                  const detail = isAlzEntry(line) ? "Valor/DG" : recipe ? craftRecipeChance(recipe) : `Qtd ${formatNumber(line.qty)}`;
                  return `
                    <div class="entry-compact-row">
                      <div class="item-name">
                        ${itemNameHtml(label, line.category || line.item, { title, small: recipe ? craftRecipeDetails(recipe) : "" })}
                      </div>
                      <small>${detail}</small>
                      <strong class="entry-total" data-entry-total="${index}">${costAlzHtml(entryLineCostPerRun(line))}</strong>
                    </div>
                  `;
                })
                .join("")
            : `<div class="empty-state">Sem itens cadastrados para esta entrada.</div>`
        }
      </div>
    `;
    elements.entryList.appendChild(section);
  });
}

function renderEntryConfig() {
  const dungeon = currentDungeon();
  ensureAlzEntryForMode(dungeon, "npc");
  const sections = [renderNpcEntrySection(dungeon)];
  if (craftRecipes[dungeon.id]) sections.push(renderCraftEntrySection(dungeon));
  sections.push(renderGemEntrySection(dungeon));
  elements.dgConfigEntrySections.innerHTML = sections.join("");
}

function renderEntrySection(dungeon, mode, title, summary, body, controls = "") {
  const open = entryConfigIsOpen(dungeon, mode);
  return `
    <section class="entry-accordion ${open ? "open" : ""}">
      <div class="entry-accordion-head">
        <button type="button" data-entry-section-toggle="${mode}" aria-expanded="${open}">
          <span>${title}</span>
          <small>${summary}</small>
        </button>
        ${controls}
      </div>
      <div class="entry-accordion-body" ${open ? "" : "hidden"}>
        ${body}
      </div>
    </section>
  `;
}

function renderNpcEntrySection(dungeon) {
  const records = (dungeon.entries || [])
    .map((line, index) => ({ line, index }))
    .filter((record) => record.line.entryMode === "npc");

  const rows = records
    .map(({ line, index }) => {
      if (isAlzEntry(line)) {
        return `
          <div class="table-row entry-config-row alz-row">
            <div class="item-name">
              ${itemNameHtml(line.item, line.category || line.item)}
            </div>
            <label class="entry-money-cell">
              <span>Valor/DG</span>
              <input data-entry-index="${index}" data-entry-field="alz" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(line.qty)}" />
            </label>
            <strong>Moeda</strong>
            <strong class="entry-total" data-entry-total="${index}">${costAlzHtml(entryLineCostPerRun(line))}</strong>
            <span></span>
          </div>
        `;
      }

      return `
        <div class="table-row entry-config-row">
          <div class="item-name">
            ${itemNameHtml(line.item, line.category || line.item)}
          </div>
          <input data-entry-index="${index}" data-entry-field="qty" type="number" min="0" step="1" value="${integerValue(line.qty)}" />
          <input data-entry-index="${index}" data-entry-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(priceForLine(line))}" disabled />
          <strong class="entry-total" data-entry-total="${index}">${costAlzHtml(entryLineCostPerRun(line))}</strong>
          <button class="remove-button" data-remove-entry-index="${index}" type="button" aria-label="Remover ${line.item} da entrada">${iconSvg("x")}</button>
        </div>
      `;
    })
    .join("");

  const body = `
    <div class="data-table">
      <div class="table-row header entry-config-row">
        <span>Item</span>
        <span>Qtd/DG</span>
        <span>Preço</span>
        <span>Total/DG</span>
        <span></span>
      </div>
      ${rows}
    </div>
    <div class="entry-add-bar compact-add">
      <select data-npc-add-select aria-label="Item para adicionar na entrada NPC">${entryItemOptionsHtml()}</select>
      <button data-add-npc-item class="icon-button" type="button" title="Adicionar item da entrada" aria-label="Adicionar item da entrada">${iconSvg("plus")}</button>
    </div>
  `;

  return renderEntrySection(dungeon, "npc", ENTRY_MODE_LABELS.npc, costAlzHtml(entryCostForMode(dungeon, "npc")), body);
}

function renderGemEntrySection(dungeon) {
  const line = ensureGemEntryLine(dungeon);
  const index = dungeon.entries.indexOf(line);
  const total = entryLineCostPerRun(line);
  const body = `
    <div class="table-row gem-entry-row">
      <div class="item-name">
        <span class="swatch ${swatchClass(line.category)}"></span>
        <span>Gema Arcana</span>
      </div>
      <label class="compact-field">
        <span>Qtd</span>
        <input data-gem-entry-index="${index}" type="number" min="0" step="1" value="${integerValue(line.qty)}" />
      </label>
      <strong>${alzHtml(gemUnitValue())} / gema</strong>
      <strong data-entry-total="${index}">${costAlzHtml(total)}</strong>
    </div>
  `;
  const controls = `
    <label class="mini-toggle" title="Ativar entrada por gemas">
      <input data-gem-enabled type="checkbox" ${dungeon.gemEntryEnabled ? "checked" : ""} />
      <span></span>
    </label>
  `;

  return renderEntrySection(
    dungeon,
    "gems",
    ENTRY_MODE_LABELS.gems,
    dungeon.gemEntryEnabled ? costAlzHtml(total) : "Desativado",
    body,
    controls,
  );
}

function renderCraftEntrySection(dungeon) {
  const line = (dungeon.entries || []).find(isCraftRecipeEntry) || craftEntry(dungeon.id);
  const recipe = craftRecipeForLine(line);
  const body = `
    <div class="table-row entry-config-row">
      <div class="item-name">
        <span class="swatch ${swatchClass("Craft")}"></span>
        <span title="${craftRecipeDetails(recipe)}">Craft (Chloe)</span>
        <small>${craftRecipeDetails(recipe)}</small>
      </div>
      <strong>${craftRecipeChance(recipe)}</strong>
      <strong>${costAlzHtml(craftRecipeAttemptCost(recipe))} / tentativa</strong>
      <strong>${costAlzHtml(craftRecipeExpectedCost(recipe))}</strong>
      <span></span>
    </div>
  `;

  return renderEntrySection(dungeon, "craft", ENTRY_MODE_LABELS.craft, costAlzHtml(craftRecipeExpectedCost(recipe)), body);
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
        ${itemNameHtml(line.item, line.category)}
      </div>
      ${
        isBasic
          ? `<input data-basic-index="${index}" data-basic-field="qty" type="number" min="0" step="1" value="${farmLineQty(line, dungeon)}" />`
          : `<input data-drop-index="${index}" data-drop-field="qty" type="number" min="0" step="1" value="${integerValue(line.qty)}" />`
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
  elements.cashbackList.innerHTML = "";

  if (!(dungeon.cashback || []).length) {
    elements.cashbackList.innerHTML += `<div class="empty-state">Esta DG não tem cashback cadastrado.</div>`;
    return;
  }

  (dungeon.cashback || []).forEach((reward, index) => {
    const available = runs >= reward.runs;
    const row = document.createElement("div");
    row.className = `cashback-row compact-cashback-row ${available ? "available" : "locked"}`;
    const entriesLabel = integerValue(reward.entryQty) ? ` + ${formatNumber(reward.entryQty)} Entrada${integerValue(reward.entryQty) > 1 ? "s" : ""}` : "";
    const rewardItem = normalizeJewelItem(reward.item);
    const valueMode = activeEntryModes(dungeon)[0] || currentEntryMode(dungeon);
    row.innerHTML = `
      <span>${formatNumber(reward.runs)} DGs</span>
      <strong title="${rewardItem}${entriesLabel}" class="cashback-jewel-label">${jewelIconHtml(rewardItem)}<span>${rewardItem}${entriesLabel}</span></strong>
      <strong data-cashback-value="${index}">${alzHtml(cashbackRewardValue(reward, dungeon, valueMode))}</strong>
    `;
    elements.cashbackList.appendChild(row);
  });
}

function renderCashbackConfig() {
  const dungeon = currentDungeon();
  elements.dgConfigCashbackList.innerHTML = `
    <div class="cashback-row cashback-config-row header">
      <span>Meta</span>
      <span>Jóia</span>
      <span>Entrada</span>
      <span>Valor</span>
      <span>Qtd</span>
      <span></span>
    </div>
  `;

  if (!(dungeon.cashback || []).length) {
    elements.dgConfigCashbackList.innerHTML += `<div class="empty-state">Nenhum cashback cadastrado para esta DG.</div>`;
  }

  (dungeon.cashback || []).forEach((reward, index) => {
    const row = document.createElement("div");
    row.className = "cashback-row cashback-config-row";
    row.innerHTML = `
      <label class="compact-field">
        <span>DGs</span>
        <input data-cashback-config-index="${index}" data-cashback-config-field="runs" type="number" min="1" step="1" value="${reward.runs}" />
      </label>
      <label class="jewel-select-field">
        ${jewelIconHtml(reward.item)}
        <select data-cashback-config-index="${index}" data-cashback-config-field="item" aria-label="Cor da jóia do cashback de ${reward.runs} DGs">
          ${JEWEL_ITEMS.map(
            (item) => `<option value="${item}" ${normalizeJewelItem(reward.item) === item ? "selected" : ""}>${item}</option>`,
          ).join("")}
        </select>
      </label>
      <label class="compact-field">
        <span>Entr.</span>
        <input data-cashback-config-index="${index}" data-cashback-config-field="entryQty" type="number" min="0" step="1" value="${integerValue(reward.entryQty)}" />
      </label>
      <strong>${alzHtml(cashbackRewardValue(reward, dungeon, activeEntryModes(dungeon)[0] || currentEntryMode(dungeon)))}</strong>
      <span>1 jóia</span>
      <button class="remove-button" data-remove-cashback-index="${index}" type="button" aria-label="Remover cashback de ${reward.runs} DGs">${iconSvg("x")}</button>
    `;
    elements.dgConfigCashbackList.appendChild(row);
  });

  elements.dgConfigCashbackList.innerHTML += `
    <div class="cashback-actions">
      <button data-add-cashback class="cashback-add-button" type="button">
        ${iconSvg("plus")}
        <span>Adicionar cashback</span>
      </button>
    </div>
  `;
}

function renderPlanForm() {
  if (!elements.planDungeonSelect) return;
  const selectedId = elements.planDungeonSelect.value || app.ui.selectedDungeon || app.dungeons[0]?.id;
  elements.planDungeonSelect.innerHTML = app.dungeons
    .map((dungeon) => `<option value="${dungeon.id}" ${selectedId === dungeon.id ? "selected" : ""}>${dungeon.name}</option>`)
    .join("");

  const dungeon = app.dungeons.find((item) => item.id === elements.planDungeonSelect.value) || currentDungeon();
  const modes = availableEntryModes(dungeon);
  const selectedMode = elements.planEntryModeSelect.value;
  elements.planEntryModeSelect.innerHTML = modes
    .map((mode) => `<option value="${mode}" ${selectedMode === mode ? "selected" : ""}>${ENTRY_MODE_LABELS[mode]}</option>`)
    .join("");
  elements.planEntryModeSelect.value = modes.includes(selectedMode) ? selectedMode : defaultEntryMode(dungeon);

  if (!elements.planRunsInput.value) {
    elements.planRunsInput.value = baseRunLimit(dungeon);
  }
}

function renderPlanning() {
  if (!elements.planItemList) return;
  renderPlanForm();

  const totals = planItems().map(planItemTotals);
  elements.planItemList.innerHTML = "";

  if (!totals.length) {
    elements.planItemList.innerHTML = `<div class="empty-state">Nenhuma DG no planejamento ainda.</div>`;
  }

  totals.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "planning-row";
    row.innerHTML = `
      <div>
        <strong title="${item.dungeon.name}">${item.dungeon.name}</strong>
        <small>${item.runs} DGs • ${ENTRY_MODE_LABELS[item.entryMode]} • ${item.days.map((day) => WEEK_DAYS.find((weekDay) => weekDay.id === day)?.short).filter(Boolean).join(", ")}</small>
      </div>
      <span>${formatNumber(item.minutes)} min</span>
      <strong>${costAlzHtml(item.cost)}</strong>
      <strong>${alzHtml(item.retorno)}</strong>
      <strong>${alzHtml(item.lucro)}</strong>
      <button class="remove-button" data-remove-plan-item="${index}" type="button" aria-label="Remover ${item.dungeon.name} do planejamento">${iconSvg("x")}</button>
    `;
    elements.planItemList.appendChild(row);
  });

  elements.planDayList.innerHTML = WEEK_DAYS.map((day) => {
    const dayTotals = planDayTotals(day.id);
    return `
      <div class="planning-day-row ${dayTotals.count ? "" : "empty"}">
        <strong>${day.name}</strong>
        <span>${dayTotals.count ? `${dayTotals.count} plano${dayTotals.count > 1 ? "s" : ""}` : "Livre"}</span>
        <span>${formatNumber(dayTotals.minutes)} min</span>
        <strong>${costAlzHtml(dayTotals.cost)}</strong>
        <strong>${alzHtml(dayTotals.retorno)}</strong>
        <strong>${alzHtml(dayTotals.lucro)}</strong>
      </div>
    `;
  }).join("");

  const weekTotals = WEEK_DAYS.reduce(
    (sum, day) => {
      const dayTotals = planDayTotals(day.id);
      sum.cost += dayTotals.cost;
      sum.retorno += dayTotals.retorno;
      sum.lucro += dayTotals.lucro;
      sum.minutes += dayTotals.minutes;
      return sum;
    },
    { cost: 0, retorno: 0, lucro: 0, minutes: 0 },
  );

  applyCostDisplay(elements.planWeekCost, weekTotals.cost);
  applyAlzDisplay(elements.planWeekReturn, weekTotals.retorno);
  applyAlzDisplay(elements.planWeekProfit, weekTotals.lucro);
  elements.planWeekTime.textContent = `${formatNumber(weekTotals.minutes)} min`;
}

function renderDailyForm() {
  if (!elements.logDungeonSelect) return;

  if (!elements.logDateInput.value) elements.logDateInput.value = todayIso();

  const selectedId = elements.logDungeonSelect.value || app.ui.selectedDungeon || app.dungeons[0]?.id;
  elements.logDungeonSelect.innerHTML = app.dungeons
    .map((dungeon) => `<option value="${dungeon.id}" ${selectedId === dungeon.id ? "selected" : ""}>${dungeon.name}</option>`)
    .join("");

  const dungeon = selectedLogDungeon();
  const modes = availableEntryModes(dungeon);
  const selectedMode = elements.logEntryModeSelect.value;
  elements.logEntryModeSelect.innerHTML = modes
    .map((mode) => `<option value="${mode}" ${selectedMode === mode ? "selected" : ""}>${ENTRY_MODE_LABELS[mode]}</option>`)
    .join("");
  elements.logEntryModeSelect.value = modes.includes(selectedMode) ? selectedMode : defaultEntryMode(dungeon);

  if (!elements.logRunsInput.value) elements.logRunsInput.value = baseRunLimit(dungeon);
  if (elements.logSellPcToggle.dataset.ready !== "true") {
    elements.logSellPcToggle.checked = app.ui.sellPc;
    elements.logSellPcToggle.dataset.ready = "true";
  }
}

function renderDailyPreview() {
  if (!elements.logPreviewCost) return;
  const estimate = selectedLogEstimate();

  applyCostDisplay(elements.logPreviewCost, estimate.cost);
  applyAlzDisplay(elements.logPreviewReturn, estimate.retorno);
  applyAlzDisplay(elements.logPreviewProfit, estimate.lucro);
  elements.logPreviewTime.textContent = `${formatNumber(estimate.minutes)} min`;

  elements.logPreviewBreakdown.innerHTML = `
    <div class="formula-row">
      <span>Farm líquido</span>
      <strong>${alzHtml(estimate.farm)}</strong>
    </div>
    <div class="formula-row">
      <span>Cashback</span>
      <strong>${alzHtml(estimate.cashback)}</strong>
    </div>
    <div class="formula-row">
      <span>PC líquido</span>
      <strong>${alzHtml(estimate.pc)}</strong>
    </div>
    <div class="formula-row">
      <span>Entrada + reset</span>
      <strong>${costAlzHtml(estimate.cost)}</strong>
    </div>
  `;
}

function renderDailyFarmItems() {
  if (!elements.logFarmList) return;
  const items = dailyDraftItems();
  elements.logFarmList.innerHTML = `
    <div class="table-row header log-farm-row">
      <span>Item</span>
      <span>Qtd</span>
      <span>Preço un.</span>
      <span>Total líquido</span>
      <span></span>
    </div>
  `;

  if (!items.length) {
    elements.logFarmList.innerHTML += `<div class="empty-state">Adicione os itens que realmente caíram neste farm.</div>`;
    return;
  }

  items.forEach((item, index) => {
    elements.logFarmList.innerHTML += `
      <div class="table-row log-farm-row">
        <div class="item-name">
          ${itemNameHtml(item.item, item.category)}
          <small>${escapeHtml(item.category)}</small>
        </div>
        <input data-log-item-index="${index}" data-log-item-field="qty" type="number" min="0" step="1" value="${integerValue(item.qty)}" />
        <input data-log-item-index="${index}" data-log-item-field="price" data-money-input="true" type="text" inputmode="numeric" autocomplete="off" value="${formatAlzNumber(item.price)}" />
        <strong data-log-item-total="${index}">${alzHtml(auctionNet(integerValue(item.qty) * moneyValue(item.price)))}</strong>
        <button class="remove-button" data-remove-log-item-index="${index}" type="button" aria-label="Remover ${escapeHtml(item.item)}">${iconSvg("x")}</button>
      </div>
    `;
  });
}

function renderDailyDropList() {
  if (!elements.logDropList) return;
  const candidates = logDropCandidates();

  elements.logDropList.innerHTML = candidates.length
    ? candidates
        .map(
          (candidate, index) => `
            <div class="drop-row">
              <div>
                <strong class="inline-item-label" title="${escapeHtml(candidate.item)}">${inlineItemNameHtml(candidate.item, candidate.category)}</strong>
                <small>${escapeHtml(candidate.category)}${candidate.price ? ` • ${alzHtml(candidate.price)}` : ""}</small>
              </div>
              <button class="icon-button" data-log-add-drop-index="${index}" type="button" title="Adicionar" aria-label="Adicionar ${escapeHtml(candidate.item)}">${iconSvg("plus")}</button>
            </div>
          `,
        )
        .join("")
    : `<div class="empty-state">Todos os drops cadastrados desta DG já estão no registro.</div>`;
}

function renderFarmLogHistory() {
  if (!elements.farmLogList) return;
  const logs = sortedFarmLogs().slice(0, 12);
  elements.farmLogList.innerHTML = logs.length
    ? logs.map((log) => farmLogRowHtml(log)).join("")
    : `<div class="empty-state">Nenhum farm registrado ainda.</div>`;
}

function renderDailyLog() {
  if (!elements.logDungeonSelect) return;
  renderDailyForm();
  renderDailyFarmItems();
  renderDailyDropList();
  renderDailyPreview();
  renderFarmLogHistory();
}

function saveFarmLogFromForm() {
  const estimate = selectedLogEstimate();
  farmLogs().push({
    id: `log-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: elements.logDateInput.value || todayIso(),
    dungeonId: estimate.dungeon.id,
    dungeonName: estimate.dungeon.name,
    runs: estimate.runs,
    entryMode: estimate.entryMode,
    sellPc: estimate.sellPc,
    items: estimate.items,
    notes: elements.logNotesInput.value.trim(),
    cost: estimate.cost,
    farm: estimate.farm,
    cashback: estimate.cashback,
    pc: estimate.pc,
    retorno: estimate.retorno,
    lucro: estimate.lucro,
    minutes: estimate.minutes,
    createdAt: new Date().toISOString(),
  });
  elements.logNotesInput.value = "";
  resetDailyDraft(estimate.dungeon);
  saveData();
  renderDailyLog();
  renderSummary();
}

function selectedSummaryMonth() {
  if (!elements.summaryMonthInput) return currentMonthIso();
  if (!elements.summaryMonthInput.value) elements.summaryMonthInput.value = currentMonthIso();
  return elements.summaryMonthInput.value;
}

function renderSummaryChart(logs) {
  if (!elements.summaryChart) return;
  const groups = logsByDate(logs);
  const rows = Object.keys(groups)
    .sort()
    .map((date) => ({ date, ...aggregateLogs(groups[date]) }));

  if (!rows.length) {
    elements.summaryChart.innerHTML = `<div class="empty-state">Sem registros para montar o gráfico deste mês.</div>`;
    return;
  }

  const maxProfit = Math.max(1, ...rows.map((row) => Math.abs(row.lucro)));
  elements.summaryChart.innerHTML = rows
    .map((row) => {
      const width = Math.max(4, Math.round((Math.abs(row.lucro) / maxProfit) * 100));
      return `
        <div class="summary-bar-row ${row.lucro < 0 ? "negative" : ""}">
          <span>${dateLabel(row.date).slice(0, 5)}</span>
          <div class="summary-bar-track">
            <div class="summary-bar-fill" style="width: ${width}%"></div>
          </div>
          <strong>${alzHtml(row.lucro)}</strong>
        </div>
      `;
    })
    .join("");
}

function renderSummaryCalendar(month, logs) {
  if (!elements.summaryCalendar) return;
  const [year, monthNumber] = month.split("-").map(Number);
  const daysInMonth = new Date(year, monthNumber, 0).getDate();
  const firstWeekday = new Date(year, monthNumber - 1, 1).getDay();
  const mondayOffset = (firstWeekday + 6) % 7;
  const groups = logsByDate(logs);
  const weekdayHeaders = WEEK_DAYS.map((day) => `<div class="calendar-weekday">${day.short}</div>`).join("");
  const blanks = Array.from({ length: mondayOffset }, () => `<div class="calendar-cell empty"></div>`).join("");
  const dayCells = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = `${month}-${String(day).padStart(2, "0")}`;
    const dayLogs = groups[date] || [];
    const totals = aggregateLogs(dayLogs);
    return `
      <div class="calendar-cell ${dayLogs.length ? "has-log" : ""} ${totals.lucro < 0 ? "negative" : ""}">
        <span>${day}</span>
        ${
          dayLogs.length
            ? `<strong>${alzHtml(totals.lucro)}</strong><small>${dayLogs.length} registro${dayLogs.length > 1 ? "s" : ""}</small>`
            : `<small>Sem farm</small>`
        }
      </div>
    `;
  }).join("");

  elements.summaryCalendar.innerHTML = weekdayHeaders + blanks + dayCells;
}

function renderSummaryLogList(logs) {
  if (!elements.summaryLogList) return;
  elements.summaryLogList.innerHTML = logs.length
    ? logs.map((log) => farmLogRowHtml(log)).join("")
    : `<div class="empty-state">Nenhum registro encontrado para este mês.</div>`;
}

function renderSummary() {
  if (!elements.summaryMonthInput) return;
  const month = selectedSummaryMonth();
  const logs = sortedFarmLogs().filter((log) => log.date.startsWith(month));
  const totals = aggregateLogs(logs);

  applyCostDisplay(elements.summaryMonthCost, totals.cost);
  applyAlzDisplay(elements.summaryMonthReturn, totals.retorno);
  applyAlzDisplay(elements.summaryMonthProfit, totals.lucro);
  elements.summaryMonthTime.textContent = `${formatNumber(totals.minutes)} min`;

  renderSummaryChart(logs);
  renderSummaryCalendar(month, logs);
  renderSummaryLogList(logs);
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
          <strong class="inline-item-label" title="${escapeHtml(item)}">${inlineItemNameHtml(item, category)}</strong>
          <small>${escapeHtml(category)}</small>
        </div>
        <button class="icon-button" type="button" title="Adicionar" aria-label="Adicionar ${escapeHtml(item)}">${iconSvg("plus")}</button>
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
        MARKET_TAX_SETTING,
        "Material Graduado",
        DIMENSION_STONE_PACK_KEY,
        CRAFT_ITEM_PC_COST_KEY,
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
                  key === MARKET_TAX_SETTING
                    ? `<input data-setting-key="${key}" type="number" min="0" max="100" step="0.1" value="${app.settings[key] ?? 4}" />`
                    :
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
      <strong>Limite sem reset</strong>
      <input data-dungeon-field="baseRuns" type="number" min="1" step="1" value="${baseRunLimit(dungeon)}" />
    </div>
    <div class="dg-setting">
      <strong>Custo do reset (gemas)</strong>
      <input data-dungeon-field="resetCostGems" type="number" min="0" step="1" value="${resetGemQty(dungeon)}" />
    </div>
  `;
}

function renderDgConfig() {
  const dungeon = currentDungeon();
  elements.dgConfigTitle.textContent = dungeon.name;
  if (elements.dgConfigEnabled) elements.dgConfigEnabled.checked = isDungeonEnabled(dungeon);
  elements.dgConfigPc.value = dungeon.pc;
  renderEntryConfig();
  renderCashbackConfig();
}

function renderFarmTime() {
  if (!elements.farmTimeMinutes || !elements.farmTimeSeconds) return;
  const parts = dungeonTimeParts(currentDungeon());
  elements.farmTimeMinutes.value = parts.minutes;
  elements.farmTimeSeconds.value = parts.seconds;
}

function renderRanking() {
  const mode = app.ui.rankMode === "rush" ? "rush" : "hour";
  document.querySelectorAll(".rank-mode").forEach((button) => {
    button.classList.toggle("active", button.dataset.rank === mode);
  });
  const ranked = enabledDungeons()
    .flatMap((dungeon) => activeEntryModes(dungeon).map((entryMode) => ({ dungeon, entryMode })))
    .sort((a, b) => rankingValue(b) - rankingValue(a));
  elements.rankingTable.innerHTML =
    mode === "hour"
      ? `
        <div class="rank-row header rank-row-hour">
          <span>#</span>
          <span>DG</span>
          <span>Resultado/h</span>
          <span>Farm/h</span>
          <span>Cashback/h</span>
          <span>PC/h</span>
          <span>Entrada/h</span>
        </div>
      `
      : `
        <div class="rank-row header rank-row-rush">
          <span>#</span>
          <span>DG</span>
          <span>Tempo</span>
          <span>Resultado</span>
          <span>Farm</span>
          <span>Cashback</span>
          <span>PC</span>
          <span>Entrada</span>
        </div>
      `;

  if (!ranked.length) {
    elements.rankingTable.innerHTML += `<div class="empty-state">Nenhuma DG ativa para ranquear.</div>`;
    return;
  }

  ranked.forEach(({ dungeon, entryMode }, index) => {
    const components = rankingComponents(dungeon, entryMode);
    const resets = resetCount(dungeon, components.runs);
    const row = document.createElement("div");
    row.className = `rank-row rank-row-${mode} ${isFavoriteDungeon(dungeon.id) ? "favorite" : ""}`;
    row.innerHTML =
      mode === "hour"
        ? `
          <div class="rank-index-cell">
            ${favoriteButtonHtml(dungeon, true)}
            <span class="rank-position">${index + 1}</span>
          </div>
          <div>
            <strong title="${dungeon.name}">${dungeon.name}</strong>
            <small>${ENTRY_MODE_LABELS[entryMode]} • ${formatNumber(components.runs)} DGs no ciclo • ${formatNumber(components.minutes)} min${resets ? ` • ${formatNumber(resets)} reset` : ""}</small>
          </div>
          <strong>${alzHtml(components.result)}</strong>
          <strong>${alzHtml(components.farm)}</strong>
          <strong>${alzHtml(components.cashback)}</strong>
          <strong>${alzHtml(components.pc)}</strong>
          <strong>${costAlzHtml(components.cost)}</strong>
        `
        : `
          <div class="rank-index-cell">
            ${favoriteButtonHtml(dungeon, true)}
            <span class="rank-position">${index + 1}</span>
          </div>
          <div>
            <strong title="${dungeon.name}">${dungeon.name}</strong>
            <small>${ENTRY_MODE_LABELS[entryMode]} • ${formatNumber(components.runs)} DGs${resets ? ` • ${formatNumber(resets)} reset` : ""}</small>
          </div>
          <span>${formatNumber(components.minutes)} min</span>
          <strong>${alzHtml(components.result)}</strong>
          <strong>${alzHtml(components.farm)}</strong>
          <strong>${alzHtml(components.cashback)}</strong>
          <strong>${alzHtml(components.pc)}</strong>
          <strong>${costAlzHtml(components.cost)}</strong>
        `;
    elements.rankingTable.appendChild(row);
  });
}

function rankingRuns(dungeon) {
  if (app.ui.rankMode === "rush") {
    return Math.max(baseRunLimit(dungeon), ...(dungeon.cashback || []).map((reward) => Number(reward.runs) || 0));
  }
  return baseRunLimit(dungeon) + (dungeon.canReset ? Math.max(0, integerValue(dungeon.resetRuns) || baseRunLimit(dungeon)) : 0);
}

function rankingComponents(dungeon, entryMode = activeEntryModes(dungeon)[0] || currentEntryMode(dungeon)) {
  const runs = rankingRuns(dungeon);
  const minutes = dungeon.minutes * runs;
  const cost = entryCostForPlan(dungeon, entryMode, runs);
  const farm = farmReturn(dungeon, runs);
  const cashback = cashbackReturn(dungeon, runs, entryMode);
  const pc = pcReturn(dungeon, runs);
  const result = farm + cashback + pc - cost;

  if (app.ui.rankMode !== "rush") {
    const hours = Math.max(minutes / 60, 0.1);
    return {
      runs,
      minutes,
      cost: cost / hours,
      farm: farm / hours,
      cashback: cashback / hours,
      pc: pc / hours,
      result: result / hours,
    };
  }

  return { runs, minutes, cost, farm, cashback, pc, result };
}

function rankingValue(option) {
  const dungeon = option.dungeon || option;
  const entryMode = option.entryMode || activeEntryModes(dungeon)[0] || currentEntryMode(dungeon);
  return rankingComponents(dungeon, entryMode).result;
}

function resetMoneyClasses(node) {
  node.classList.remove(
    "alz-value",
    "cost-value",
    "alz-tier-10k",
    "alz-tier-100k",
    "alz-tier-1m",
    "alz-tier-10m",
    "alz-tier-100m",
    "alz-tier-1b",
    "alz-tier-10b",
    "alz-tier-100b",
    "metric-multi-value",
  );
}

function renderMetricModeValues(node, values, isCost = false) {
  if (!values.length) {
    if (isCost) applyCostDisplay(node, 0);
    else applyAlzDisplay(node, 0);
    return;
  }

  if (values.length === 1) {
    if (isCost) applyCostDisplay(node, values[0].value);
    else applyAlzDisplay(node, values[0].value);
    return;
  }

  resetMoneyClasses(node);
  node.classList.add("metric-multi-value");
  node.innerHTML = values
    .map(
      ({ mode, value }) => `
        <span>
          <em>${ENTRY_MODE_SHORT_LABELS[mode] || ENTRY_MODE_LABELS[mode] || mode}</em>
          ${isCost ? costAlzHtml(value) : alzHtml(value)}
        </span>
      `,
    )
    .join("");
}

function refreshNumbers() {
  const dungeon = currentDungeon();
  const runs = effectiveRuns(dungeon);
  const modes = activeEntryModes(dungeon);
  const estimates = modes.map((entryMode) => ({ mode: entryMode, ...farmEstimate(dungeon, runs, entryMode, app.ui.sellPc) }));
  const primaryEstimate = estimates[0] || { mode: currentEntryMode(dungeon), ...farmEstimate(dungeon, runs, currentEntryMode(dungeon), app.ui.sellPc) };
  const farm = primaryEstimate.farm;
  const pc = primaryEstimate.pc;
  const resets = resetCount(dungeon, runs);
  const resetGems = resetGemQty(dungeon) * resets;
  const resetTotal = resetCost(dungeon, runs);

  elements.resetCostDisplay.innerHTML = resets
    ? `${formatNumber(resets)} reset • ${formatNumber(resetGems)} gemas • ${costAlzHtml(resetTotal)}`
    : "Sem reset";
  renderMetricModeValues(
    elements.metricEntryCost,
    estimates.map((estimate) => ({ mode: estimate.mode, value: estimate.cost })),
    true,
  );
  applyAlzDisplay(elements.metricBasic, farm);
  renderMetricModeValues(
    elements.metricCashback,
    estimates.map((estimate) => ({ mode: estimate.mode, value: estimate.cashback })),
  );
  applyAlzDisplay(elements.metricPc, pc);
  renderMetricModeValues(
    elements.metricProfit,
    estimates.map((estimate) => ({ mode: estimate.mode, value: estimate.lucro })),
  );

  elements.pcPerRunDisplay.textContent = formatNumber(dungeon.pc);
  applyAlzDisplay(elements.pcUnitValue, pcUnitProfit());
  elements.pcTotalCount.textContent = formatNumber(dungeon.pc * runs);
  applyAlzDisplay(elements.pcTotalValue, pc);

  applyAlzDisplay(elements.gemUnitValue, gemUnitValue());
  applyCostDisplay(elements.protectorCost, protectorCost());
  applyAlzDisplay(elements.pcProfit100, pcProfit100());
  applyAlzDisplay(elements.pcProfit1, pcUnitProfit());

  document.querySelectorAll("[data-entry-total]").forEach((node) => {
    const line = dungeon.entries[Number(node.dataset.entryTotal)];
    applyCostDisplay(node, entryLineCostPerRun(line));
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
    applyAlzDisplay(node, cashbackRewardValue(reward, dungeon, activeEntryModes(dungeon)[0] || currentEntryMode(dungeon)));
  });

}

function render() {
  if (app.ui.activeView === "dungeon" && !isDungeonEnabled(currentDungeon())) {
    app.ui.selectedDungeon = selectableDungeons()[0]?.id || app.dungeons[0]?.id;
  }
  const dungeon = currentDungeon();
  elements.dungeonTitle.textContent = dungeon.name;
  elements.runsInput.value = app.ui.runs || baseRunLimit(dungeon);
  elements.sellPcToggle.checked = app.ui.sellPc;
  ensureAvailableEntryMode(dungeon);
  renderEntryModeOptions();
  renderView();
  renderDungeonButtons();
  renderEntries();
  renderBasicFarm();
  renderCashback();
  renderExtraDrops();
  renderSettings();
  renderDgConfig();
  renderFarmTime();
  renderPlanning();
  renderDailyLog();
  renderSummary();
  refreshNumbers();
  renderRanking();
}

document.querySelectorAll(".nav-button").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveView(button.dataset.view);
    render();
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

elements.planDungeonSelect?.addEventListener("change", () => {
  const dungeon = app.dungeons.find((item) => item.id === elements.planDungeonSelect.value);
  if (dungeon) {
    elements.planRunsInput.value = baseRunLimit(dungeon);
  }
  renderPlanForm();
});

elements.addPlanItem?.addEventListener("click", () => {
  const dungeon = app.dungeons.find((item) => item.id === elements.planDungeonSelect.value) || currentDungeon();
  const selectedDays = [...document.querySelectorAll("[data-plan-day]:checked")].map((input) => integerValue(input.dataset.planDay));
  planItems().push(
    normalizedPlanItem({
      dungeonId: dungeon.id,
      entryMode: elements.planEntryModeSelect.value,
      runs: elements.planRunsInput.value,
      days: selectedDays.length ? selectedDays : [1, 2, 3, 4, 5],
    }),
  );
  saveData();
  renderPlanning();
});

elements.logDungeonSelect?.addEventListener("change", () => {
  const dungeon = selectedLogDungeon();
  app.ui.selectedDungeon = dungeon.id;
  resetDailyDraft(dungeon);
  elements.logRunsInput.value = baseRunLimit(dungeon);
  saveData();
  renderDailyForm();
  renderDailyFarmItems();
  renderDailyDropList();
  renderDailyPreview();
});

elements.logEntryModeSelect?.addEventListener("change", renderDailyPreview);
elements.logRunsInput?.addEventListener("input", renderDailyPreview);
elements.logSellPcToggle?.addEventListener("change", renderDailyPreview);
elements.loadStandardFarm?.addEventListener("click", () => {
  loadStandardFarmToDraft();
  saveData();
  renderDailyLog();
});
elements.clearLogFarm?.addEventListener("click", () => {
  resetDailyDraft();
  saveData();
  renderDailyLog();
});
elements.addManualLogItem?.addEventListener("click", () => {
  const item = elements.logManualItem.value.trim();
  if (!item) return;
  addLogItem({
    item,
    category: "Manual",
    qty: 1,
    price: moneyValue(elements.logManualPrice.value),
  });
  elements.logManualItem.value = "";
  elements.logManualPrice.value = "";
  saveData();
  renderDailyLog();
});
elements.saveFarmLog?.addEventListener("click", saveFarmLogFromForm);
elements.summaryMonthInput?.addEventListener("change", renderSummary);

elements.runsInput.addEventListener("input", (event) => {
  app.ui.runs = Math.max(1, Number(event.target.value || 1));
  saveData();
  renderCashback();
  refreshNumbers();
  renderRanking();
});

elements.sellPcToggle.addEventListener("change", (event) => {
  app.ui.sellPc = event.target.checked;
  saveData();
  refreshNumbers();
  renderRanking();
});

function handleFarmTimeInput() {
  setDungeonTimeFromParts(currentDungeon(), elements.farmTimeMinutes.value, elements.farmTimeSeconds.value);
  saveData();
  renderPlanning();
  renderDailyPreview();
  renderSummary();
  refreshNumbers();
  renderRanking();
}

elements.farmTimeMinutes?.addEventListener("input", handleFarmTimeInput);
elements.farmTimeSeconds?.addEventListener("input", handleFarmTimeInput);

elements.dgConfigEnabled?.addEventListener("change", (event) => {
  currentDungeon().enabled = event.target.checked;
  saveData();
  renderDungeonButtons();
  renderRanking();
});

elements.entryModeSelect?.addEventListener("change", (event) => {
  app.ui.entryModes[currentDungeon().id] = event.target.value;
  saveData();
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

elements.settingsMenuToggle.addEventListener("click", () => {
  const shouldOpen = elements.settingsMenuOptions.hidden;
  elements.settingsMenuOptions.hidden = !shouldOpen;
  elements.settingsMenuToggle.setAttribute("aria-expanded", String(shouldOpen));
});

elements.settingsMenuOptions.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    elements.settingsMenuOptions.hidden = true;
    elements.settingsMenuToggle.setAttribute("aria-expanded", "false");
    setActiveView(button.dataset.settingsTarget);
    renderDgConfig();
  });
});

document.addEventListener("click", (event) => {
  const target = event.target.closest?.(
    "[data-favorite-dungeon], [data-run-step], [data-entry-section-toggle], [data-add-npc-item], [data-remove-entry-index], [data-add-cashback], [data-remove-cashback-index], [data-remove-plan-item], [data-remove-farm-log], [data-log-add-drop-index], [data-remove-log-item-index]",
  );
  if (!target) return;

  const dungeon = currentDungeon();

  if (target.dataset.favoriteDungeon) {
    toggleFavoriteDungeon(target.dataset.favoriteDungeon);
    saveData();
    renderDungeonButtons();
    renderRanking();
    return;
  }

  if (target.dataset.runStep !== undefined) {
    app.ui.runs = Math.max(1, effectiveRuns(dungeon) + Number(target.dataset.runStep));
    elements.runsInput.value = app.ui.runs;
    saveData();
    renderCashback();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.entrySectionToggle) {
    const key = entryConfigKey(dungeon, target.dataset.entrySectionToggle);
    app.ui.entryConfigOpen[key] = !app.ui.entryConfigOpen[key];
    saveData();
    renderEntryConfig();
    return;
  }

  if (target.dataset.addNpcItem !== undefined) {
    const select = target.closest(".entry-add-bar")?.querySelector("[data-npc-add-select]");
    addEntryItemToMode("npc", select?.value, 1);
    saveData();
    render();
    return;
  }

  if (target.dataset.removeEntryIndex !== undefined) {
    removeEntryLine(Number(target.dataset.removeEntryIndex));
    saveData();
    render();
    return;
  }

  if (target.dataset.addCashback !== undefined) {
    const nextRuns = Math.max(0, ...(dungeon.cashback || []).map((reward) => Number(reward.runs) || 0)) || 15;
    dungeon.cashback = dungeon.cashback || [];
    dungeon.cashback.push({
      runs: nextRuns === 15 && !dungeon.cashback.length ? 15 : nextRuns + 1,
      item: JEWEL_ITEMS[0],
      entryQty: 0,
      category: "Jóia",
    });
    dungeon.cashback = normalizeCashbackRewards(dungeon.cashback);
    saveData();
    renderCashback();
    renderCashbackConfig();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.removeCashbackIndex !== undefined) {
    dungeon.cashback.splice(Number(target.dataset.removeCashbackIndex), 1);
    saveData();
    renderCashback();
    renderCashbackConfig();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.removePlanItem !== undefined) {
    planItems().splice(Number(target.dataset.removePlanItem), 1);
    saveData();
    renderPlanning();
    return;
  }

  if (target.dataset.logAddDropIndex !== undefined) {
    const candidate = logDropCandidates()[Number(target.dataset.logAddDropIndex)];
    if (candidate?.record) addLogItem(logItemFromFarmRecord(candidate.record, selectedLogDungeon(), selectedLogRuns()));
    if (candidate?.candidate) addLogItem(logItemFromDropCandidate(candidate.candidate));
    saveData();
    renderDailyLog();
    return;
  }

  if (target.dataset.removeLogItemIndex !== undefined) {
    dailyDraftItems().splice(Number(target.dataset.removeLogItemIndex), 1);
    saveData();
    renderDailyLog();
    return;
  }

  if (target.dataset.removeFarmLog !== undefined) {
    app.ui.farmLogs = farmLogs().filter((log) => normalizedFarmLog(log).id !== target.dataset.removeFarmLog);
    saveData();
    renderDailyLog();
    renderSummary();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target.dataset.moneyInput !== undefined) {
    formatMoneyInput(target);
  }

  if (target.dataset.gemEnabled !== undefined) {
    const dungeon = currentDungeon();
    dungeon.gemEntryEnabled = target.checked;
    ensureGemEntryLine(dungeon);
    if (target.checked) {
      setEntryModeActive(dungeon, "gems", true);
    } else {
      normalizeActiveEntryModes(dungeon);
    }
    ensureAvailableEntryMode(dungeon);
    saveData();
    render();
    return;
  }

  if (target.dataset.entryModeToggle !== undefined) {
    const dungeon = currentDungeon();
    const changed = setEntryModeActive(dungeon, target.dataset.entryModeToggle, target.checked);
    if (!changed) target.checked = true;
    saveData();
    renderEntries();
    renderCashback();
    refreshNumbers();
    renderRanking();
    return;
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
    sellPc: true,
    rankMode: "hour",
    activeView: "ranking",
    favoriteDungeons: [],
    farmPlan: [],
    farmLogs: [],
    dailyDraft: null,
    entryModes: {},
    activeEntryModes: {},
    entryConfigOpen: {},
    countedDrops: {},
  };
  normalizeAppData();
  render();
});

document.addEventListener("input", (event) => {
  const target = event.target;
  const dungeon = currentDungeon();

  if (target.dataset.logItemIndex !== undefined) {
    const item = dailyDraftItems()[Number(target.dataset.logItemIndex)];
    if (!item) return;
    if (target.dataset.logItemField === "qty") item.qty = integerValue(target.value);
    if (target.dataset.logItemField === "price") item.price = moneyValue(target.value);
    const totalNode = document.querySelector(`[data-log-item-total="${target.dataset.logItemIndex}"]`);
    if (totalNode) applyAlzDisplay(totalNode, auctionNet(integerValue(item.qty) * moneyValue(item.price)));
    saveData();
    renderDailyPreview();
    return;
  }

  if (target.dataset.entryIndex !== undefined) {
    const line = dungeon.entries[Number(target.dataset.entryIndex)];
    if (target.dataset.entryField === "alz" && isAlzEntry(line)) {
      line.qty = moneyValue(target.value);
    }
    if (target.dataset.entryField === "qty" && canEditEntryQty(line)) {
      line.qty = integerValue(target.value);
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

  if (target.dataset.gemEntryIndex !== undefined) {
    const line = dungeon.entries[Number(target.dataset.gemEntryIndex)];
    if (line && inferEntryMode(line) === "gems") {
      line.qty = integerValue(target.value);
      saveData();
      render();
    }
    return;
  }

  if (target.dataset.cashbackConfigIndex !== undefined) {
    const reward = dungeon.cashback[Number(target.dataset.cashbackConfigIndex)];
    if (target.dataset.cashbackConfigField === "runs") {
      reward.runs = Math.max(1, Math.round(numberValue(target.value) || 1));
    }
    if (target.dataset.cashbackConfigField === "entryQty") {
      reward.entryQty = integerValue(target.value);
    }
    saveData();
    renderCashback();
    renderCashbackConfig();
    refreshNumbers();
    renderRanking();
    return;
  }

  if (target.dataset.basicIndex !== undefined) {
    const line = dungeon.basic[Number(target.dataset.basicIndex)];
    if (target.dataset.basicField === "qty") line.qty = integerValue(target.value);
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
    line[target.dataset.dropField] = target.dataset.dropField === "price" ? moneyValue(target.value) : integerValue(target.value);
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
    dungeon[field] = field === "minutes" ? numberValue(target.value) : integerValue(target.value);
    if (field === "baseRuns") {
      dungeon.baseRuns = baseRunLimit(dungeon);
      app.ui.runs = dungeon.baseRuns;
    }
    if (field === "resetCostGems") dungeon.resetCostGems = resetGemQty(dungeon);
    saveData();
    render();
  }
});

loadSavedData();
normalizeAppData();
render();
