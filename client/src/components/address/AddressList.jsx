import React from "react";
import { useSelector } from "react-redux";
const AddressList = ({onRemove, onSetDefault}) => {
  const addresses = useSelector((state) => state.address.addresses);
  const countries = useSelector((state) => state.address.countries);
  const cities = useSelector((state) => state.address.cities);

  return (
    <div>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        <div>
        <ul className="space-y-4">
          {addresses.map((addr) => (
            <li key={addr.id} className="border p-4 rounded-md shadow-sm">
              <p><strong>{addr.addressName}</strong> ({addr.addressType === 0 ? "Home" : "Work"})</p>
              <p>{addr.addressDetails}</p>
              <p>Post Code: {addr.postCode}</p>
              <p>
                {cities.find((c) =>  c.id === addr.cityId)?.cityName || "Unknown"}{" / "}{countries.find((c) => c.id === addr.countryId)?.countryName.toUpperCase() || "Unknown"}
              </p>
              <div className="flex">
              {addr.isDefault == 0 ? (
                <button className=" bg-blue-600 text-white ml-auto" onClick={() => onSetDefault(addr.id)}>Set Default</button>
              ):(
                <span className="mr-auto">{addr.isDefault ? "✅ Default Address" : ""}</span>
              )}
              <button className="bg-red-600 text-white" onClick={() => onRemove(addr.id)}>X</button>
              </div>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default AddressList;
