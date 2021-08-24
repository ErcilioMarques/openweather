import { useContext } from "react";
import { WeatherContext } from "../store/weatherStoreContext";

export function WeatherConversions(weather: number) {
  let count = 0;
  const weatherContext = useContext(WeatherContext);

  if (weatherContext.weatherUnits === "imperial") {
    count++;
    return Math.round((1.8 * weather) + 32);
  } else if (count > 0) return (weather -32)*0.5556;
  else return Math.round(weather);
}
