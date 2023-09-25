import { useEffect, useState } from "react";

function Airports({ countryCode }) {
  const [airports, setAirports] = useState();
  useEffect(() => {
    const fetchAirports = async () => {
      if (countryCode) {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/airports?country=${countryCode}`,
          {
            method: "GET",
            headers: { "X-Api-Key": import.meta.env.VITE_APININJAS_API_KEY },
            contentType: "application/json",
          }
        );
        const data = await response.json();
        console.log(data);
        setAirports(data);
      }
    };
    fetchAirports();
  }, [countryCode]);
  return (
    <div>
      <h2>Airports</h2>
      <ul>
        {airports &&
          airports.map((airport, index) => {
            return (
              <li
                key={index}
              >{`${airport.icao} - ${airport.name} (${airport.city})`}</li>
            );
          })}
      </ul>
    </div>
  );
}

export default Airports;
