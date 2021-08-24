import React from "react";
import styled from "styled-components";
import CurrentWeatherCard from "./CurrentWeatherCard";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { WeatherContext } from "../../store/weatherStoreContext";
import { useContext } from "react";
import WeatherPreviewCard from "./WeatherPreviewCard";
import { checkIfDateIsToday } from "../../Utils/Utils";
import WeatherMap from "./WeatherMap";

function WeatherCard() {
  const weatherContext = useContext(WeatherContext)!;

  let content;
  let timeAuxArray = ["12:00:00", '09:00:00"', "15:00:00"];

  if (weatherContext.weatherForecast.list) {
    let arrayAux = weatherContext.weatherForecast.list;

    arrayAux = arrayAux.filter(
      (item) =>
        item.dt_txt.substring(11, 21) === timeAuxArray[0] ||
        item.dt_txt.substring(11, 21) === timeAuxArray[1] ||
        item.dt_txt.substring(11, 21) === timeAuxArray[2] ||
        checkIfDateIsToday(item.dt_txt.substring(0, 10))
    );

    console.log("arrayAux");
    console.log(arrayAux);

    arrayAux = arrayAux.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) => t.dt_txt.substring(0, 10) === item.dt_txt.substring(0, 10)
        )
    );

    content = (
      <Container>
                <WeatherMap></WeatherMap>

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
                return (
                  <Tab>
                    <WeatherPreviewCard
                      weather={weatherForecast}
                    ></WeatherPreviewCard>
                  </Tab>
                );
              })}
            </TabList>
          </Tabs>
        </ContainerCurrentWeatherCard>
      </Container>
    );
  } else {
    content = <NoDataLabel>No city searched...</NoDataLabel>;
  }

  return <WeatherCardContainer>{content}</WeatherCardContainer>;
}


const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;
  height: auto;
  margin: 0 auto;
  margin-top: 5%;
  padding: 5px 30px;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  background-color: #fff;
  -webkit-animation: open 2s cubic-bezier(0.39, 0, 0.38, 1);

  @media screen and (max-width: 900px) {
    width: 100%; 
    flex-direction:column;/* The width is 100%, when the viewport is 800px or smaller */
  
}
`;


const WeatherCardContainer = styled.div`
display: flex;
 
`;

const ContainerCurrentWeatherCard = styled.div`
  width: 60%;

  @media screen and (max-width: 900px) {
    width: 89vw; /* The width is 100%, when the viewport is 800px or smaller */

}
`;

const ContainerOtherDaysWeatherCard = styled.div`
  flex-grow: 4;
`;

export const NoDataLabel = styled.label`
  color: color(#575756 a(0.8));
  letter-spacing: 1.5px;
  padding-left: 1rem;
  margin: auto;
  font-size: 1.5rem;
  font-weight: lighter;
`;

export default WeatherCard;
