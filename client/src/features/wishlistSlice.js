import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5078/api/cart";
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async ({ productId }, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}/addwishlist`,
      { productId, quantity: 1 },
      getAuthHeader()
    );
    if (!response.ok) throw new Error("Failed to add to wishlist");
    return thunkAPI.dispatch(fetchWishlist());
  }
);

export const fetchWishlist = createAsyncThunk(
  "cart/fetchWishlist",
  async () => {
    const response = await axios.get(`${BASE_URL}/wishlist`, getAuthHeader());
    return response.data;
  }
);

export const emptyWishlist = createAsyncThunk(
  "cart/emptyWishlist",
  async () => {
    await axios.delete(`${BASE_URL}/emptyWishlist`, getAuthHeader());
    return;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "cart/removeFromWishlist",
  async ({ productId }, thunkAPI) => {
    const response = await axios.request({
      method: "delete",
      url: `${BASE_URL}/removewishlist`,
      data: { productId, quantity: 1 },
      ...getAuthHeader(),
    });
    // ...getAuthHeader() is used to spread the headers object, since in axios.request, there already exists a headers property
    
    if (!response.ok) throw new Error("Failed to remove item from wishlist");

    // Refresh cart
    return thunkAPI.dispatch(fetchWishlist());
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(emptyWishlist.fulfilled, (state) => {
        state.wishlist = { items: [], totalPrice: 0 };
      });
  },
});

export default wishlistSlice.reducer;
