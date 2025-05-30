import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToWishlist = createAsyncThunk(
  "cart/addToWishlist",
  async ({ userId, productId }, thunkAPI) => {
    const response = await fetch(
      `http://localhost:5078/api/cart/${userId}/addwishlist`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      }
    );
    if (!response.ok) throw new Error("Failed to add to wishlist");
    return thunkAPI.dispatch(fetchWishlist(userId));
  }
);

export const fetchWishlist = createAsyncThunk(
  "cart/fetchWishlist",
  async (userId) => {
    const res = await fetch(
      `http://localhost:5078/api/cart/${userId}/wishlist`
    );
    const data = await res.json();
    return data;
  }
);

export const emptyWishlist = createAsyncThunk(
  "cart/emptyWishlist",
  async (userId) => {
    await fetch(`http://localhost:5078/api/cart/${userId}/emptyWishlist`, {
      method: "DELETE",
    });
    return userId;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "cart/removeFromWishlist",
  async ({ userId, productId }) => {
    const response = await fetch(
      `http://localhost:5078/api/cart/${userId}/removewishlist`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      }
    );

    if (!response.ok) throw new Error("Failed to remove item from wishlist");

    return userId;
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
