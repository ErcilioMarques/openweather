import axios from "axios";
import { useEffect, useState } from "react";
import Variables from "../../Utils/variables";
import WeatherApiServices from "../../Utils/weatherApiServices";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback } from "react";


const containerStyle = {
  width: '80vw',
  height: '50vh'
};

// const center = {
//   lat: -25.9653,
//   lng: 32.5892
// };

const center = {
  lat: -45.421532,
  lng: -72.697189
};

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

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDJJ2Pj5gQm0znu4wc5ltkRe9LnBY45vHQ"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default WeatherMap;
