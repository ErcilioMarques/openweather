import { createContext, useState } from "react";
import { CityWeatherInterface } from "../Interfaces/WeatherCityInterface";
import {
  WeatherForecastInterface,
  City,
} from "../Interfaces/WeatherForecastInterface";

const cityWeatherObject: CityWeatherInterface = {};
const cityWeatherObjectFOrecast: WeatherForecastInterface = {};
const city: City = {};

interface IMyComponentProps {
  Component: React.ComponentType;
}

export const WeatherContext = createContext({
  weather: cityWeatherObject,
  weatherForecast: cityWeatherObjectFOrecast,
  weatherUnits: "",
  cityQuery: "",
  city: city,
  setWeather: (weather: CityWeatherInterface) => {},
  setWeatherForecast: (weatherForecast: WeatherForecastInterface) => {},
  setWeatherUnitinput: (weatherUnits: string) => {},
  setCityQueryInput: (cityQuery: string) => {},
  setCity: (city: City) => {},
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
    city: city,
    setWeatherForecast: setWeatherForecast,
    setWeather: setWeather,
    setWeatherUnitinput: setWeatherUnitinput,
    setCityQueryInput: setCityQueryInput,
    setCity: setCity,
  };

  return (
    <WeatherContext.Provider value={context}>
      {props.children}
    </WeatherContext.Provider>
  );
}
