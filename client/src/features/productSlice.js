import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base URL for product API
const BASE_URL = 'http://localhost:5078/api/product';

// Thunks
export const fetchAllProducts = createAsyncThunk('products/fetchAllProducts', async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
});

export const fetchFeaturedProducts = createAsyncThunk('products/fetchFeaturedProducts', async () => {
  const response = await axios.get(`${BASE_URL}/featured`);
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchProductsByCategory', async (categoryId) => {
  const response = await axios.get(`${BASE_URL}/category=${categoryId}`);
  return response.data;
});

export const fetchSearchedProducts = createAsyncThunk('products/fetchSearchedProducts', async (keyword) => {
  const response = await axios.get(`${BASE_URL}/search=${keyword}`);
  return response.data;
});

// Initial state
const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

// Slice
const productSlice = createSlice({
  name: 'products',
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Featured Products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload;
      })

      // Product by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })

      // Category
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })

      // Search
      .addCase(fetchSearchedProducts.fulfilled, (state, action) => {
        state.searchedProducts = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;
export default productSlice.reducer;
