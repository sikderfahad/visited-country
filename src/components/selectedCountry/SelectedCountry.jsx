import PropTypes from "prop-types";
const SelectedCountry = ({ country }) => {
  return (
    <div className="p-2 rounded-lg flex flex-col border border-gray-500 w-[200px] h-[130px] ">
      <img
        className="w-full h-[100px] rounded-lg"
        src={country?.flags?.png}
        alt={country?.name?.common + " image"}
      />
      <p className="text-sm mt-auto font-bold text-green-600 animate-pulse">
        {country?.name?.common}
      </p>
    </div>
  );
};

SelectedCountry.propTypes = {
  country: PropTypes.shape({
    flags: PropTypes.shape({
      png: PropTypes.string.isRequired,
    }),
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }),
  }),
};

export default SelectedCountry;
