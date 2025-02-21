import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PrivateAccessModal from "../components/PrivateAccessModal";
import { verifyGroupPassword } from "../api/groupApi";
import "../style/PrivateGroupAccess.css";
import privateAccessImg from "../assets/privateAccess.png";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = new URLSearchParams(location.search).get("groupId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await verifyGroupPassword(groupId, password);
      // result.valid 또는 result.success 등 백엔드 응답에 맞게 처리
      if (result.valid) {
        navigate("/");
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("비밀번호 검증 오류:", error);
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate(`/privateAccess?groupId=${groupId}`);
  };

  return (
    <div className="private-access-container">
      <h2 className="private-access-title">비공개 그룹</h2>
      <p className="private-access-description">
        비공개 그룹에 접근하기 위해 권한 확인이 필요합니다.
      </p>
      <form onSubmit={handleSubmit} className="private-access-form">
        <label className="private-access-label">비밀번호 입력</label>
        <input
          type="password"
          className="private-access-input"
          placeholder="그룹 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="private-access-submit-button">
          제출하기
        </button>
      </form>
      <PrivateAccessModal
        show={showModal}
        onClose={handleModalClose}
        title="비공개 그룹 접근 실패"
        message="비밀번호가 일치하지 않습니다"
      />
    </div>
  );
};

export default PrivateGroupAccess;
