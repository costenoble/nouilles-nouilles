export type Allergen =
  | "gluten"
  | "soja"
  | "oeuf"
  | "arachide"
  | "fruits-a-coque"
  | "crustaces"
  | "poisson"
  | "sesame"
  | "lait";

export const allergenLabels: Record<Allergen, { fr: string; en: string }> = {
  gluten: { fr: "Gluten", en: "Gluten" },
  soja: { fr: "Soja", en: "Soy" },
  oeuf: { fr: "Œuf", en: "Egg" },
  arachide: { fr: "Arachide", en: "Peanut" },
  "fruits-a-coque": { fr: "Fruits à coque", en: "Tree nuts" },
  crustaces: { fr: "Crustacés", en: "Shellfish" },
  poisson: { fr: "Poisson", en: "Fish" },
  sesame: { fr: "Sésame", en: "Sesame" },
  lait: { fr: "Lait", en: "Milk" },
};

export type Category = "noodles" | "soups" | "starters" | "desserts";

export type Dish = {
  id: string;
  category: Category;
  name: { fr: string; en: string };
  desc: { fr: string; en: string };
  price: number;
  allergens: Allergen[];
  veg?: boolean;
  spicy?: 0 | 1 | 2 | 3;
  image?: string;
  signature?: boolean;
};

