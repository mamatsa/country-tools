import { useEffect, useState } from "react";

function Airports({ countryCode }) {
  const [airports, setAirports] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");
  useEffect(() => {
    const fetchAirports = async () => {
      if (countryCode) {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/airports?country=${countryCode}&name=${searchPhrase}`,
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
    if (searchPhrase) {
      const typeTimeout = setTimeout(fetchAirports, 1500);
      return () => clearTimeout(typeTimeout);
    } else {
      fetchAirports();
    }
    fetchAirports();
  }, [countryCode, searchPhrase]);

  return (
    <div>
      <h2>Airports</h2>
      {airports && (
        <input
          type="text"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
      )}
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
