
const KEY = "olison_products_v1";

const seed = [
  // ORIGINAL PRODUCTS
  {
    id: "p1",
    name: "Coca-Cola 50cl (Pack of 12)",
    price: 4800,
    category: "drinks",
    stock: 42,
    image: "/img/dept/drinks.jpg",
    description: "Chilled classic Coca-Cola pack.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p2",
    name: "Nivea Body Lotion 400ml",
    price: 6500,
    category: "cosmetics",
    stock: 18,
    image: "/img/dept/cosmetics.jpg",
    description: "Nourishing body lotion.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p3",
    name: "Golden Penny Semovita 1kg",
    price: 2100,
    category: "groceries",
    stock: 60,
    image: "/img/dept/groceries.jpg",
    description: "Premium semovita flour.",
    featured: true,
    imageRatio: "landscape",
  },

  // DRINKS
  {
    id: "p4",
    name: "Peak Evaporated Milk 170g",
    price: 950,
    category: "drinks",
    stock: 45,
    image: "/img/dept/drinks.jpg",
    description: "Rich evaporated milk for tea and cooking.",
    featured: true,
    imageRatio: "square",
  },
  {
    id: "p5",
    name: "Maltina Classic 33cl (Pack of 6)",
    price: 4200,
    category: "drinks",
    stock: 30,
    image: "/img/dept/drinks.jpg",
    description: "Refreshing malt drink.",
    featured: false,
    imageRatio: "portrait",
  },
  {
    id: "p6",
    name: "Eva Table Water 75cl (Pack of 12)",
    price: 3000,
    category: "drinks",
    stock: 55,
    image: "/img/dept/drinks.jpg",
    description: "Pack of bottled drinking water.",
    featured: false,
    imageRatio: "landscape",
  },
  {
    id: "p7",
    name: "Hollandia Yoghurt 1L",
    price: 2800,
    category: "drinks",
    stock: 20,
    image: "/img/dept/drinks.jpg",
    description: "Creamy dairy yoghurt.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p8",
    name: "Fanta Orange 50cl (Pack of 12)",
    price: 4600,
    category: "drinks",
    stock: 35,
    image: "/img/dept/drinks.jpg",
    description: "Orange flavoured soft drink.",
    featured: false,
    imageRatio: "square",
  },

  // GROCERIES
  {
    id: "p9",
    name: "Golden Penny Spaghetti 500g",
    price: 950,
    category: "groceries",
    stock: 80,
    image: "/img/dept/groceries.jpg",
    description: "Quality spaghetti for everyday meals.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p10",
    name: "Dangote Sugar 1kg",
    price: 1900,
    category: "groceries",
    stock: 50,
    image: "/img/dept/groceries.jpg",
    description: "Refined granulated white sugar.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p11",
    name: "Power Oil Vegetable Oil 1L",
    price: 3200,
    category: "groceries",
    stock: 28,
    image: "/img/dept/groceries.jpg",
    description: "Vegetable cooking oil.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p12",
    name: "Indomie Chicken Noodles (Pack of 5)",
    price: 1800,
    category: "groceries",
    stock: 75,
    image: "/img/dept/groceries.jpg",
    description: "Instant chicken flavour noodles.",
    featured: false,
    imageRatio: "landscape",
  },
  {
    id: "p13",
    name: "Golden Morn 500g",
    price: 2500,
    category: "groceries",
    stock: 32,
    image: "/img/dept/groceries.jpg",
    description: "Nutritious maize and soya cereal.",
    featured: true,
    imageRatio: "square",
  },
  {
    id: "p14",
    name: "Peak Full Cream Milk Powder 400g",
    price: 6200,
    category: "groceries",
    stock: 22,
    image: "/img/dept/groceries.jpg",
    description: "Full cream milk powder.",
    featured: false,
    imageRatio: "portrait",
  },

  // COSMETICS & PERSONAL CARE
  {
    id: "p15",
    name: "Vaseline Cocoa Radiant Lotion 400ml",
    price: 7200,
    category: "cosmetics",
    stock: 16,
    image: "/img/dept/cosmetics.jpg",
    description: "Moisturising body lotion.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p16",
    name: "Dove Beauty Cream Bar (Pack of 4)",
    price: 3500,
    category: "cosmetics",
    stock: 24,
    image: "/img/dept/cosmetics.jpg",
    description: "Gentle moisturising beauty soap.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p17",
    name: "Nivea Men Deep Shower Gel 250ml",
    price: 4200,
    category: "cosmetics",
    stock: 12,
    image: "/img/dept/cosmetics.jpg",
    description: "Refreshing men's shower gel.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p18",
    name: "Closeup Toothpaste 140g",
    price: 1800,
    category: "cosmetics",
    stock: 40,
    image: "/img/dept/cosmetics.jpg",
    description: "Fresh breath toothpaste.",
    featured: false,
    imageRatio: "landscape",
  },
  {
    id: "p19",
    name: "Oral-B Toothbrush",
    price: 1200,
    category: "cosmetics",
    stock: 30,
    image: "/img/dept/cosmetics.jpg",
    description: "Everyday oral care toothbrush.",
    featured: false,
    imageRatio: "square",
  },

  // HOUSEHOLD
  {
    id: "p20",
    name: "Morning Fresh Dishwashing Liquid 500ml",
    price: 2200,
    category: "household",
    stock: 25,
    image: "/img/dept/household.jpg",
    description: "Dishwashing liquid for sparkling clean dishes.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p21",
    name: "Harpic Toilet Cleaner 500ml",
    price: 2800,
    category: "household",
    stock: 18,
    image: "/img/dept/household.jpg",
    description: "Toilet cleaning and hygiene solution.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p22",
    name: "Viva Detergent 900g",
    price: 2600,
    category: "household",
    stock: 35,
    image: "/img/dept/household.jpg",
    description: "Laundry detergent for everyday washing.",
    featured: false,
    imageRatio: "portrait",
  },
  {
    id: "p23",
    name: "Scotch-Brite Cleaning Sponge",
    price: 800,
    category: "household",
    stock: 50,
    image: "/img/dept/household.jpg",
    description: "Durable household cleaning sponge.",
    featured: false,
    imageRatio: "square",
  },

  // SNACKS
  {
    id: "p24",
    name: "Pringles Original 165g",
    price: 4200,
    category: "snacks",
    stock: 14,
    image: "/img/dept/snacks.jpg",
    description: "Classic original potato crisps.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p25",
    name: "McVitie's Digestive Biscuits",
    price: 2500,
    category: "snacks",
    stock: 20,
    image: "/img/dept/snacks.jpg",
    description: "Crunchy digestive biscuits.",
    featured: false,
    imageRatio: "landscape",
  },
  {
    id: "p26",
    name: "Gala Sausage Roll",
    price: 500,
    category: "snacks",
    stock: 60,
    image: "/img/dept/snacks.jpg",
    description: "Ready-to-eat sausage roll.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p27",
    name: "Peak Milk Biscuits",
    price: 1200,
    category: "snacks",
    stock: 28,
    image: "/img/dept/snacks.jpg",
    description: "Sweet biscuits for a quick snack.",
    featured: false,
    imageRatio: "portrait",
  },

  // MORE GROCERY & HOME ESSENTIALS
  {
    id: "p28",
    name: "Basmati Rice 1kg",
    price: 3800,
    category: "groceries",
    stock: 26,
    image: "/img/dept/groceries.jpg",
    description: "Fragrant long-grain rice.",
    featured: true,
    imageRatio: "portrait",
  },
  {
    id: "p29",
    name: "Knorr Chicken Cubes (Pack)",
    price: 900,
    category: "groceries",
    stock: 48,
    image: "/img/dept/groceries.jpg",
    description: "Chicken seasoning cubes for cooking.",
    featured: false,
    imageRatio: "square",
  },
  {
    id: "p30",
    name: "Dettol Antiseptic Liquid 250ml",
    price: 2800,
    category: "household",
    stock: 0,
    image: "/img/dept/household.jpg",
    description: "Antiseptic liquid for household hygiene.",
    featured: false,
    imageRatio: "portrait",
  },
];

