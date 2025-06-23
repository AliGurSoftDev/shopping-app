import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for product API
const BASE_URL = "http://localhost:5078/api/product";

// Thunks
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "products/fetchFeaturedProducts",
  async () => {
    const response = await axios.get(`${BASE_URL}/featured`);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { getState }) => {
    // Set the requestedCategoryId in the state before making the request
    // (handled in pending reducer below)
    const response = await axios.get(`${BASE_URL}/category=${categoryId}`);
    return { data: response.data, categoryId };
  }
);

export const fetchSearchedProducts = createAsyncThunk(
  "products/fetchSearchedProducts",
  async (keyword) => {
    const response = await axios.get(`${BASE_URL}/search=${keyword}`);
    return response.data;
  }
);

// Initial state
const initialState = {
  products: [],
  selectedProduct: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  requestedCategoryId: null, // Track the latest requested categoryId
};

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Featured Products

      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.featuredProducts = action.payload;
      })

      // Product by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
        state.selectedProduct = null; // Clear previous products while loading new ones
      })

      // Category
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        state.status = "loading";
        state.products = [];
        state.error = null;
        state.requestedCategoryId = action.meta.arg; // Save the requested categoryId
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        // Only update products if this is the latest requested categoryId
        if (state.requestedCategoryId === action.payload.categoryId) {
          state.status = "succeeded";
          state.products = action.payload.data;
        }
      })

      // Search
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
