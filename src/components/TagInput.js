import styled from "styled-components";
import removeTagImg from "../assets/removeTag.png";
import InputField from "./InputField";

function TagInput({ name, value, onChange, onKeyDown, removeTag, tags }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <InputField
        name={name}
        label="태그"
        value={value}
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="태그 입력 후 Enter"
      />
      <TagList>
        {tags.map((tag, index) => (
          <Tag key={index}>
            #{tag}
            <img
              src={removeTagImg}
              alt="태그 삭제 버튼"
              onClick={() => removeTag(index)}
              style={{ width: "15px", cursor: "pointer" }}
            />
          </Tag>
        ))}
      </TagList>
    </div>
  );
}

export default TagInput;

const TagList = styled.div`
  display: flex;
  width: 400px;
  min-height: 30px;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: -30px;
  margin-bottom: 10px;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  font-size: 12px;
  color: #787878;
  gap: 5px;
`;
