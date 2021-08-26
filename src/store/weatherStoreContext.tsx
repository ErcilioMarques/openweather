import { createContext, useState } from "react";
import { CityWeatherInterface } from "../Interfaces/WeatherCityInterface";
import {
  WeatherForecastInterface,
  City,
} from "../Interfaces/WeatherForecastInterface";

const cityWeatherObject: CityWeatherInterface = {};
const cityWeatherObjectFOrecast: WeatherForecastInterface = {};
const city: City = {};


export const WeatherContext = createContext({
  weather: cityWeatherObject,
  weatherForecast: cityWeatherObjectFOrecast,
  weatherUnits: "",
  cityQuery: "",
  errorMessageQuerying: "",
  city: city,
  setWeather: (weather: CityWeatherInterface) => {},
  setWeatherForecast: (weatherForecast: WeatherForecastInterface) => {},
  setWeatherUnitinput: (weatherUnits: string) => {},
  setCityQueryInput: (cityQuery: string) => {},
  setCity: (city: City) => {},
  setErrorMessageQuerying: (errorMessage: string) => {},
});

interface IProps {
  children: {};
}

export function WeatherContextProvider(props: IProps) {
  const [cityWeather, setCityWeather] = useState({});
  const [cityWeatherForecast, setcityWeatherForecast] = useState({});
  const [weatherUnits, setweatherUnits] = useState("metrics");
  const [cityQuery, setcityQuery] = useState("");
  const [city, setCityVal] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  function setErrorMessageQuerying(error: string) {
    setErrorMessage(error);
  }

  function setWeather(weather: CityWeatherInterface) {
    setCityWeather(weather);
  }
  function setWeatherForecast(weatherForecast: WeatherForecastInterface) {
    setcityWeatherForecast(weatherForecast);
  }
  function setWeatherUnitinput(weatherUnits: string) {
    setweatherUnits(weatherUnits);
  }
  function setCityQueryInput(cityQuery: string) {
    setcityQuery(cityQuery);
  }
  function setCity(city: City) {
    setCityVal(city);
  }

  const context = {
    weather: cityWeather,
    weatherForecast: cityWeatherForecast,
    weatherUnits: weatherUnits,
    cityQuery: cityQuery,
    errorMessageQuerying: errorMessage,
    city: city,
    setWeatherForecast: setWeatherForecast,
    setWeather: setWeather,
    setWeatherUnitinput: setWeatherUnitinput,
    setCityQueryInput: setCityQueryInput,
    setCity: setCity,
    setErrorMessageQuerying: setErrorMessageQuerying,
  };

  return (
    <WeatherContext.Provider value={context}>
      {props.children}
    </WeatherContext.Provider>
  );
}
