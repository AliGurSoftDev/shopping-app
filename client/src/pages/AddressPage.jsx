import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchAddresses,
  fetchCities,
  fetchCountries,
  removeAddress,
  setDefault,
} from "../features/addressSlice";
import MenuBar from "../components/menu/MenuBar";
import AddressForm from "../components/address/AddressForm";
import AddressList from "../components/address/AddressList";
import { toast } from "react-toastify";

const AddressPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const fromCheckout = location.state?.fromCheckout;
  const userId = 1; // Replace with real userId if needed

  const [formVisible, setFormVisible] = useState(false);
  const [addressToEdit, setAdressToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(fetchAddresses(userId));
  }, [dispatch]);

  const handleRemove = async (addressId) => {
    try {
      await dispatch(removeAddress({ userId, addressId })).unwrap();
      toast.info("Address removed.");
    } catch (errorMessage) {
      toast.error(errorMessage);
    }
  };

  const handleSetDefault = (addressId) => {
    dispatch(setDefault({ userId, addressId }));
  };

  const toggleForm = () => {
    setFormVisible((prev) => !prev);
  };

  const handleBackToCheckout = () => {
    navigate("/checkout");
  };

  const handleAddNewAddress = () => {
    setAdressToEdit(null);
    toggleForm();
  };

  const handleEditAddress = (address) => {
    setAdressToEdit(address);
    toggleForm();
  };

  return (
    <>
      <MenuBar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-4">
          {!formVisible && (
            <>
              <h1 className="text-2xl font-bold mb-4 text-violet-600">Your Addresses</h1>
              <AddressList
                userId={userId}
                onRemove={handleRemove}
                onSetDefault={handleSetDefault}
                onEditAddress={handleEditAddress}
              />
            </>
          )}
          <div className="flex justify-between  mt-8 w-full">
            <div>
              {fromCheckout && (
                <button
                  className="text-start w-fit border-gray-400"
                  hidden={formVisible}
                  onClick={handleBackToCheckout}
                >
                  {"<"} Back to Checkout
                </button>
              )}
            </div>
            <div className="w-1/3">
              <button
                onClick={handleAddNewAddress}
                hidden={formVisible}
                className="bg-blue-600 text-white w-full px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Address
              </button>
            </div>
          </div>
        </div>

        {formVisible && (
          <div className="mb-4 ">
            <AddressForm userId={userId} toggleForm={toggleForm} addressToEdit={addressToEdit}/>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressPage;
