import { useContext, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useCallback } from "react";
import styled from "styled-components";
import { NoDataLabel } from "./WeatherCard";
import WeatherPreviewCard from "./WeatherPreviewCard";
import { WeatherContext } from "../../store/weatherStoreContext";
import { weatherMapType } from "./WeatherMapType";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const optionsDefaults = {
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControlOptions: {
    mapTypeIds: ["weatherMapType"],
  },
  extraMapTypes: [weatherMapType({})],
};

function WeatherMap() {
  const [options, setOptions] = useState(optionsDefaults);
  const [clicked, setClicked] = useState(false);

  const [markerMap] = useState([]);


  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY!,
    libraries: ["places"],
  });

  const [, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const [center, setCenter] = useState({ lat: -25.9653, lng: 32.5892 });
  const [cityWeather, setcityWeather] = useState({});
  const weatherContext = useContext(WeatherContext);

  useEffect(() => {
    setcityWeather(weatherContext!.weatherForecast!.list![0]);
    let optionsDefaults = {
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControlOptions: {
        mapTypeIds: ["weatherMapType"],
      },
      extraMapTypes: [
        weatherMapType({
          layer: "temp_new",
          zoomLevel: 3,
          XtileCoord: weatherContext.city.coord?.lat,
          yTileCoord: weatherContext.city.coord?.lon,
        }),
      ],
    };
    setOptions(optionsDefaults);

    setCenter({
      lat: weatherContext!.weatherForecast!.city!.coord!.lat,
      lng: weatherContext.weatherForecast!.city!.coord!.lon,
    });
  }, [weatherContext!.weatherForecast!.city!.coord!]);

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
            title={"click to check the weather"}
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
