import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Airports() {
  const { countryCode } = useOutletContext();
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
