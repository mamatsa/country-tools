import Countries from "./components/Countries";
import ToolTabs from "./components/ToolTabs";
import { useEffect, useState } from "react";

function App() {
  const [userCountry, setUserCountry] = useState();

  useEffect(() => {
    // Find country where user is located
    const getUserCountry = async (latitude, longitude) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );
      const data = await response.json();
      setUserCountry(data.results[data.results.length - 1].formatted_address);
    };

    // Get user location latitude and longitude from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getUserCountry(latitude, longitude);
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <div className="flex justify-center p-6">
      <div className="w-full p-6 flex flex-col items-center border max-w-screen-xl">
        <Countries userCountry={userCountry} />
        <ToolTabs />
      </div>
    </div>
  );
}

export default App;
