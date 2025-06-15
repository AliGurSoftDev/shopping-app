import React from "react";
import { useSelector } from "react-redux";
const AddressList = ({ onRemove, onSetDefault, onEditAddress }) => {
  const addresses = useSelector((state) => state.address.addresses);

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
                  <div className="flex justify-between">
                    <div>
                      <p>
                        <strong>{addr.addressName}</strong> ({addr.addressType})
                      </p>
                      <p>{addr.addressDetails}</p>
                      <p>
                        {addr.cityName || "Unknown"}
                        {" / "}
                        {addr.countryName?.toUpperCase() || "Unknown"}
                      </p>
                      <p>Post Code: {addr.postCode}</p>
                    </div>
                    <div className="text-right min-w-44">
                      <button
                        className="w-full bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => onEditAddress(addr)}
                      >
                        Edit Address
                      </button>
                      <div>
                        {addr.isDefault === "Y" ? (
                          <p className="text-gray-600 mt-4">Default Address</p>
                        ) : (
                          <>
                            <button
                              className=" bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white mt-4"
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
                    </div>
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
