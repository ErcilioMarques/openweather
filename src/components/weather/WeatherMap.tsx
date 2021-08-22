import axios from "axios";
import { useEffect, useState } from "react";
import Variables from "../../Utils/variables";
import WeatherApiServices from "../../Utils/weatherApiServices";

function WeatherMap() {
  const [units, setUnits] = useState("metrics");
  const [coord, setCoord] = useState({ lat: 0, lon: 0 });
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const coordinates = WeatherApiServices.getLocation();
  // setCoord({lat: coordinates.lat, lon: coordinates.lon});

  // const params = {
  //   lat: coord.lat,
  //   lon: coord.lon,
  //   units: 'metrics',
  //   appid: Variables.APP_ID,
  // };

  // useEffect(() => {
  //   axios
  //     .get(Variables.API_URL, { params })
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setWeather(data);
  //       setIsLoading(false);
  //     });
  // }, []);

  return (
    <div>
      <div></div>
    </div>
  );
}

export default WeatherMap;
