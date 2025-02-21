import Modal from "./Modal";
import styled from "styled-components";
import InputField from "./InputField";
import { useState } from "react";

// 댓글 등록 모달창
function CreateCommentModal({ onClose, onSubmit }) {
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // form 제출 시, 페이지 새로 고침 동작 방지

    await onSubmit(nickname, content, password);
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleSubmit}
      modalTitle={"댓글 등록"}
      buttonTitle={"등록하기"}
    >
      <InputField
        type="text"
        value={nickname}
        label="닉네임"
        name="nickname"
        onChange={(e) => setNickname(e.target.value)}
        placeholder="닉네임을 입력해 주세요"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "30px",
        }}
      >
        <Label>댓글</Label>
        <ContentArea
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해 주세요"
        />
      </div>
      <InputField
        name="password"
        type="password"
        value={password}
        label="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해 주세요"
      />
    </Modal>
  );
}

export default CreateCommentModal;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
`;

const ContentArea = styled.textarea`
  width: 370px;
  height: 120px;
  padding: 15px 15px;
  font-size: 12px;
  border: 2px solid #dddddd;
  border-radius: 5px;
  resize: none;
  overflow-y: auto;

  &:focus {
    border-color: #282828;
  }

  &::placeholder {
    color: #b8b8b8;
  }

  // 스크롤바 스타일
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #aaa;
    border-radius: 4px;
  }
`;
