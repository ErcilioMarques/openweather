import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Variables from "../../Utils/variables";
import WeatherApiServices from "../../Utils/weatherApiServices";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  useGoogleMap,
} from "@react-google-maps/api";
import { useCallback } from "react";
import styled from "styled-components";
import { NoDataLabel } from "./WeatherCard";
import WeatherPreviewCard from "./WeatherPreviewCard";
import { WeatherContext } from "../../store/weatherStoreContext";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -25.9653,
  lng: 32.5892,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ["places"];

function WeatherMap() {
  const [units, setUnits] = useState("metrics");
  const [coord, setCoord] = useState({ lat: -25.9653, lng: 32.5892 });
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [clicked, setClicked] = useState(false);
  
  const [markerMap, setMarkerMap] = useState([]);

  const markerLoadHandler = (
    marker: Marker,
    place: {
      id: string;
      pos: {
        lat: number;
        lng: number;
      };
    }
  ) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, marker };
    });
  };

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);


  const [center, setCenter] = useState({ lat: -25.9653, lng: 32.5892 });
    const [cityWeather, setcityWeather] = useState({
      dt: 1629817200,
      main: {
        temp: 26.5,
        feels_like: 26.5,
        temp_min: 26.5,
        temp_max: 30.6,
        pressure: 1017,
        sea_level: 1017,
        grnd_level: 930,
        humidity: 37,
        temp_kf: -4.1,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      clouds: {
        all: 0,
      },
      wind: {
        speed: 1.31,
        deg: 326,
        gust: 2.14,
      },
      visibility: 10000,
      pop: 0,
      sys: {
        pod: "d",
      },
      dt_txt: "2021-08-24 15:00:00",
    });
    const weatherContext = useContext(WeatherContext);

    useEffect(() => {
      setcityWeather(weatherContext!.weatherForecast!.list![0]);
 
     let co = {
       lat: weatherContext!.weatherForecast!.city!.coord!.lat,
       lng: weatherContext.weatherForecast.city?.coord?.lon,
     };
     setCenter({
       lat: weatherContext!.weatherForecast!.city!.coord!.lat,
       lng: weatherContext.weatherForecast!.city!.coord!.lon,
     });
   },[weatherContext!.weatherForecast!.city!.coord!]);








   if (!isLoaded) return <NoDataLabel>Loading Maps...</NoDataLabel>;
   if (loadError)
     return (
       <NoDataLabel>Oops, there is something wrong with location...</NoDataLabel>
     );
  if (isLoaded)
    return (
      <CardContainer>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={0}
          onLoad={onLoad}
          onUnmount={onUnmount}
          center={center}
          options={options}
        >
          
          <Marker
            key={markerMap.length}
            title={"Test"}
            position={center}
            onClick={() => setClicked(!clicked)}
          />

          {clicked ? (
            <InfoWindow position={center}>
              <WeatherPreviewCard weather={cityWeather}></WeatherPreviewCard>
            </InfoWindow>

          ) : null}
        </GoogleMap>
      </CardContainer>
    );

  return <div>Loading...</div>;
}

export const CardContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  width: 30vw;
  height: 70vh;
  flex-direction: column;
  background-color: #d2d3e8;
  border-radius: 6px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 1075px) {
    width: 95%;
  }
`;

export default WeatherMap;
