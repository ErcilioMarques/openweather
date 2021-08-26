import Layout from "./components/layout/Layout";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import OurWork from "./pages/OurWork";
import AboutUs from "./pages/AboutUs";
import React from "react";


function App() {
  return (
    <Layout>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home></Home>
          </Route>
          <Route path="/our-work">
            <OurWork></OurWork>
          </Route>
          <Route path="/about-us">
            <AboutUs></AboutUs>
          </Route>
        </Switch>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
