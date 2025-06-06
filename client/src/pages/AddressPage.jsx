import React, { useEffect, useState } from "react";
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
  const userId = 1; // Replace with real userId if needed

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchCities());
    dispatch(fetchAddresses(userId));
  }, [dispatch]);

  const handleRemove = async (addressId) => {
    try {
      await dispatch(removeAddress({ userId, addressId })).unwrap();
      toast.info("Address removed.")
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

  return (
    <>
      <MenuBar />
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-4">
          {!formVisible &&
            <>
              <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
              <AddressList
                userId={userId}
                onRemove={handleRemove}
                onSetDefault={handleSetDefault}
              />
            </>
          }
          <div className="justify-self-center mt-8 w-1/2">
            <button
              onClick={toggleForm}
              hidden={formVisible}
              className="bg-blue-600 text-white w-full px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Add New Address
            </button>
          </div>
        </div>

        {formVisible && (
          <div className="mb-4 ">
            <h2 className="text-xl font-semibold mb-6">Add New Address</h2>
            <AddressForm userId={userId} toggleForm={toggleForm} />
          </div>
        )}
      </div>
    </>
  );
};

export default AddressPage;
