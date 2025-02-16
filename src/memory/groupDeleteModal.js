import React from "react";
import "./groupDeleteModal.css";
import exit from "../assets/exit.png";

function GroupDeleteModal({ onClose }) {
  return (
    <div className="modal-overlay-delete">
      <div className="modal-content-del">
        <button className="exit-Btn" src={exit} onClick={onClose}>
          X
        </button>
        <h2>그룹 삭제</h2>
        <label className="delLabel">삭제 권한 인증</label>
        <input type="password" placeholder="비밀번호를 입력하세요" />

        {/* 닫기 버튼 */}
        <div className="modal-buttons">
          <button className="confirm-btn">삭제</button>
        </div>
      </div>
    </div>
  );
}

export default GroupDeleteModal;
