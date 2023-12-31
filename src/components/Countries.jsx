import { useEffect, useState, useRef, useCallback } from "react";
import ToolTabs from "./ToolTabs";
import { useNavigate, useParams } from "react-router-dom";
import CountryDetail from "./CountryDetail";

function Countries({ userCountry }) {
  const navigate = useNavigate();
  const { countryId } = useParams();

  const [countries, setCountries] = useState();
  const [countryDetails, setCountryDetails] = useState();
  const selectRef = useRef(null);

  // Handle country change
  const handleChange = useCallback(
    (index) => {
      const chosenCountry = countries[index];
      const borderCodes = chosenCountry.borders;
      // Replace border country codes with actual names
      if (borderCodes) {
        for (let i = 0; i < countries.length; i++) {
          const country = countries[i];
          borderCodes[borderCodes.indexOf(country.cca3)] = country.name.common;
        }
      }

      // Pick needed country details
      setCountryDetails({
        name: chosenCountry.name.common,
        flag: chosenCountry.flags.png,
        capital: chosenCountry.capital && chosenCountry.capital[0],
        currency:
          chosenCountry.currencies &&
          `${Object.values(chosenCountry.currencies)[0].name} 
      (${Object.values(chosenCountry.currencies)[0].symbol})`,
        region: `${chosenCountry.region}, ${chosenCountry.subregion}`,
        continent: chosenCountry.continents[0],
        population: chosenCountry.population.toLocaleString(),
        borders: borderCodes && borderCodes.join(", "),
        index,
      });

      navigate(`/${chosenCountry.cca3}`);
    },
    [countries, navigate]
  );

  // Get countries on initial load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();
        setCountries(countries);
      } catch (e) {
        console.log(e.message);
      }
    };

    fetchCountries();
  }, []);

  // Select country if user provides location
  useEffect(() => {
    if (userCountry) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].name.common === userCountry) {
          selectRef.current.value = i;
          handleChange(i);
        }
      }
    }
  }, [userCountry, countries, handleChange]);

  // Load with url params
  useEffect(() => {
    if (countries && countryId) {
      for (let i = 0; i < countries.length; i++) {
        if (countries[i].cca3 === countryId) {
          selectRef.current.value = i;
          handleChange(i);
        }
      }
    }
  }, [countryId, countries, handleChange]);

  return (
    <>
      <form className="mb-6 w-full">
        <select
          name="countries"
          id="countries"
          onChange={(e) => handleChange(e.target.value)}
          defaultValue=""
          ref={selectRef}
          className="w-full p-3 bg-transparent border rounded-[4px] focus:border-blue-500"
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
        <div className="w-full border p-4 shadow-md rounded-[4px]">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-4xl ">{countryDetails.name}</h1>
            <img src={countryDetails.flag} alt="flag" className="h-8" />
          </div>
          <div className="flex">
            <div className="flex flex-col w-1/2 gap-2">
              <CountryDetail label="Capital:" data={countryDetails.capital} />
              <CountryDetail label="Currency:" data={countryDetails.currency} />
              <CountryDetail label="Region:" data={countryDetails.region} />
            </div>
            <div className="flex flex-col w-1/2 gap-2">
              <CountryDetail
                label="Continent:"
                data={countryDetails.continent}
              />
              <CountryDetail
                label="Population:"
                data={countryDetails.population}
              />
              <CountryDetail label="Borders:" data={countryDetails.borders} />
            </div>
          </div>
        </div>
      )}

      <ToolTabs
        countries={countries}
        chosenCountryIndex={countryDetails?.index}
      />
    </>
  );
}

export default Countries;
