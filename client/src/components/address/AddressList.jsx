import React from "react";
import { useSelector } from "react-redux";
const AddressList = ({ onRemove, onSetDefault }) => {
  const addresses = useSelector((state) => state.address.addresses);
  const countries = useSelector((state) => state.address.countries);
  const cities = useSelector((state) => state.address.cities);

  return (
    <>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {[...addresses]
              .sort((a, b) => (b.isDefault === "Y") - (a.isDefault === "Y"))
              .map((addr) => (
                <li
                  key={addr.id}
                  className={`border p-4 rounded-md shadow-sm transition-colors duration-700 text-gray-800 ${
                    addr.isDefault == "Y"
                      ? "bg-blue-100 border-2 border-blue-300"
                      : "bg-blue-50"
                  }`}
                >
                  <p>
                    <strong>{addr.addressName}</strong> (
                    {addr.addressType === 0 ? "Home" : "Work"})
                  </p>
                  <p>{addr.addressDetails}</p>
                  <p>
                    {cities.find((c) => c.id === addr.cityId)?.cityName ||
                      "Unknown"}
                    {" / "}
                    {countries
                      .find((c) => c.id === addr.countryId)
                      ?.countryName.toUpperCase() || "Unknown"}
                  </p>
                  <p>Post Code: {addr.postCode}</p>

                  <div className=" justify-self-end">
                    {addr.isDefault === "Y" ? (
                      <p className="text-gray-600 mt-4">Default Address</p>
                    ) : (
                      <>
                        <button
                          className=" bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          onClick={() => onSetDefault(addr.id)}
                        >
                          Set Default
                        </button>
                        <button
                          className="ml-2 bg-transparent border-red-600 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                          onClick={() => onRemove(addr.id)}
                        >
                          X
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AddressList;
