import React from "react";
import { useSelector } from "react-redux";

const CountryCitySelector = ({
  countryId,
  cityId,
  onChange
}) => {
  const countries = useSelector((state) => state.address.countries);
  const cities = useSelector((state) => state.address.cities);

  const filteredCities = cities.filter(
    (c) => c.countryId === parseInt(countryId)
  );

  return (
    <div className="space-y-4">
      {/* Country Selector */}
      <select
        name="countryId"
        value={countryId}
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

      {/* City Selector */}
      <select
        name="cityId"
        value={cityId}
        onChange={onChange}
        className="border p-2 w-full"
        required
        disabled={!countryId} // Disable if no country selected
      >
        <option value="">Select City</option>
        {filteredCities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.cityName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountryCitySelector;
