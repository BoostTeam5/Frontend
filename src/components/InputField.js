import styled from "styled-components";

// 태그 외 인풋창에서 Enter 기본 동작 막기
const preventEnter = (e) => {
  if (e.key === "Enter") e.preventDefault();
};

const InputField = ({
  name,
  label,
  value,
  type,
  onChange,
  onKeyDown = preventEnter,
  placeholder,
}) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </InputContainer>
  );
};

export default InputField;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 370px;
  height: 20px;
  padding: 10px 15px;
  text-align: left;
  font-size: 12px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  margin-bottom: 30px;
  &::placeholder {
    color: #b8b8b8;
  }

  &:focus {
    border-color: #282828;
  }
`;
