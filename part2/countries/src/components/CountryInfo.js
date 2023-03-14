import { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState();

  const city = country.capital[0];
  const api_key = process.env.REACT_APP_API_KEY;
  const values = Object.values(country.languages);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
  }, [api_key, city]);

  if (weather) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {values.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags["png"]} alt="flag" />
        <h2>Weather in {country.capital}</h2>
        <p>temprature {weather.main.temp} celcius</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt="current weather"
        />
        <p>wind {weather.wind.speed} m/s.</p>
      </div>
    );
  }
};

export default CountryInfo;
