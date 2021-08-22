import React from "react";
import styled from "styled-components";
import classes from "./CurrentWeatherCard.module.css";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";

function CurrentWeatherCard() {
  const weatherContext = useContext(WeatherContext);
  console.log("weatherContext");

  // Function to convert mph to kmph
  function mphTOkmph(mph: number) {
    return 1.60934 * mph;
  }

  return (
    <CardContainer>
      <CityNameTitle>{weatherContext.weather.name}</CityNameTitle>
      <WeatherDescriptionTitle>
        {weatherContext.weather
          ? weatherContext.weather.weather
            ? weatherContext.weather.weather[0].main
            : ""
          : ""}
        <span>
          Wind{" "}
          {weatherContext.weather
            ? weatherContext.weather.wind
              ? Math.round(mphTOkmph(weatherContext.weather.wind.speed))
              : ""
            : ""}
          <span>km/h</span> <span>•</span> Humidity{" "}
          {weatherContext.weather
            ? weatherContext.weather.weather
              ? weatherContext.weather.main?.humidity
              : ""
            : ""}
          %
        </span>
      </WeatherDescriptionTitle>
      <CardWeather>
        <WeatherIcon
          src={`http://openweathermap.org/img/w/${
            weatherContext.weather
              ? weatherContext.weather.weather
                ? weatherContext.weather.weather[0].icon
                : ""
              : ""
          }.png`}
          alt="wthr img"
        />

        <WeatherTitle>
          {weatherContext.weather
            ? weatherContext.weather.weather
              ? weatherContext.weather.main
                ? Math.round(weatherContext.weather.main.temp)
                : ""
              : ""
            : ""}
          °
        </WeatherTitle>
      </CardWeather>
      <TableForecastWeather>
        <tbody>
          <tr>
            <td>TUE</td>
            <td>WED</td>
            <td>THU</td>
            <td>FRI</td>
            <td>SAT</td>
          </tr>
          <tr>
            <td>30°</td>
            <td>34°</td>
            <td>36°</td>
            <td>34°</td>
            <td>37°</td>
          </tr>
          <tr>
            <td>17°</td>
            <td>22°</td>
            <td>19°</td>
            <td>23°</td>
            <td>19°</td>
          </tr>
        </tbody>
      </TableForecastWeather>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
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
  width: 30%;
  justify-content: space-between;
  align-items: center;
`;

const WeatherIcon = styled.img`
  padding: 10px 5px;
  position: relative;
  align-self: flex-start;
  margin-bottom: 20px;
  width: 120px;
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

export default CurrentWeatherCard;
