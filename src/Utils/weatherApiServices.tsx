import axios from "axios";

function getLocation() {
  let coordinates = { lat: 0, lon: 0 };
  let haveLocation = false;

  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position: any) {
    haveLocation = true;

    return { coordinates: position, status: haveLocation };
  }

  return { coordinates: coordinates, status: haveLocation };
}

async function getWeatherByCoordinates() {
  let requestSuccess = 404;
  let response = {};
  let errorMessage = "";
  let coord = {
    lat: 0,
    lon: 0,
  };

  const resultGetLocation = getLocation();
  if (resultGetLocation.status) {
    coord = {
      lat: resultGetLocation.coordinates.lat,
      lon: resultGetLocation.coordinates.lat,
    };

    const params = {
      lat: coord.lat,
      lon: coord.lon,
      units: "metrics",
      appid: process.env.REACT_APP_OPEN_WEATHER_ID,
    };

    const requestResult = await axios
      .get(`${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/weather`, { params })
      .catch((error) => {
        return {
          status: error.status,
          message: error.messagestatus,
          data: error.response.data,
          error: error.response.data.message,
        };
      });

    if (requestResult.status === 200)
      getCityWeatherForecast(requestResult.data.name);
  }
}

async function getCityWeatherForecast(props: { cityQuery: string }) {
  let requestSuccess = 404;
  let response = {};
  let errorMessage = "";

  const params = {
    method: "get",
    q: props.cityQuery,
    units: "metric",
    appid: process.env.REACT_APP_OPEN_WEATHER_ID!,
  };

  const requestResult = await axios(
    `${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/forecast`,
    { params }
  ).catch((error) => {
    return {
      status: requestSuccess,
      data: error.response.data,
      error: error.response.data.message,
    };
  });

  return {
    status: requestResult.status,
    data: requestResult.data,
    error: requestResult.data.message,
  };
}
export default { getLocation, getCityWeatherForecast, getWeatherByCoordinates };
