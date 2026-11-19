import api from "./api";

const productService = {
  async getAll(params = {}) {
    const { data } = await api.get("/products", { params });
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  async create(product) {
    const { data } = await api.post("/products", product);
    return data;
  },

  async update(id, product) {
    const { data } = await api.put(`/products/${id}`, product);
    return data;
  },

  async remove(id) {
    await api.delete(`/products/${id}`);
    return true;
  },
};

export default productService;