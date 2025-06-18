import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5078/api/order";
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const response = await axios.get(`${BASE_URL}/get`, getAuthHeader());
  return response.data;
});

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ orderId }, thunkAPI) => {
    const response = await axios.delete(
      `${BASE_URL}/${orderId}/cancel`,
      getAuthHeader()
    );
    
    if (!response.status || response.status !== 200) {
      return thunkAPI.rejectWithValue(
        response.errorData.message || "Failed to cancel the order"
      );
    }
    return thunkAPI.dispatch(fetchOrders());
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/placeOrder`,
        {},
        getAuthHeader()
      );

      return thunkAPI.dispatch(fetchOrders());
    } catch (error) {
      // Check if the API returned an error response
      const errorMessage = error.response?.data || "Failed to create order.";

      return thunkAPI.rejectWithValue(errorMessage);
    }
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
