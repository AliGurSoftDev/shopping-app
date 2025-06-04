import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchAddresses,
  fetchCities,
  fetchCountries,
  removeAddress,
  setDefault,
} from "../features/address/addressSlice";
import MenuBar from "../components/menu/MenuBar";
import AddressForm from "../components/address/AddressForm";
import AddressList from "../components/address/AddressList";
import { toast } from "react-toastify";

const AddressPage = () => {
  const dispatch = useDispatch();
  const userId = 1; // Replace with real userId if needed

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(fetchAddresses(userId));
  }, [dispatch]);

  const handleRemove = async (addressId) => {
    try {
      await dispatch(removeAddress({ userId, addressId })).unwrap();
    } catch (errorMessage) {
      toast.error(errorMessage);
    }
  };
  const handleSetDefault = (addressId) => {
    dispatch(setDefault({ userId, addressId }));
  };

  return (
    <>
      <MenuBar />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
        <AddressList
          userId={userId}
          onRemove={handleRemove}
          onSetDefault={handleSetDefault}
        />
        <hr className="my-6" />
        <h2 className="text-xl font-semibold mb-2">Add New Address</h2>
        <AddressForm userId={userId} />
      </div>
    </>
  );
};

export default AddressPage;
