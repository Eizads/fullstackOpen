const Country = ({ country, setCountries }) => (
  <div>
    <p>{country.name.common}</p>
    <button
      onClick={() => {
        setCountries([country]);
        // setSearch("");
      }}
    >
      show
    </button>
  </div>
);
export default Country;
