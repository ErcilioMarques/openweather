import { createContext, useState } from "react";
import { CityWeatherInterface, Weather } from "../Interfaces/WeatherCityInterface";

const cityWeatherObject: CityWeatherInterface = {};

interface IMyComponentProps {
  Component: React.ComponentType;
}

export const WeatherContext = createContext({
  weather:cityWeatherObject,
  weatherUnits: '',
  cityQuery: '',
  setWeather: (weather: CityWeatherInterface) => {},
  setWeatherUnitinput: (weatherUnits: string) => {},
  setCityQueryInput: (cityQuery: string) => {},
});

  interface IProps {
    children: {};
  }
  
export function WeatherContextProvider(props: IProps) {
  const [cityWeather, setCityWeather] = useState({});
  const [weatherUnits, setweatherUnits] = useState('metrics');
  const [cityQuery, setcityQuery] = useState('');

  function setWeather(weather: CityWeatherInterface) {
    setCityWeather(weather);
  }
  function setWeatherUnitinput(weatherUnits: string) {
    setweatherUnits(weatherUnits);
  }
  function setCityQueryInput(cityQuery: string) {
    setcityQuery(cityQuery);
  }

  const context = {
    weather: cityWeather,
    weatherUnits: weatherUnits,
    cityQuery: cityQuery,
    setWeather: setWeather,
    setWeatherUnitinput: setWeatherUnitinput,
    setCityQueryInput: setCityQueryInput,
  };

  return (
    <WeatherContext.Provider value={context}>
      {props.children}
    </WeatherContext.Provider>
  );
}

