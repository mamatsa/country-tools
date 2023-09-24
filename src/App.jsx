import Countries from "./components/Countries";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      });
    } else {
      console.log("Geolocation not supported");
    }
  }, []);

  return (
    <div className="flex justify-center p-6">
      <Countries />
    </div>
  );
}

export default App;
