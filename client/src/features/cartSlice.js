// src/features/cart/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5078/api/cart";
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, thunkAPI) => {
    await axios.post(
      `${BASE_URL}/add`,
      { productId, quantity },
      getAuthHeader()
    );
    return thunkAPI.dispatch(fetchCart());
  }
);

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios.get(`${BASE_URL}/get`, getAuthHeader());
  return response.data;
});

export const emptyCart = createAsyncThunk("cart/emptyCart", async () => {
  await axios.delete(`${BASE_URL}/emptyCart`, getAuthHeader());
  return;
});

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, quantity }, thunkAPI) => {
    const response = await axios.request({
      method: "delete",
      url: `${BASE_URL}/remove`,
      data: { productId, quantity },
      ...getAuthHeader(),
    });
    // ...getAuthHeader() is used to spread the headers object, since in axios.request, there already exists a headers property

    if (!response.status == 200) throw new Error("Failed to remove item from cart");

    // Refresh cart
    return thunkAPI.dispatch(fetchCart());
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(emptyCart.fulfilled, (state) => {
        state.cart = { items: [], totalPrice: 0 };
      });
  },
});

export default cartSlice.reducer;
