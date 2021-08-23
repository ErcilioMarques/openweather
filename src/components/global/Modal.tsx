import { useContext } from "react";
import styled from "styled-components";
import { WeatherContext } from "../../store/weatherStoreContext";

function Modal(props: { onCancel: () => void; onConfirm: () => void }) {
  const weatherContext = useContext(WeatherContext);

  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    props.onConfirm();
  }
  return (
    <ModalComp>
      <p>
        Upss, {weatherContext.errorMessageQuerying}
      </p>
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
  width: 30rem;
  z-index: 10;
  position: fixed;
  top: 20vh;
  left: calc(50% - 15rem);

  background: #fff;
  padding: 0.5em 1em 2em 2em;
  margin: 0 0 0 0;
  box-shadow: inset 6px 0 #cc0000;

  button {
    font: inherit;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    float: right;
    border-radius: 4px;
    background-color:#67bc98;
    color: white;
    border: 1px solid #800040;
    margin: 0 1rem;

  }
  p {
    font-size: 1.5rem;
    margin:20px auto;
    padding: 20px;;
    
  }
`;

export default Modal;