export const menu: Dish[] = [
  // --- Nouilles sautées ---
  {
    id: "nouilles-poulet",
    category: "noodles",
    name: { fr: "Nouilles sautées au poulet", en: "Stir-fried chicken noodles" },
    desc: {
      fr: "Nouilles tirées à la main, poulet mariné, légumes croquants, sauce maison légèrement pimentée.",
      en: "Hand-pulled noodles, marinated chicken, crisp vegetables, lightly spiced house sauce.",
    },
    price: 13.5,
    allergens: ["gluten", "soja", "oeuf", "sesame"],
    spicy: 2,
    image: "/dishes/nouilles-sautees.jpg",
    signature: true,
  },
  {
    id: "nouilles-legumes",
    category: "noodles",
    name: { fr: "Nouilles sautées aux légumes", en: "Stir-fried vegetable noodles" },
    desc: {
      fr: "Pak choï, carotte, champignons, germes de soja, sauce soja sucrée.",
      en: "Pak choi, carrot, mushrooms, bean sprouts, sweet soy sauce.",
    },
    price: 12,
    allergens: ["gluten", "soja", "sesame"],
    veg: true,
    spicy: 1,
  },
  {
    id: "pad-thai",
    category: "noodles",
    name: { fr: "Pad thaï aux crevettes", en: "Prawn pad thai" },
    desc: {
      fr: "Nouilles de riz, crevettes, cacahuètes, tamarin, coriandre, citron vert.",
      en: "Rice noodles, prawns, peanuts, tamarind, coriander, lime.",
    },
    price: 14.5,
    allergens: ["crustaces", "arachide", "oeuf", "soja"],
    spicy: 2,
  },
  {
    id: "lo-mein-boeuf",
    category: "noodles",
    name: { fr: "Lo mein au bœuf", en: "Beef lo mein" },
    desc: {
      fr: "Bœuf émincé, oignons nouveaux, poivrons, sauce d'huître, nouilles aux œufs.",
      en: "Sliced beef, spring onion, peppers, oyster sauce, egg noodles.",
    },
    price: 14,
    allergens: ["gluten", "soja", "oeuf"],
    spicy: 1,
  },

  // --- Soupes & bouillons ---
  {
    id: "pho-boeuf",
    category: "soups",
    name: { fr: "Phở bœuf", en: "Beef phở" },
    desc: {
      fr: "Bouillon mijoté 12 h, bœuf, nouilles de riz, herbes fraîches, pousses de soja.",
      en: "12-hour simmered broth, beef, rice noodles, fresh herbs, bean sprouts.",
    },
    price: 14.5,
    allergens: ["soja", "poisson"],
    spicy: 1,
    image: "/dishes/pho-boeuf.jpg",
    signature: true,
  },
  {
    id: "poulet-croustillant",
    category: "soups",
    name: { fr: "Bol de poulet croustillant", en: "Crispy chicken bowl" },
    desc: {
      fr: "Poulet croustillant, nouilles larges, pak choï, bouillon parfumé à la citronnelle.",
      en: "Crispy chicken, wide noodles, pak choi, lemongrass-scented broth.",
    },
    price: 15,
    allergens: ["gluten", "soja", "oeuf", "sesame"],
    spicy: 1,
    image: "/dishes/poulet-croustillant.jpg",
    signature: true,
  },
  {
    id: "ramen-tonkotsu",
    category: "soups",
    name: { fr: "Ramen tonkotsu", en: "Tonkotsu ramen" },
    desc: {
      fr: "Bouillon de porc crémeux, chashu, œuf mollet mariné, maïs, nori.",
      en: "Creamy pork broth, chashu, marinated soft egg, corn, nori.",
    },
    price: 15.5,
    allergens: ["gluten", "soja", "oeuf", "sesame"],
    spicy: 1,
  },
  {
    id: "soupe-wonton",
    category: "soups",
    name: { fr: "Soupe de wontons", en: "Wonton soup" },
    desc: {
      fr: "Raviolis de crevette et porc, bouillon clair, ciboule.",
      en: "Prawn and pork dumplings, clear broth, spring onion.",
    },
    price: 11.5,
    allergens: ["gluten", "crustaces", "soja", "sesame"],
    spicy: 0,
  },

  // --- À partager ---
  {
    id: "gyozas",
    category: "starters",
    name: { fr: "Gyozas poêlés (6)", en: "Pan-fried gyoza (6)" },
    desc: {
      fr: "Raviolis poêlés au porc et chou, sauce soja vinaigrée.",
      en: "Pan-fried pork & cabbage dumplings, soy-vinegar dip.",
    },
    price: 7.5,
    allergens: ["gluten", "soja", "sesame"],
    spicy: 0,
    image: "/dishes/gyoza.jpg",
    signature: true,
  },
  {
    id: "raviolis-vapeur",
    category: "starters",
    name: { fr: "Raviolis vapeur (6)", en: "Steamed dumplings (6)" },
    desc: {
      fr: "Raviolis vapeur aux légumes, sauce ponzu.",
      en: "Steamed vegetable dumplings, ponzu sauce.",
    },
    price: 7,
    allergens: ["gluten", "soja"],
    veg: true,
    spicy: 0,
  },
  {
    id: "edamame",
    category: "starters",
    name: { fr: "Edamame au sel", en: "Salted edamame" },
    desc: {
      fr: "Fèves de soja vapeur, fleur de sel.",
      en: "Steamed soy beans, sea salt.",
    },
    price: 5,
    allergens: ["soja"],
    veg: true,
    spicy: 0,
  },
  {
    id: "nems",
    category: "starters",
    name: { fr: "Nems maison (4)", en: "House spring rolls (4)" },
    desc: {
      fr: "Nems croustillants au poulet, salade et menthe.",
      en: "Crispy chicken spring rolls, salad and mint.",
    },
    price: 6.5,
    allergens: ["gluten", "soja", "oeuf"],
    spicy: 0,
  },

  // --- Douceurs ---
  {
    id: "mochi",
    category: "desserts",
    name: { fr: "Mochis glacés (3)", en: "Ice cream mochi (3)" },
    desc: {
      fr: "Mochis glacés mangue, matcha et coco.",
      en: "Mango, matcha and coconut ice cream mochi.",
    },
    price: 6.5,
    allergens: ["gluten", "lait", "soja"],
    veg: true,
    spicy: 0,
  },
  {
    id: "perles-coco",
    category: "desserts",
    name: { fr: "Perles de coco", en: "Coconut tapioca" },
    desc: {
      fr: "Tapioca, lait de coco, mangue fraîche.",
      en: "Tapioca, coconut milk, fresh mango.",
    },
    price: 5.5,
    allergens: [],
    veg: true,
    spicy: 0,
  },
  {
    id: "beignets-banane",
    category: "desserts",
    name: { fr: "Beignets de banane", en: "Banana fritters" },
    desc: {
      fr: "Banane tempura, miel, sésame, glace vanille.",
      en: "Tempura banana, honey, sesame, vanilla ice cream.",
    },
    price: 6,
    allergens: ["gluten", "oeuf", "lait", "sesame"],
    veg: true,
    spicy: 0,
  },
];

export const categoryOrder: Category[] = ["noodles", "soups", "starters", "desserts"];
