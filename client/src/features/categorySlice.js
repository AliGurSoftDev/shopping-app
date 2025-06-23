import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const res = await fetch(`http://localhost:5078/api/category`);
    const data = await res.json();
    return data;
  }
);

export const fetchFeaturedCategories = createAsyncThunk(
  "category/fetchFeaturedCategories",
  async () => {
    const res = await fetch(`http://localhost:5078/api/category/featured`);
    const data = await res.json();
    return data;
  }
);

export const fetchCategoryDetails = createAsyncThunk(
  "category/fetchCategoryDetails",
  async (categoryId) => {
    const res = await fetch(`http://localhost:5078/api/category/${categoryId}`);
    const data = await res.json();
    return data;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: null,
    categoryDetails: null,
    featuredCategories: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
        state.categories = null; // Reset categories on new fetch
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchCategoryDetails.pending, (state) => {
        state.status = "loading";
        state.categoryDetails = null; // Reset category details on new fetch
      })
      .addCase(fetchCategoryDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categoryDetails = action.payload;
      })
      .addCase(fetchCategoryDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchFeaturedCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeaturedCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.featuredCategories = action.payload;
      })
      .addCase(fetchFeaturedCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
