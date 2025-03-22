// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductItem {
  id: string;      // Each product must have a unique id.
  title: string;
  image: any;      // e.g. require(...) or a URL string.
  price: number;
  quantity: number;
}

interface CartState {
  items: ProductItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCart(state, action: PayloadAction<ProductItem[]>) {
      state.items = action.payload;
    },
    addToCart(state, action: PayloadAction<ProductItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => item.id !== id);
        } else {
          existingItem.quantity = quantity;
        }
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { updateCart, addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
