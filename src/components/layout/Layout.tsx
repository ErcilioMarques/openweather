import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

function Layout(props: { children: React.ReactNode }) {
  return (
    <Container>
      <Navbar />
      <Main>{props.children}</Main>
    </Container>
  );
}

const Main = styled.main`
  padding: 1rem;
  margin: auto;
  width: 100%;
  max-width: 100%;
  //background: #67bc98;
  background: #ffffff;
  height: 100vh;

`;

const Container = styled.main`
  margin: auto;
  //background: #67bc98;
  background: #ffffff;
  height: 100vh;
  width: 100%;
  height: 100vh;

  @media only screen and (max-width: 900px) {
  [class*="col-"] {
    width: 100%;
  }
}

`;
export default Layout;
