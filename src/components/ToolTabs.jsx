import { Outlet, NavLink } from "react-router-dom";

const AIRPORT_CACHE = {};

function ToolTabs({ countries, chosenCountryIndex }) {
  // Saves fetched data to avoid repetetive API calls
  const cacheAirports = (countryCode, data) => {
    AIRPORT_CACHE[countryCode] = data;
  };

  return (
    <div className="self-start w-full mt-8 ">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="mr-2">
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              `inline-block p-4 rounded-t-lg ${
                isActive
                  ? "active text-blue-600 bg-gray-100"
                  : "hover:text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            Currency Exchange
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink
            to="airports"
            end
            className={({ isActive }) =>
              `inline-block p-4 rounded-t-lg ${
                isActive
                  ? "active text-blue-600 bg-gray-100"
                  : "hover:text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            Airports
          </NavLink>
        </li>
      </ul>

      <Outlet
        context={{
          countries,
          chosenCountryIndex,
          countryCode: countries && countries[chosenCountryIndex]?.cca2,
          cacheAirports,
          AIRPORT_CACHE,
        }}
      />
    </div>
  );
}

export default ToolTabs;
