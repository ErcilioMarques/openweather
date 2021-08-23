import { useContext } from "react";
import { WeatherContext } from "../store/weatherStoreContext";

export function WeatherConversions(weather: number) {
  let count = 0;
  const weatherContext = useContext(WeatherContext);

  if (weatherContext.weatherUnits === "imperial") {
    count++;
    return Math.round((5 / 9) * (weather - 32));
  } else if (count > 0) return (weather * 9) / 5 + 32;
  else return Math.round(weather);
}
