import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
// import './assets/style/sass/variables.scss';
import App from './App';
import { WeatherContextProvider } from "./store/weatherStoreContext";

ReactDOM.render(
  <WeatherContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </WeatherContextProvider>,
  document.getElementById("root")
);

