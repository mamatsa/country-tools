import { useEffect, useState } from "react";

function CurrencyExchange({ countries, from }) {
  const [exchangeTo, setExchangeTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (from) {
        const response = await fetch(
          `https://api.exchangerate.host/convert?from=${from}&to=${
            exchangeTo || from
          }`
        );
        const data = await response.json();
        setExchangeRate(data.result);
      }
    };

    fetchExchangeRate();
  }, [from, exchangeTo]);

  // Handle country change
  const handleChange = (e) => {
    const chosenCountry = countries[e.target.value];
    setExchangeTo(
      chosenCountry.currencies && Object.keys(chosenCountry.currencies)[0]
    );
  };

  return (
    <div>
      <h2>Currency Exchange</h2>
      <form className="mb-6 w-full">
        <select
          name="countries"
          id="countries"
          onChange={handleChange}
          defaultValue=""
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
      <p>Exchange rate: {exchangeRate}</p>
    </div>
  );
}

export default CurrencyExchange;
