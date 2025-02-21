import React from "react";
import "../style/ErrorModal.css";
import okayButton from "../assets/okay.png"; // ✅ assets 폴더의 'okay' 버튼 이미지 사용

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">그룹 만들기 실패</h2>
        <p className="modal-message">{message}</p>
        <img
          src={okayButton}
          alt="확인 버튼"
          className="modal-okay-button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};

export default SuccessModal;
