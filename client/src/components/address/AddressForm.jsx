import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addNewAddress,
  fetchCities,
} from "../../features/address/addressSlice";
import CountrySelect from "./CountrySelect";
import CitySelect from "./CitySelect";
import CountryCitySelector from "./CountryCitySelector";

const AddressForm = ({ userId }) => {
  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    addressName: "",
    addressType: 0,
    countryId: "",
    cityId: "",
    postCode: "",
    addressDetails: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addNewAddress({ ...formData, userId, postCode: Number(formData.postCode), addressType: Number(formData.addressType), isDefault: (formData.isDefault) ? 1 : 0 }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="border p-2 w-full"
        name="addressName"
        placeholder="Address Name"
        value={formData.addressName}
        onChange={handleChange}
        required
      />
      <select
        name="addressType"
        value={formData.addressType}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value={0}>Home</option>
        <option value={1}>Work</option>
      </select>

      <CountryCitySelector countryId={formData.countryId} cityId={formData.cityId} onChange={handleChange} />

      <input
        className="border p-2 w-full"
        name="postCode"
        type="number"
        placeholder="Post Code"
        value={formData.postCode}
        onChange={handleChange}
        required
      />
      <textarea
        className="border p-2 w-full"
        name="addressDetails"
        placeholder="Address Details"
        value={formData.addressDetails}
        onChange={handleChange}
        required
      />
      <label className="block">
        <input
          type="checkbox"
          name="isDefault"
          checked={formData.isDefault}
          onChange={handleChange}
        />{" "}
        Set as default
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Address
      </button>
    </form>
  );
};

export default AddressForm;
