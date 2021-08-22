import React from "react";
import styled from "styled-components";
import CurrentWeatherCard from "./CurrentWeatherCard";
import OtherDaysWeatherCard from "./OtherDaysWeatherCard";

function WeatherCard() {
  return (
    <WeatherCardContainer>
      <ContainerCurrentWeatherCard>
        <CurrentWeatherCard></CurrentWeatherCard>
      </ContainerCurrentWeatherCard>

      <ContainerOtherDaysWeatherCard>
        <OtherDaysWeatherCard></OtherDaysWeatherCard>
      </ContainerOtherDaysWeatherCard>
    </WeatherCardContainer>
  );
}

const WeatherCardContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  flex-grow: 1;
`;

const ContainerOtherDaysWeatherCard = styled.div`
  flex-grow: 4;
`;

export default WeatherCard;
