import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk(
  "address/fetchCountries",
  async () => {
    const res = await fetch(`http://localhost:5078/api/address/countries`);
    const data = await res.json();
    return data;
  }
);

export const fetchCities = createAsyncThunk("address/fetchCities", async () => {
  const res = await fetch(`http://localhost:5078/api/address/cities`);
  const data = await res.json();
  return data;
});

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId) => {
    const res = await fetch(
      `http://localhost:5078/api/address/${userId}/getactive`
    );
    const data = res.json();
    console.log("FETCH DATA");
    console.log(data);
    return data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "address/fetchActiveAddresses",
  async (userId) => {
    const res = await fetch(`http://localhost:5078/api/address/${userId}/get`);
    const data = res.json();
    return data;
  }
);

export const fetchDefaultAddress = createAsyncThunk(
  "address/fetchDefaultAddress",
  async (userId) => {
    const res = await fetch(
      `http://localhost:5078/api/address/${userId}/getdefault`
    );
    const data = res.json();
    return data;
  }
);

export const fetchAddressById = createAsyncThunk(
  "address/fetchAddresses",
  async (id) => {
    const res = await fetch(`http://localhost:5078/api/address/${id}`);
    const data = res.json();
    return data;
  }
);

export const addNewAddress = createAsyncThunk(
  "address/addNewAddress",
  async (
    {
      userId,
      addressName,
      addressType,
      countryId,
      cityId,
      postCode,
      addressDetails,
      isDefault,
    },
    thunkAPI
  ) => {
    const response = await fetch(`http://localhost:5078/api/address`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        addressName,
        addressType,
        countryId,
        cityId,
        postCode,
        addressDetails,
        isDefault,
      }),
    });
    if (!response.ok) throw new Error("Failed to add the address");
    return thunkAPI.dispatch(fetchAddresses(userId)); // Refresh addresses after adding
  }
);

export const editAnAddress = createAsyncThunk(
  "address/editAnAddress",
  async (
    {
      userId,
      id,
      addressName,
      addressType,
      countryId,
      cityId,
      postCode,
      addressDetails,
      isDefault
    },
    thunkAPI
  ) => {
    const response = await fetch(`http://localhost:5078/api/address/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addressName,
        addressType,
        countryId,
        cityId,
        postCode,
        addressDetails,
        isDefault
      }),
    });
    if (!response.ok) throw new Error("Failed to edit the address");
    return thunkAPI.dispatch(fetchAddresses(userId));
  }
);

export const setDefault = createAsyncThunk(
  "address/setDefault",
  async ({ userId, addressId }, thunkAPI) => {
    const res = await fetch(
      `http://localhost:5078/api/address/${addressId}/setdefault`,
      {
        method: "PUT",
      }
    );
    if (!res.ok) throw new Error("Failed to set address default");
    return thunkAPI.dispatch(fetchAddresses(userId)); // Refresh default address after adding
  }
);

export const removeAddress = createAsyncThunk(
  "address/removeAddress",
  async ({ userId, addressId }, thunkAPI) => {
    const res = await fetch(
      `http://localhost:5078/api/address/${addressId}/remove`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      const errorData = await res.json();
      return thunkAPI.rejectWithValue(
        errorData.message || "Failed to remove address"
      );
    }
    return thunkAPI.dispatch(fetchAddresses(userId));
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
