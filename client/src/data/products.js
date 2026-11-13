const products = [
  {
    id: 1,
    name: "Product 1",
    price: 19.99,
    image: "/images/product1.jpg",
    description: "This is Product 1",
    category: "groceries",   // 👈 needed by Shop.jsx filter
    stock: 20,
  },
  {
    id: 2,
    name: "Product 2",
    price: 29.99,
    image: "/images/product2.jpg",
    description: "This is Product 2",
    category: "drinks",
    stock: 15,
  },
];

export default products;