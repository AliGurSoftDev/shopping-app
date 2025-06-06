import React from "react";
import { useSelector } from "react-redux";

const CountrySelect = ({ value, onChange }) => {
  const countries = useSelector((state) => state.address.countries);

  return (
    <select
      name="countryId"
      value={value}
      onChange={onChange}
      className="border p-2 w-full"
      required
    >
      <option value="">Select Country</option>
      {countries.map((c) => (
        <option key={c.id} value={c.id}>
          {c.countryName}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
