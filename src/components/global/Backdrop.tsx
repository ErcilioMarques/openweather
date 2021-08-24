import styled from "styled-components";

function Backdrop(props: { onClick: () => void }) {
  return <BackdropComp className="backdrop" onClick={props.onClick} />;
}

const BackdropComp = styled.div`
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`;
export default Backdrop;
