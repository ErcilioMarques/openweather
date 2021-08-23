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
  width: 90vw;
  max-width: 90vw;
  //background: #67bc98;
  background: #ffffff;
  height: 100vh;

  

`;

const Container = styled.main`
  margin: auto;
  width: 100vw;
  //background: #67bc98;
  background: #ffffff;
  height: 100vh;

`;
export default Layout;
