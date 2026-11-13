// Local adapter — swap for fetch/axios when you have a backend.
const KEY = "olison_products_v1";

const seed = [
  {
    id: "p1",
    name: "Coca-Cola 50cl (Pack of 12)",
    price: 4800,
    category: "drinks",
    stock: 42,
    image: "/img/dept/drinks.jpg",
    description: "Chilled classic Coca-Cola pack.",
    featured: true,
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
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
    createdAt: new Date().toISOString(),
  },
];

const read = () => {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw);
};
const write = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

const genId = () => "p_" + Math.random().toString(36).slice(2, 10);

const productService = {
  async getAll() {
    return new Promise((r) => setTimeout(() => r(read()), 200));
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
    const i = list.findIndex((p) => p.id === id);
    if (i === -1) throw new Error("Not found");
    const updated = { ...list[i], ...data, id };
    list[i] = updated;
    write(list);
    return updated;
  },
  async remove(id) {
    const list = read().filter((p) => p.id !== id);
    write(list);
    return true;
  },
};

export default productService;