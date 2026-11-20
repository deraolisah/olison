import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], isOpen: false },
  reducers: {
    // addToCart(state, action) {
    //   const { id, name, price, image, quantity = 1 } = action.payload;
    //   const existing = state.items.find((i) => i.id === id);

    //   if (existing) {
    //     existing.quantity += quantity;
    //   } else {
    //     state.items.push({ id, name, price, image, quantity });
    //   }
    // },

    addToCart(state, action) {
      const p = action.payload;
      const id = p.id || p._id;

      const image =
        p.image ||
        (Array.isArray(p.productImages) ? p.productImages[0] : undefined);

      const quantity = p.quantity ?? 1;

      const existing = state.items.find((i) => i.id === id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, name: p.name, price: p.price, image, quantity });
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) item.quantity = Math.max(1, quantity);
    },

    clearCart(state) {
      state.items = [];
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    setCartOpen(state, action) {
      state.isOpen = Boolean(action.payload);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions;

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartSlice.reducer;