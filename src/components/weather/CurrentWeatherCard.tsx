import React from "react";
import styled from "styled-components";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";
import { ObjectWeather } from "../../Interfaces/WeatherForecastInterface";
import WeatherDailyChart from "./WeatherDailyChart";
import { WeatherConversions } from "../../Utils/WeatherConversions";

function CurrentWeatherCard(props: { weather: ObjectWeather }) {
  const weatherContext = useContext(WeatherContext);

  // Function to convert mph to kmph
  function mphTOkmph(mph: number) {
    return 1.60934 * mph;
  }
  function setUnits(unit: string) {
    console.log(unit);
    weatherContext.setWeatherUnitinput(unit);
  }
  let arrayAux = weatherContext.weatherForecast.list;

  if (arrayAux !== null)
    arrayAux = arrayAux!.filter(
      (item) =>
        props!.weather!.dt_txt!.substring(0, 10) === item!.dt_txt!.substring(0, 10)
    );

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
          Wind{" : "}
          {props.weather
            ? props.weather.wind
              ? Math.round(mphTOkmph(props.weather.wind.speed))
              : ""
            : ""}
          <span>km/h</span> Humidity{" : "}
          {props.weather
            ? props.weather.weather
              ? props.weather.main?.humidity
              : ""
            : ""}
          %
        </span>

        <UnitsContainer>
          Unit{" : "}
          <a
            id={"metrics"}
            onClick={() => setUnits("metrics")}
            style={{
              color:
                weatherContext.weatherUnits === "metrics"
                  ? "#7b7fda"
                  : "#242323ae",
              fontWeight:
                weatherContext.weatherUnits === "metrics" ? 900 : "lighter",
            }}
          >
            C
          </a>
          {"|"}
          <a
            id={"imperial"}
            onClick={() => setUnits("imperial")}
            style={{
              color:
                weatherContext.weatherUnits === "imperial"
                  ? "#7b7fda"
                  : "#242323ae",
              fontWeight:
                weatherContext.weatherUnits === "imperial" ? 900 : "lighter",
            }}
          >
            F
          </a>
        </UnitsContainer>
      </WeatherDescriptionTitle>

      <CardWeatherDay>
        <CardWeather>
          <WeatherIcon
            src={`../../assets/icons/${
              props.weather
                ? props.weather.weather
                  ? props.weather.weather[0].icon
                  : ""
                : ""
            }.svg`}
            alt="wthr img"
          />
          <WeatherTitle>
            {props.weather
              ? props.weather.weather
                ? props.weather.main
                  ? WeatherConversions(props.weather.main.temp)
                  : ""
                : ""
              : ""}
            ??{weatherContext.weatherUnits === "metrics" ? "C" : "F"}
          </WeatherTitle>
        </CardWeather>
        <WeatherDailyChart weatherList={arrayAux}></WeatherDailyChart>
      </CardWeatherDay>
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

const CardWeather = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 900px) {
    width: 89vw;
    align-items: center;
  
  }
  
`;
const UnitsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 1em;
  margin: 0 20px;
  color: #999;
  font-weight: 300;

  a {
    display: inline-block;
    cursor: pointer;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    background-color: #fff;
    text-align: center;
    transition: all 0.2s;
    margin: 0 10px;
    color: #242323ae;
    font-weight: 300;
    border-width: 0;

    transition: all 0.2s linear;
  }
`;

const CardWeatherDay = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: left;

  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
  }
`;


export const WeatherIcon = styled.img`
  padding: 10px 5px;
  position: relative;
  margin-bottom: 20px;
  width: 100px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;

  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;
  @media screen and (max-width: 900px) {
    align-self: center;
  }
  
`;

const CityNameTitle = styled.h2`
  position: relative;
  font-weight: 300;
  font-size: 2.25em;
  color: #7b7fda;

  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1);
`;

 export const WeatherDescriptionTitle = styled.div`
  position: relative;
  display: flex;
  padding: 10px 0px;
  float: left;
  margin-right: 33px;
  color: #777;
  font-weight: 400;
  font-size: 1em;
  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.1s;

  span {
    margin: 0 20px;
    color: #999;
    font-weight: 300;
  }

  span span {
    margin-left: 0;
    margin-right: 30px;
    font-size: 0.9em;
  }

  @media screen and (max-width: 900px) {
    margin-right: 0;

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
  @media screen and (max-width: 900px) {
    width: 89vw;
    align-self: center;
  }
`;

const ForecastTitle = styled.span`
  position: relative;
  color: #666;
  font-weight: lighter;
  font-size: 1.5rem;
  line-height: 0.2em;
  color: #a6a8da;
  margin-top: 30px;

  -webkit-animation: up 2s cubic-bezier(0.39, 0, 0.38, 1) 0.2s;
`;

const Country = styled.span`
  font-weight: 800;
  font-size: 0.6em;
  margin-left: 10px;
`;

export default CurrentWeatherCard;
