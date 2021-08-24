function getLocation() {
  let coordinates = {lat:0,lon:0};

    navigator.geolocation.watchPosition((success) => {
      coordinates={ lat: success.coords.latitude, lon: success.coords.longitude };
    });

    return coordinates;
  }

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
  export default {getLocation};