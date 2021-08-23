import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { ObjectWeather } from "../../Interfaces/WeatherForecastInterface";
import { WeatherContext } from "../../store/weatherStoreContext";

function WeatherDailyCart(props: { weatherList: ObjectWeather[] }) {
  const weatherContext = useContext(WeatherContext);

  const data = {
    labels: props.weatherList.map(
        (item:ObjectWeather) => item.dt_txt.substring(10,item.dt_txt.length))
    ,
    datasets: [
      {
        label: `Weather °${weatherContext.weatherUnits === "metrics" ? "C" : "F"}`,
        data: props.weatherList.map(
            (item:ObjectWeather) => item.main.temp)
        ,
        fill: true,
        backgroundColor:  '#a6a8da',
        borderColor:  '#a6a8da',
      }
    ],
  };

  return (
    <div>
      <Line width={600} height={300} data={data} />
    </div>
  );
}

export default WeatherDailyCart;
