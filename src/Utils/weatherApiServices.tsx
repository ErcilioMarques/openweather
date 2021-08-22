function getLocation() {
  let coordinates = {lat:0,lon:0};

    navigator.geolocation.watchPosition((success) => {
      coordinates={ lat: success.coords.latitude, lon: success.coords.longitude };
    });

    return coordinates;
  }

  export default {getLocation};