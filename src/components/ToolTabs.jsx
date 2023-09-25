import { useState } from "react";
import CurrencyExchange from "./CurrencyExchange";
import Airports from "./Airports";

function ToolTabs({ countries, chosenCountryIndex }) {
  const [openTab, setOpenTab] = useState(0);
  return (
    <div className="self-start w-full mt-8 ">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <li className="mr-2">
          <a
            href="#"
            className={`inline-block p-4 rounded-t-lg ${
              openTab
                ? "hover:text-gray-600 hover:bg-gray-50"
                : "active text-blue-600 bg-gray-100"
            }`}
            onClick={() => setOpenTab(!openTab)}
          >
            Currency Exchange
          </a>
        </li>
        <li className="mr-2">
          <a
            href="#"
            className={`inline-block p-4 rounded-t-lg ${
              openTab
                ? "active text-blue-600 bg-gray-100"
                : "hover:text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setOpenTab(!openTab)}
          >
            Airports
          </a>
        </li>
      </ul>
      {openTab ? (
        <Airports
          countryCode={countries && countries[chosenCountryIndex]?.cca2}
        />
      ) : (
        <CurrencyExchange
          countries={countries}
          chosenCountryIndex={chosenCountryIndex}
        />
      )}
    </div>
  );
}

export default ToolTabs;
