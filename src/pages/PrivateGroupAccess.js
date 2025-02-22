import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PrivateAccessModal from "../components/PrivateAccessModal";
import "../style/PrivateGroupAccess.css";
import groupApi from "../api/groupApi";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const groupId = new URLSearchParams(location.search).get("groupId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ 서버에 평문 비밀번호 전송 후, bcrypt.compare를 통해 서버에서 비교
      const isPasswordCorrect = await groupApi.verifyGroupPassword(groupId, password);

      if (isPasswordCorrect) {
        navigate(`/groups/private/access/${groupId}`);
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("비밀번호 검증 중 오류 발생:", error);
      setShowModal(true);
    }
  };

  // 모달 닫을 때 홈으로 이동하며, state에 isPublic:false와 autoToggle:true 전달
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/", { state: { isPublic: false, autoToggle: true } });
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
        groupId={groupId}
      />
    </div>
  );
};

export default PrivateGroupAccess;
