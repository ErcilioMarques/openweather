import React from "react";
import styled from "styled-components";
import classes from "./CurrentWeatherCard.module.css";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";
import { CityWeatherInterface } from "../../Interfaces/WeatherCityInterface";
import { ObjectWeather } from "../../Interfaces/WeatherForecastInterface";

function CurrentWeatherCard(props: { weather: ObjectWeather }) {
  const weatherContext = useContext(WeatherContext);

  // Function to convert mph to kmph
  function mphTOkmph(mph: number) {
    return 1.60934 * mph;
  }

  return (
    <CardContainer>
      <CityNameTitle>
        {weatherContext.city.name}
        {","}
        <Country>{weatherContext.city.country}</Country>
      </CityNameTitle>
      <WeatherDescriptionTitle>
        <span>
          {props.weather
            ? props.weather.weather
              ? props.weather.weather[0].description
              : ""
            : ""}
        </span>
        <span>
          Wind{" "}
          {props.weather
            ? props.weather.wind
              ? Math.round(mphTOkmph(props.weather.wind.speed))
              : ""
            : ""}
          <span>km/h</span> <span>•</span> Humidity{" "}
          {props.weather
            ? props.weather.weather
              ? props.weather.main?.humidity
              : ""
            : ""}
          %
        </span>
      </WeatherDescriptionTitle>
      <CardWeather>
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

        <WeatherTitle>
          {props.weather
            ? props.weather.weather
              ? props.weather.main
                ? Math.round(props.weather.main.temp)
                : ""
              : ""
            : ""}
          °{weatherContext.weatherUnits==='metrics'?'C':'F'}
        </WeatherTitle>
      </CardWeather>
      <ForecastTitle>Forecast</ForecastTitle>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 10px 5px 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TableForecastWeather = styled.table`
  position: relative;
  top: 10px;
  width: 100%;
  text-align: center;
`;

const CardWeather = styled.div`
  display: flex;
  flex-direction: row;
  width: 20%;
  justify-content: space-between;
  align-items: center;
`;

export const WeatherIcon = styled.img`
  padding: 10px 5px;
  position: relative;
  align-self: flex-start;
  margin-bottom: 20px;
  width: 100px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;
`;

const CityNameTitle = styled.h2`
  position: relative;
  font-weight: 300;
  font-size: 2.25em;
  color: #7b7fda;

  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1);
`;

const WeatherDescriptionTitle = styled.h3`
  position: relative;
  padding: 10px 0px;
  float: left;
  margin-right: 33px;
  color: #777;
  font-weight: 400;
  font-size: 1em;
  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.1s;

  span {
    margin: 0 24px;
    color: #999;
    font-weight: 300;
  }

  span span {
    margin-left: 0;
    font-size: 0.9em;
  }
`;

const WeatherTitle = styled.h1`
  position: relative;
  color: #666;
  font-weight: 300;
  font-size: 6.59375em;
  line-height: 0.2em;
  color: #a6a8da;


  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;
`;

const ForecastTitle = styled.span`
  position: relative;
  color: #666;
  font-weight: lighter;
  font-size: 1.5rem;
  line-height: 0.2em;
  color: #a6a8da;
  margin-top:30px;

  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;
`;

const Country = styled.span`
  font-weight: 800;
  font-size: 0.6em;
  margin-left: 10px;
`;

export default CurrentWeatherCard;
