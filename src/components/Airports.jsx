import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Airports() {
  const { countryCode, cacheAirports, AIRPORT_CACHE } = useOutletContext();
  const [airports, setAirports] = useState();
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    const fetchAirports = async () => {
      if (searchPhrase || (countryCode && !AIRPORT_CACHE[countryCode])) {
        // Fetch airports
        const response = await fetch(
          `https://api.api-ninjas.com/v1/airports?country=${countryCode}&name=${searchPhrase}`,
          {
            method: "GET",
            headers: { "X-Api-Key": import.meta.env.VITE_APININJAS_API_KEY },
            contentType: "application/json",
          }
        );
        const data = await response.json();

        // Cache data if user is not searching
        if (!searchPhrase) {
          cacheAirports(countryCode, data);
        }

        setAirports(data);
      }
    };

    // Delay request if user is typing search phrase
    // Otherwise If country is chached take data from it
    // Or fetch data for the first time
    if (searchPhrase) {
      const typeTimeout = setTimeout(fetchAirports, 500);
      return () => clearTimeout(typeTimeout);
    } else if (AIRPORT_CACHE[countryCode]) {
      setAirports(AIRPORT_CACHE[countryCode]);
    } else {
      fetchAirports();
    }
  }, [countryCode, searchPhrase, AIRPORT_CACHE, cacheAirports]);

  return (
    <div className="border shadow-md rounded-[4px] mt-5 px-3 py-5 flex flex-col gap-5">
      <h2 className="text-3xl">Airports</h2>
      {airports && (
        <input
          type="text"
          value={searchPhrase}
          placeholder="Search for airport"
          onChange={(e) => setSearchPhrase(e.target.value)}
          className="border-b focus:border-b-blue-500 outline-none w-min py-1"
        />
      )}
      <ul className="w-full flex flex-wrap gap-y-3">
        {airports &&
          airports.map((airport, index) => {
            return (
              airport.iata && (
                <li
                  key={index}
                  className="w-1/2"
                >{`${airport.iata} - ${airport.name} (${airport.city})`}</li>
              )
            );
          })}
      </ul>
    </div>
  );
}

export default Airports;
