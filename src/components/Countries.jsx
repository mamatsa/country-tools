import { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState();
  const [currentCountry, setCurrentCountry] = useState();

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,"
      );
      const countries = await response.json();
      setCountries(countries);
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    setCurrentCountry(event.target.value);
  };

  return (
    <form action="">
      <select name="countries" id="countries" onChange={handleChange}>
        {countries &&
          countries.map((country, index) => {
            const countryName = country.name.common;
            return (
              <option value={countryName} key={index}>
                {countryName}
              </option>
            );
          })}
      </select>
      <h1>{currentCountry}</h1>
    </form>
  );
}

export default Countries;
