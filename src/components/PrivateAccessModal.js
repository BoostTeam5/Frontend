import React from "react";
import "../style/PrivateAccessModal.css";
import okayButton from "../assets/okay.png"; // ✅ 'okay' 버튼 이미지 사용

const PrivateAccessModal = ({ show, onClose, title, message }) => {
  if (!show) {
    return null; // ✅ 모달 표시 여부 제어
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content-private">
        <h2 className="modal-title-private">{title}</h2>
        <p className="modal-message-private">{message}</p>
        <img
          src={okayButton}
          alt="확인 버튼"
          className="modal-okay-button-private"
          onClick={onClose} // ✅ 이미지 클릭 시 모달 닫기
        />
      </div>
    </div>
  );
};

export default PrivateAccessModal;
