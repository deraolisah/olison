import api from "./api";

const normalize = (p) => {
  if (!p || typeof p !== "object") return p;
  const images = Array.isArray(p.productImages)
    ? p.productImages.filter(Boolean)
    : p.productImage
      ? [p.productImage]
      : p.image
        ? [p.image]
        : [];
  return { ...p, productImages: images };
};

const productService = {
  async getAll(params = {}) {
    const { data } = await api.get("/products", { params });
    return Array.isArray(data) ? data.map(normalize) : data;
  },

  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return normalize(data);
  },

  async create(product) {
    const { data } = await api.post("/products", product);
    return normalize(data);
  },

  async update(id, product) {
    const { data } = await api.put(`/products/${id}`, product);
    return normalize(data);
  },

  async remove(id) {
    await api.delete(`/products/${id}`);
    return true;
  },
};

export default productService;