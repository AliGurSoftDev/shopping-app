import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5078/api/address";

// Token will be pulled at runtime inside each thunk for freshness
const getAuthHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

export const fetchCountries = createAsyncThunk(
  "address/fetchCountries",
  async () => {
    const response = await axios.get(`${BASE_URL}/countries`);
    return response.data;
  }
);

export const fetchCities = createAsyncThunk("address/fetchCities", async () => {
  const response = await axios.get(`${BASE_URL}/cities`);
  return response.data;
});

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async () => {
    const response = await axios.get(`${BASE_URL}/getactive`, getAuthHeader());
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchAllAddresses",
  async () => {
    const response = await axios.get(`${BASE_URL}/get`, getAuthHeader());
    return response.data;
  }
);

export const fetchDefaultAddress = createAsyncThunk(
  "address/fetchDefaultAddress",
  async () => {
    const response = await axios.get(
      `${BASE_URL}/getdefault`,
      getAuthHeader()
    );
    return response.data;
  }
);

export const fetchAddressById = createAsyncThunk(
  "address/fetchAddressById",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeader());
    return response.data;
  }
);

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (addressData, thunkAPI) => {
    const response = await axios.post(
      `${BASE_URL}`,
      addressData,
      getAuthHeader()
    );
    if (response.status !== 200 && response.status !== 201)
      throw new Error("Failed to add the address");

    return thunkAPI.dispatch(fetchAddresses());
  }
);

export const editAnAddress = createAsyncThunk(
  "address/editAnAddress",
  async ({ id, ...updateData }, thunkAPI) => {
    const response = await axios.put(
      `${BASE_URL}/${id}`,
      updateData,
      getAuthHeader()
    );
    if (response.status !== 200) throw new Error("Failed to edit the address");

    return thunkAPI.dispatch(fetchAddresses());
  }
);

export const setDefault = createAsyncThunk(
  "address/setDefault",
  async ({ addressId }, thunkAPI) => {
    const response = await axios.put(
      `${BASE_URL}/${addressId}/setdefault`,
      null,
      getAuthHeader()
    );
    if (response.status !== 200)
      throw new Error("Failed to set address default");

    return thunkAPI.dispatch(fetchAddresses());
  }
);

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async ({ addressId }, thunkAPI) => {
    try {
      await axios.delete(`${BASE_URL}/${addressId}/remove`, getAuthHeader());
      return thunkAPI.dispatch(fetchAddresses());
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove address"
      );
    }
  }
);

const initialState = {
  countries: [],
  cities: [],
  addresses: [],
  defaultAddress: null,
  status: "idle",
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch countries
      .addCase(fetchCountries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch cities
      .addCase(fetchCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch addresses
      .addCase(fetchAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch addresses
      .addCase(fetchAllAddresses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allAddresses = action.payload;
      })
      .addCase(fetchAllAddresses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch default address
      .addCase(fetchDefaultAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.defaultAddress = action.payload;
      })
      .addCase(fetchDefaultAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default addressSlice.reducer;
