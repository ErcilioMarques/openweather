import { useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../../store/weatherStoreContext";

function Modal(props: { onCancel: () => void; onConfirm: () => void }) {
  const weatherContext = useContext(WeatherContext);


  function confirmHandler() {
    props.onConfirm();
  }
  return (
    <ModalComp>
      <ErrorIcon
        src="../../assets/icons/sad.svg"
        alt="wthr img"
      ></ErrorIcon>
      <p>{weatherContext.errorMessageQuerying}</p>
      <span>Please try again with different name</span>
      <p></p>
      <button className="btn btn" onClick={confirmHandler}>
        ok
      </button>
    </ModalComp>
  );
}

const ModalComp = styled.div`
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  text-align: center;
  width: 20rem;
  height: 20rem;
  z-index: 10;
  position: fixed;
  top: 20vh;
  left: calc(50% - 15rem);
  align-items: center;

  background: #fff;
  margin: 0 0 0 0;
  box-shadow: inset 10px 0 #da8074;

  button {
    background-color: #334257;
    border: none;
    border-radius: 5px;
    width: 120px;
    padding: 14px;
    font-size: 16px;
    color: white;
    box-shadow: 0px 6px 18px -5px rgba(237, 103, 85, 1);
  }
  p {
    font-size: 1.5rem;
    padding: 20px;
  }
  span {
    margin-left: 0;
    margin-right: 30px;
    font-size: 0.9em;
  }
`;

const ErrorIcon = styled.img`
  padding: 10px 5px;
  position: relative;
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

export default Modal;
