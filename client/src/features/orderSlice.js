import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (userId) => {
    const res = await fetch(`http://localhost:5078/api/order/${userId}/get`);
    const data = await res.json();
    return data;
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async ({ userId, orderId }, thunkAPI) => {
    const res = await fetch(
      `http://localhost:5078/api/order/${orderId}/cancel`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to cancel the order"
      );
    }
    return thunkAPI.dispatch(fetchOrders(userId));
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ userId }, thunkAPI) => {
    const res = await fetch(
      `http://localhost:5078/api/order/${userId}/placeOrder`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData.message)
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to create order."
      );
    }
    return thunkAPI.dispatch(fetchOrders(userId));
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
