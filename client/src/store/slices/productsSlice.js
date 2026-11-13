import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import productService from "../../services/productService";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await productService.getAll();
});

export const createProduct = createAsyncThunk(
  "products/create",
  async (product) => {
    return await productService.create(product);
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, data }) => {
    return await productService.update(id, data);
  }
);

export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  await productService.remove(id);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    searchQuery: "",
    categoryFilter: "all",
  },
  reducers: {
    setSearch: (s, a) => { s.searchQuery = a.payload; },
    setCategoryFilter: (s, a) => { s.categoryFilter = a.payload; },
  },
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s) => { s.status = "loading"; })
      .addCase(fetchProducts.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.items = a.payload;
      })
      .addCase(fetchProducts.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.error.message;
      })
      .addCase(createProduct.fulfilled, (s, a) => {
        s.items.unshift(a.payload);
      })
      .addCase(updateProduct.fulfilled, (s, a) => {
        const i = s.items.findIndex((p) => p.id === a.payload.id);
        if (i !== -1) s.items[i] = a.payload;
      })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.items = s.items.filter((p) => p.id !== a.payload);
      });
  },
});

export const { setSearch, setCategoryFilter } = productsSlice.actions;

// Selectors
export const selectFilteredProducts = (s) => {
  const { items, searchQuery, categoryFilter } = s.products;
  return items.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });
};

export default productsSlice.reducer;