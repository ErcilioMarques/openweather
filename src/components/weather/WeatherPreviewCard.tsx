import React from "react";
import styled from "styled-components";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";
import { ObjectWeather } from "../../Interfaces/WeatherForecastInterface";
import { WeatherIcon } from "./CurrentWeatherCard";

const WeatherPreviewCard = (props: { weather: ObjectWeather }) => {
  const weatherContext = useContext(WeatherContext);

  return (
    <CardContainer>
      <DataTitle>
        {props.weather
          ? props.weather.main
            ? props.weather.dt_txt.substr(0, 10)
            : ""
          : ""}
      </DataTitle>
      <WeatherIcon
        src={`http://openweathermap.org/img/w/${
          props.weather
            ? props.weather.weather
              ? props.weather.weather[0].icon
              : ""
            : ""
        }.png`}
        alt="wthr img"
      />
      <MinMaxWeatherContainer>
        <span>
          {props.weather
            ? props.weather.main
              ? props.weather.main.temp_max
              : ""
            : ""}
          °{weatherContext.weatherUnits === "metrics" ? "C" : "F"}
        </span>{" "}
        <span>
          {props.weather
            ? props.weather.weather
              ? props.weather.main.temp_min
              : ""
            : ""}
          °{weatherContext.weatherUnits === "metrics" ? "C" : "F"}
        </span>{" "}
      </MinMaxWeatherContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const MinMaxWeatherContainer = styled.div`
  padding: 10px 5px;
  display: flex;
  flex-direction: column;

  span {
    margin: 0 24px;
    color: #999;
    font-weight: 300;
  }
`;

const DataTitle = styled.span`
  margin: 0 24px;
  color: #999;
  font-weight: 300;
`;

export default WeatherPreviewCard;
