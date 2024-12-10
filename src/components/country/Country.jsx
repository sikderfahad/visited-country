import PropTypes from "prop-types";

const Country = ({ country, handledVisited, visitedCountries }) => {
  const { flags, name, area, population } = country;
  const isVisited = visitedCountries.includes(country?.cca2);

  return (
    <div className="card flex-grow bg-gray-900 shadow-xl">
      <figure className="h-[200px]">
        <img
          src={flags?.png}
          className="w-full h-full"
          alt={name?.common + " image"}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name?.common}</h2>
        <div className="others">
          <p>
            <span className="font-medium">Population: </span>
            {population}
          </p>
          <p>
            <span className="font-medium">Area: </span>
            {area}
          </p>
          <p>
            <span className="font-medium">Capital: </span>
            {country?.capital &&
              country.capital.map((city, idx) =>
                country.capital.length < 2 ? (
                  <span className="ml-2" key={idx}>
                    {city}
                  </span>
                ) : (
                  <li key={idx}>{city}</li>
                )
              )}
          </p>
        </div>
      </div>
      <div className="card-actions mt-auto justify-end">
        <button
          onClick={() => {
            handledVisited(country?.cca2, isVisited);
          }}
          className={`btn text-white ${
            isVisited ? "btn-warning" : "btn-primary"
          } `}
        >
          {isVisited ? "Remove" : "Visit Now"}
        </button>
      </div>
    </div>
  );
};

Country.propTypes = {
  country: PropTypes.shape({
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired,
    }),
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }),
    area: PropTypes.number.isRequired,
    capital: PropTypes.array,
    population: PropTypes.number,
    cca2: PropTypes.string.isRequired,
  }),

  handledVisited: PropTypes.func.isRequired,
  visitedCountries: PropTypes.array.isRequired,
};

export default Country;
