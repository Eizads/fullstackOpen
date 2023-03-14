import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";
import CountryInfo from "./components/CountryInfo";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) => {
    const searchingFor = country.name.common.toString().toUpperCase();
    return searchingFor.includes(search.toString().toUpperCase());
  });
  console.log("the country searched for is ", filteredCountries);

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
  };

  const searchNumber = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches. Specify another filter </p>;
    } else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
      return filteredCountries.map((country, index) => (
        <Country key={index} country={country} setCountries={setCountries} />
        // <div key={index}>
        //   <p>{country.name.common}</p>
        //   <button
        //     onClick={() => {
        //       setCountries([country]);
        //     }}
        //   >
        //     show
        //   </button>
        // </div>
      ));
    } else if (filteredCountries.length > 0 && filteredCountries.length < 2) {
      return filteredCountries.map((country, index) => (
        <CountryInfo key={index} country={country} />
      ));
    }
  };

  return (
    <div>
      <p>find countries</p>
      <input type="text" value={search} onChange={handleSearch} />
      {searchNumber()}
    </div>
  );
}

export default App;
