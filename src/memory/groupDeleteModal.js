import React, { useState } from "react";
import "./groupDeleteModal.css";
import exit from "../assets/exit.png";

function GroupDeleteModal({ onClose, onDelete }) {
  const [password, setPassword] = useState("");

  const handleDelete = () => {
    if (password.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    onDelete(password); // 입력한 비밀번호를 상위 컴포넌트(Memory.js)로 전달
  };

  return (
    <div className="modal-overlay-delete">
      <div className="modal-content-del">
        <button className="exit-Btn" src={exit} onClick={onClose}>
          X
        </button>
        <h2>그룹 삭제</h2>
        <label className="delLabel">삭제 권한 인증</label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 닫기 버튼 & 삭제 버튼 */}
        <div className="modal-buttons">
          <button className="confirm-btn" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupDeleteModal;
