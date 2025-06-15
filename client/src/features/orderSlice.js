import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5078/api/order";
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async () => {
    const response = await axios.get(`${BASE_URL}/get`, getAuthHeader());
    return response.data;
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId }, thunkAPI) => {
    const response = await axios.delete(
      `${BASE_URL}${orderId}/cancel`,
      getAuthHeader()
    );
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        response.errorData.message || "Failed to cancel the order"
      );
    }
    return thunkAPI.dispatch(fetchOrders());
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ( thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}/placeOrder`,
      getAuthHeader()
    );
    if (!response.ok) {
      console.log(response.errorData.message)
      return thunkAPI.rejectWithValue(
        response.errorData.message || "Failed to create order."
      );
    }
    return thunkAPI.dispatch(fetchOrders());
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