const read = () => {
  const raw = localStorage.getItem(KEY);

  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }

  const existing = JSON.parse(raw);

  // Add newly introduced seed products without deleting
  // products already created or edited by the store owner.
  const existingIds = new Set(
    existing.map((product) => product.id || product._id)
  );

  const missingProducts = seed.filter(
    (product) => !existingIds.has(product.id)
  );

  if (missingProducts.length > 0) {
    const merged = [...existing, ...missingProducts];
    localStorage.setItem(KEY, JSON.stringify(merged));
    return merged;
  }

  return existing;
};

const write = (arr) => {
  localStorage.setItem(KEY, JSON.stringify(arr));
};

const genId = () =>
  "p_" + Math.random().toString(36).slice(2, 10);

const productService = {
  async getAll() {
    return new Promise((resolve) =>
      setTimeout(() => resolve(read()), 200)
    );
  },

  async create(data) {
    const list = read();

    const newProduct = {
      ...data,
      id: genId(),
      createdAt: new Date().toISOString(),
    };

    list.unshift(newProduct);
    write(list);

    return newProduct;
  },

  async update(id, data) {
    const list = read();
    const index = list.findIndex(
      (product) => (product.id || product._id) === id
    );

    if (index === -1) throw new Error("Product not found");

    const updated = { ...list[index], ...data, id };
    list[index] = updated;

    write(list);
    return updated;
  },

  async remove(id) {
    const list = read().filter(
      (product) => (product.id || product._id) !== id
    );

    write(list);
    return true;
  },
};

export default productService;