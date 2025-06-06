import React from "react";
import { useSelector } from "react-redux";

const CitySelect = ({ value, onChange }) => {
  const cities = useSelector((state) => state.address.cities);

  return (
    <select
      name="cityId"
      value={value}
      onChange={onChange}
      className="border p-2 w-full"
      required
    >
      <option value="">Select City</option>
      {cities.map((c) => (
        <option key={c.id} value={c.id}>
          {c.cityName}
        </option>
      ))}
    </select>
  );
};

export default CitySelect;
