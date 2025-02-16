import styled from "styled-components";

const Button = styled.button`
  width: 400px;
  height: 50px;
  text-align: center;
  background: #282828;
  border-radius: 10px;
  color: white;
  cursor: pointer;

  &:focus,
  &:hover {
    outline: none;
    border: none;
  }
`;

export default Button;
