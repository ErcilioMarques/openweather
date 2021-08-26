import React, { Dispatch, useEffect } from "react";
import styled from "styled-components";
import WeatherCard from "../components/weather/WeatherCard";
import WeatherMap from "../components/weather/WeatherMap";
import { WeatherContext } from "../store/weatherStoreContext";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import weatherApiServices from "../Utils/weatherApiServices";
import axios from "axios";
import { CityWeatherInterface } from "../Interfaces/WeatherCityInterface";
import { WeatherForecastInterface } from "../Interfaces/WeatherForecastInterface";
import Modal from "../components/global/Modal";
import Backdrop from "../components/global/Backdrop";

function Home() {
  const weatherContext = useContext(WeatherContext);
  const cityNameInputRef = useRef<HTMLInputElement>(null);
  const cityWeather: CityWeatherInterface = {};
  const cityWeatherForecast: WeatherForecastInterface = {};
  const [weather, setWeatherData] = useState<CityWeatherInterface>(cityWeather);
  const [isLoading, setIsLoading] = useState(true);
  const [requesWeatherByCoordinates, setRequestWeatherByCoordinates] = useState(
    {
      status: 404,
      data: {},
      error: "",
    }
  );
  const [requesWeatherByCitName, setRequesWeatherByCitName] = useState({
    status: 404,
    data: {},
    error: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [enteredCithName, setEnteredCithName] = useState("");

  
  function closeModalHandler() {
    setModalIsOpen(false);
  }

  function submitHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    const { current } = cityNameInputRef;
    if (current !== null) {
      setEnteredCithName(current.value);
      weatherContext.setCityQueryInput(current.value);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const req2 = await weatherApiServices.getCityWeatherForecast({
        cityQuery: enteredCithName,
      });
      setRequesWeatherByCitName(req2);

      if (enteredCithName !== "") {
        let request = {
          status: 404,
          data: {},
          error:
            "something we dont know yet went wrong, please try again later...",
        };

        request = req2;

        if (request.status === 200) {
          let data: WeatherForecastInterface;
          data = request.data;
          weatherContext.setWeatherForecast(data);
          weatherContext.setCity(data!.city!);
        } else {
          weatherContext.setErrorMessageQuerying(req2!.error!);
          setModalIsOpen(true);
        }
      }
    };
    fetchData();
  }, [enteredCithName]);

  return (
    <div>
      <section>
        <SearchFormContainer>
          <SearchForm onSubmit={submitHandler}>
            <SearchInput
              placeholder="Enter a city"
              type="text"
              required
              id="cityNameInput"
              ref={cityNameInputRef}
            ></SearchInput>
            <SearchButton></SearchButton>
          </SearchForm>
        </SearchFormContainer>
      </section>
      <WeatherCard />
      {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </div>
  );
}

const SearchFormContainer = styled.div`
  padding: 1rem;
  margin-top: 4px;
  width: 90%;
  height: auto;
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
  justify-items: center;
  flex-wrap: nowrap;
`;

const SearchForm = styled.form`
  padding: 1rem;
  margin-top: 4px;
  height: auto;
  width: 70%;
  margin: 0 auto;
  display: inline-flex;
  align-items: center;
  justify-items: center;
  flex-wrap: nowrap;
  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const SearchInput = styled.input`
  flex-grow: 2;
  padding: 20px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 18px;
  line-height: 18px;
  color: #575756;
  background-color: transparent;
  border-radius: 50px;
  border: 1px solid #575756;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;

  &::placeholder {
    color: color(#575756 a(0.8));
    letter-spacing: 1.5px;
    padding-left: 1rem;
  }

  &:hover,
  &:focus {
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;

    &::placeholder {
      color: color(#575756 a(0.8));
      letter-spacing: 1.5px;
      padding-left: 0;
    }
  }
  @media screen and (max-width: 900px) {
    width: 99%;
  }
`;
const SearchButton = styled.button`
  line-height: 1;
  border: none;
  outline: none;
  width: 3rem;
  margin-left: -3.8rem;
  height: 3rem;
  position: relative;
  color: white;
  background: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 3rem 3rem;
  background-position: 95% center;
  border-radius: 50px;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
`;
export default Home;
