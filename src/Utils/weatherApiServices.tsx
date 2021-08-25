import axios from "axios";

function getLocation() {
  let coordinates = { lat: 0, lon: 0 };
  let haveLocation = false;

  navigator.geolocation.watchPosition((success) => {
    haveLocation = true;
    coordinates = {
      lat: success.coords.latitude,
      lon: success.coords.longitude,
    };
  });

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
  if(resultGetLocation.status){
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

  const teste = await axios
  .get(`${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/weather`, { params });

  
  if(teste.status === 200){
    return { status: teste.status, data: teste.data.list, error: teste.data.message }

  }else{
    return { status: teste.status, data: response, error: teste.data.message }

  }


  axios
    .get(`${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/weather`, { params })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log(data);
      requestSuccess = 200;
      response = data;
      return { status: requestSuccess, data: response, error: errorMessage }
    })
    .catch(function (error) {
      if (error.response) {
        errorMessage = error.response.data.message;
        console.log(error.response.data.message);
      } else {
        errorMessage = "unknown error";
      }
      return { status: requestSuccess, data: response, error: errorMessage }
    });

  return { status: requestSuccess, data: response, error: errorMessage };
}else {
  return { status: 404, data: response, error: "No coordinates found" };
}
}

async function  getCityWeatherForecast(props: { cityQuery: string }) {  let requestSuccess = 404;
  let response = {};
  let errorMessage = "";

  const params = {
    method:'get',
    q: props.cityQuery,
    units: "metric",
    appid: process.env.REACT_APP_OPEN_WEATHER_ID!,
  };

  const teste = await axios(`${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/forecast`, { params });

  if(teste.status === 200){
    return { status: teste.status, data: teste.data, error: teste.data.message }

  }else{
    return { status: teste.status, data: response, error: teste.data.message }

  }
  axios
    .get(`${process.env.REACT_APP_OPEN_WEATHER_API_URL!}/forecast`, {
      params,
    })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      console.log(data);
      requestSuccess = 200;
      response = data;
      return { status: requestSuccess, data: response, error: errorMessage }
    })
    .catch(function (error) {
      if (error.response) {
        errorMessage = error.response.data.message;
        console.log(error.response.data.message);
      } else {
        errorMessage = "unknown error";
      } return { status: requestSuccess, data: response, error: errorMessage }
      
    });

}
export default { getLocation, getCityWeatherForecast, getWeatherByCoordinates };
