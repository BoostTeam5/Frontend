import styled from "styled-components";
import exitImg from "../assets/exit.png";
import Button from "./Button";

function Modal({ onClose, onSubmit, modalTitle, children, buttonTitle }) {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{modalTitle}</ModalTitle>
        <CloseButton
          src={exitImg}
          alt="닫기 버튼"
          onClick={onClose}
        ></CloseButton>
        {children}
        <SubmitButton type="button" onClick={onSubmit}>
          {buttonTitle}
        </SubmitButton>
      </ModalContainer>
    </Overlay>
  );
}

export default Modal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  padding: 100px 60px;
  width: fit-content;
  height: fit-content;
  border-radius: 8px;
`;

const ModalTitle = styled.p`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: bold;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  cursor: pointer;
`;

const SubmitButton = styled(Button)`
  position: absolute;
  width: 400px;
  height: 50px;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: bold;
  background: #282828;
  color: white;
  margin-bottom: 25px;
`;
