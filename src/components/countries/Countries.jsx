// import { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import useLoadCountries from "../../hooks/useLoadCountries";
import Country from "../country/Country";
import SelectedCountry from "../selectedCountry/SelectedCountry";
import { getDataFromLS, saveDataToLs } from "../../utils/utils";

const Countries = () => {
  const { countries, visibleCountries } = useLoadCountries();
  const [visitedCountries, setVisitedCountries] = useState(() =>
    getDataFromLS()
  );
  const [displayVisitedCountry, setDisplayVisitedCountry] = useState([]);

  useEffect(() => {
    setDisplayVisitedCountry(
      countries.filter((country) => visitedCountries.includes(country.cca2))
    );
  }, [countries, visitedCountries]);

  const handledVisited = (id, isRemove) => {
    const updatedVisited = saveDataToLs(id, isRemove);
    setVisitedCountries(updatedVisited);
  };

  return (
    <div className="relative">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-500 my-5">
          Lets Explore The World!
        </h1>
        <p className="mt-2">Total Countries: {countries.length}</p>
      </div>
      <div className="mt-2 sticky top-0 left-0 p-2 text-center z-50 bg-[#1d232a]">
        <p>Displayed: {visibleCountries.length}</p>
      </div>

      <div className="visited-country w-11/12 mx-auto">
        {displayVisitedCountry.length > 0 && (
          <h1 className="text-xl font-medium animate-bounce my-5">
            Visited Countries____
          </h1>
        )}

        <div className="flex flex-wrap gap-5">
          {displayVisitedCountry.map((country) => (
            <SelectedCountry country={country} key={country.cca2} />
          ))}
        </div>
      </div>

      {displayVisitedCountry.length > 0 && (
        <hr className="border w-11/12 mx-auto border-gray-500 mt-10" />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 mx-auto mt-10">
        {visibleCountries.map((country) => (
          <Country
            country={country}
            handledVisited={handledVisited}
            visitedCountries={visitedCountries}
            key={country?.cca2}
          />
        ))}
      </div>
    </div>
  );
};

export default Countries;
