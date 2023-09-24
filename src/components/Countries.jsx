import { useEffect, useState } from "react";

function Countries() {
  const [countries, setCountries] = useState();
  const [countryDetails, setCountryDetails] = useState();

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      setCountries(countries);
    };

    fetchCountries();
  }, []);

  const handleChange = (event) => {
    const chosenCountry = countries[event.target.value];

    // Replace border country cca3 codes with names
    const borderCodes = chosenCountry.borders;
    if (borderCodes) {
      for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        borderCodes[borderCodes.indexOf(country.cca3)] = country.name.common;
      }
    }

    // Pick needed country details
    setCountryDetails({
      name: chosenCountry.name.common,
      capital: chosenCountry.capital && chosenCountry.capital[0],
      currency:
        chosenCountry.currencies &&
        `${Object.values(chosenCountry.currencies)[0].name} 
      (${Object.values(chosenCountry.currencies)[0].symbol})`,
      region: `${chosenCountry.region}, ${chosenCountry.subregion}`,
      continent: chosenCountry.continents[0],
      population: chosenCountry.population.toLocaleString(),
      borders: borderCodes && borderCodes.join(", "),
    });
  };

  return (
    <>
      <form action="">
        <select
          name="countries"
          id="countries"
          onChange={handleChange}
          defaultValue=""
        >
          <option value="" disabled hidden>
            Choose the country
          </option>
          {countries &&
            countries.map((country, index) => {
              return (
                <option value={index} key={index}>
                  {country.name.common}
                </option>
              );
            })}
        </select>
      </form>

      {countryDetails && (
        <div>
          <h1>{countryDetails.name}</h1>
          <p>Capital: {countryDetails.capital}</p>
          <p>Currency: {countryDetails.currency}</p>
          <p>Region: {countryDetails.region}</p>
          <p>Continent: {countryDetails.continent}</p>
          <p>Population: {countryDetails.population}</p>
          <p>Borders: {countryDetails.borders}</p>
        </div>
      )}
    </>
  );
}

export default Countries;
