// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const addToCart = createAsyncThunk('cart/addToCart', async ({ userId, productId, quantity }, thunkAPI) => {
    const response = await fetch(`http://localhost:5078/api/cart/${userId}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add to cart');
    return thunkAPI.dispatch(fetchCart(userId)); // Refresh cart after adding
  }
);

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId) => {
  const res = await fetch(`http://localhost:5078/api/cart/${userId}/get`);
  const data = await res.json();
  return data;
});

export const emptyCart = createAsyncThunk('cart/emptyCart', async (userId) => {
  await fetch(`http://localhost:5078/api/cart/${userId}/empty`, {
    method: 'DELETE',
  });
  return userId;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.cart = { items: [], totalPrice: 0 };
      });
  },
});

export default cartSlice.reducer;
