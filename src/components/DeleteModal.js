import { useState } from "react";
import Modal from "./Modal";
import InputField from "./InputField";

function DeleteModal({ onClose, onDelete, title }) {
  const [password, setPassword] = useState("");

  const handleDeleteSubmit = (e) => {
    e.preventDefault();
    onDelete(password);
    setPassword("");
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      onSubmit={handleDeleteSubmit}
      modalTitle={`${title} 삭제`}
      buttonTitle="삭제하기"
    >
      <InputField
        name={title === "추억" ? "postpassword" : "password"}
        type="password"
        value={password}
        label="삭제 권한 인증"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해 주세요"
      />
    </Modal>
  );
}

export default DeleteModal;
