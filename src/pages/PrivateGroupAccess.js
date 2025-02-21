import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PrivateAccessModal from "../components/PrivateAccessModal";
import "../style/PrivateGroupAccess.css";
import privateAccessImg from "../assets/privateAccess.png";

const PrivateGroupAccess = () => {
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ 현재 위치 정보 가져오기
    const groupId = new URLSearchParams(location.search).get("groupId"); // ✅ groupId 추출

    const handleSubmit = (e) => {
        e.preventDefault();
        const correctPassword = "1234"; // ✅ 실제 구현 시 서버 검증 필요
    
        if (password === correctPassword) {
          navigate("/"); // ✅ 비밀번호 일치 시 메인 페이지로 이동
        } else {
          setShowModal(true); // ✅ 불일치 시 모달 표시
        }
      };
    
      const handleModalClose = () => {
        setShowModal(false);
        navigate(`/privateAccess?groupId=${groupId}`); // ✅ 다시 비밀번호 입력 페이지로
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

      {/* ✅ 비밀번호 불일치 시 모달 */}
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
