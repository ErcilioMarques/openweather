import React, { useState } from "react";
import styled from "styled-components";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Logo href="/">
        Open<span>Weather</span>
      </Logo>
      <Humberguer onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </Humberguer>
      <Menu isOpen={isOpen}>
        <MenuLink href="/">Home</MenuLink>
        <MenuLink href="/our-work">Our Work</MenuLink>
        <MenuLink href="/about-us">About Us</MenuLink>
      </Menu>
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #b0ccc1;
  width: 100vw; 

  @media screen and (max-width: 900px) {
    width: 100vw; 

}
`;

const Logo = styled.a`
padding:2rem 2rem;
color: #7b7fda;
text-decoration:none;
font-weight:800;
font-size:1.9rem;

span{
    font-weight: 300;
    font-size:1.3rem;
    margin-left: 0;
}
`;

const Humberguer = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 2px;
    width: 25px;
    background-color: #7b7fda;
    margin-bottom: 4px;
    border-radius: 5px;
  }
  @media (max-width: 900px) {
    display: flex;
  }
`;

interface MenuProps {
  readonly isOpen: boolean;
}

const Menu = styled.div<MenuProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 900px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${(props) => (props.isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
  }
`;

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #7b7fda;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;
  font-weight:500;


  &:hover {
    color: #67bc98;
  }
`;

export default Navbar;
