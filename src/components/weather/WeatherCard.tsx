import React from "react";
import styled from "styled-components";
import CurrentWeatherCard from "./CurrentWeatherCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";
import WeatherPreviewCard from "./WeatherPreviewCard";

function WeatherCard() {
  const weatherContext = useContext(WeatherContext)!;

  let content;

  if (weatherContext.weatherForecast.list) {
    let arrayAux = weatherContext.weatherForecast.list;
    arrayAux = arrayAux.filter(
      (item, index, self) =>
        index ===
        self.findIndex((t) => t.dt_txt.substring(0,10) === item.dt_txt.substring(0,10))
    );

    content = (
      <ContainerCurrentWeatherCard>

      <Tabs>
        {arrayAux!.map((weatherForecast, index) => {
          return (
            <TabPanel>
              <CurrentWeatherCard
                weather={weatherForecast}
              ></CurrentWeatherCard>
            </TabPanel>
          );
        })}

        <TabList>
          {arrayAux!.map((weatherForecast, index) => {
            return <Tab><WeatherPreviewCard weather={weatherForecast}></WeatherPreviewCard></Tab>;
          })}
        </TabList>
      </Tabs>
      </ContainerCurrentWeatherCard>

    );
  } else {
    content = <NoDataLabel>No city searched...</NoDataLabel>;
  }

  return <WeatherCardContainer>{content}</WeatherCardContainer>;
}

const WeatherCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  padding: 5px 30px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.2);
  -webkit-animation: open 2s cubic-bezier(0.39, 0, 0.38, 1);
`;

const ContainerCurrentWeatherCard = styled.div`
width: 100%;`;

const ContainerOtherDaysWeatherCard = styled.div`
  flex-grow: 4;
`;

const NoDataLabel = styled.label`
  color: color(#575756 a(0.8));
  letter-spacing: 1.5px;
  padding-left: 1rem;
  margin: auto;
  font-size: 1.5rem;
  font-weight: lighter;
`;

export default WeatherCard;
