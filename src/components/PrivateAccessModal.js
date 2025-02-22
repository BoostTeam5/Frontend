import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/PrivateAccessModal.css";
import okayButton from "../assets/okay.png";

const PrivateAccessModal = ({ show, groupId, title, message, onClose }) => {
  const navigate = useNavigate();

  if (!show) {
    return null; // 모달 표시 여부 제어
  }

  const handleConfirm = () => {
    // 저장된 그룹 번호(groupId)를 사용하여 해당 URL로 이동
    navigate(`/groups/private/access/${groupId}`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-private">
        <h2 className="modal-title-private">{title}</h2>
        <p className="modal-message-private">{message}</p>
        <img
          src={okayButton}
          alt="확인 버튼"
          className="modal-okay-button-private"
          onClick={handleConfirm}
        />
      </div>
    </div>
  );
};

export default PrivateAccessModal;
