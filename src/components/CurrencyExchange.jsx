import { useEffect, useState } from "react";

function CurrencyExchange({ countries, chosenCountryIndex }) {
  const [exchangeTo, setExchangeTo] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [exchangeValue, setExchangeValue] = useState(0);
  const [exchangeFromSymbol, setExchangeFromSymbol] = useState();
  const [exchangeToSymbol, setExchangeToSymbol] = useState();

  useEffect(() => {
    if (countries) {
      // Determine currency exchange will be executed from
      const countryFrom = countries[chosenCountryIndex];
      const exchangeFrom =
        countryFrom?.currencies && Object.keys(countryFrom.currencies)[0];

      // Get exchange rate from API call
      const fetchExchangeRate = async () => {
        if (exchangeFrom) {
          const response = await fetch(
            `https://api.exchangerate.host/convert?from=${exchangeFrom}&to=${
              exchangeTo?.currency || exchangeFrom
            }`
          );
          const data = await response.json();
          console.log(data);
          setExchangeRate(data.result);
        }
      };

      fetchExchangeRate();
    }
  }, [countries, chosenCountryIndex, exchangeTo]);

  useEffect(() => {
    // Set currency symbol of exchange pair
    if (countries) {
      const countryFrom = countries[chosenCountryIndex];
      const exchangeFromSymbol =
        countryFrom?.currencies &&
        Object.values(countryFrom.currencies)[0].symbol;
      setExchangeFromSymbol(exchangeFromSymbol);
      setExchangeToSymbol(exchangeFromSymbol);
    }
  }, [countries, chosenCountryIndex]);

  // Handle country change
  const handleChange = (e) => {
    const chosenCountry = countries[e.target.value];
    setExchangeTo({
      currency:
        chosenCountry.currencies && Object.keys(chosenCountry.currencies)[0],
      symbol:
        chosenCountry.currencies &&
        Object.values(chosenCountry.currencies)[0].symbol,
    });
    setExchangeToSymbol(Object.values(chosenCountry.currencies)[0].symbol);
  };

  return (
    <div>
      <h2>Currency Exchange</h2>
      <form className="mb-6 w-full" key={chosenCountryIndex}>
        <select
          name="countries"
          id="countries"
          onChange={handleChange}
          defaultValue={chosenCountryIndex || ""}
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
      <div className="flex w-full gap-4 items-center">
        <div className="w-full relative">
          <span className="absolute text-gray-400">{exchangeFromSymbol}</span>
          <input
            type="number"
            className="w-full border-b border-black outline-none pl-5 focus:border-blue-500"
            defaultValue={0}
            onChange={(e) => setExchangeValue(e.target.value)}
          />
        </div>
        <span className="text-2xl">=</span>
        <div className="w-full relative">
          <span className="absolute text-gray-400">{exchangeToSymbol}</span>
          <input
            type="number"
            disabled
            value={exchangeValue * exchangeRate}
            className="w-full border-b border-dotted border-gray-400 outline-none pl-5 text-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default CurrencyExchange;
