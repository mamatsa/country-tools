import { useEffect } from "react";

function Countries() {
  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,"
      );
      const countries = await response.json();
      return countries;
    };

    console.log(fetchCountries());
  }, []);
  return <div>Hello from a child component!</div>;
}

export default Countries;
