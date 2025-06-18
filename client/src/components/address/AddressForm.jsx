import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewAddress, editAnAddress } from "../../features/addressSlice";
import CountryCitySelector from "./CountryCitySelector";
import { toast } from "react-toastify";

const AddressForm = ({ toggleForm, addressToEdit }) => {
  const dispatch = useDispatch();
  const [formData, setForm] = useState({
    addressName: "",
    addressType: "",
    countryId: "",
    cityId: "",
    postCode: "",
    addressDetails: "",
    isDefault: false,
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (addressToEdit != null) {
      setIsEdit(true);
      console.log(addressToEdit);
      setForm(addressToEdit);
    }
  }, [addressToEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(
        editAnAddress({
          ...formData,
          postCode: Number(formData.postCode),
          addressType: formData.addressType,
        })
      );
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          postCode: Number(formData.postCode),
          addressType: formData.addressType,
          isDefault: formData.isDefault ? "Y" : "N",
        })
      );
    }
    if (toggleForm) toggleForm();
    toast.success(isEdit ? "Address edited" : "Address added.");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setForm({
      addressName: "",
      addressType: "",
      countryId: "",
      cityId: "",
      postCode: "",
      addressDetails: "",
      isDefault: false,
    });

    if (toggleForm) toggleForm();
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6 text-violet-600">{isEdit ? "Edit An Address" : "Add New Address"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full bg-transparent"
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
          className="border p-2 w-full bg-transparent"
        >
          <option value={0}>Home</option>
          <option value={1}>Business</option>
        </select>

        <CountryCitySelector
          countryId={formData.countryId}
          cityId={formData.cityId}
          countryName={formData.countryName}
          cityName={formData.cityName}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full bg-transparent"
          name="postCode"
          type="number"
          placeholder="Post Code"
          value={formData.postCode}
          onChange={handleChange}
          required
        />
        <textarea
          className="border p-2 w-full bg-transparent"
          name="addressDetails"
          placeholder="Address Details"
          value={formData.addressDetails}
          onChange={handleChange}
          required
        />
        {!isEdit && (
          <label className="block">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
                className="appearance-none bg-white border border-gray-300 rounded w-4 h-4 checked:bg-violet-800 checked:border-transparent focus:outline-none"

            />{" "}
            Set as default
          </label>
        )}
        <div className="justify-self-end">
          <button
            type="submit"
            className="  bg-blue-600 text-white px-4 py-2 mr-2 rounded  hover:bg-blue-400 hover:border-red-60"
          >
            {isEdit ? "Edit Address" : "Add Address"}
          </button>

          <button
            onClick={handleCancel}
            className=" bg-transparent px-4 py-2 rounded text-red-600 border-red-600 hover:text-white hover:bg-red-600 hover:border-red-600"
          >
            cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
