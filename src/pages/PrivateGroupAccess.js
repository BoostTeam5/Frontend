import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✅ useParams 추가
import PrivateAccessModal from "../components/PrivateAccessModal";
import "../style/PrivateGroupAccess.css";
import groupApi from "../api/groupApi";

const PrivateGroupAccess = () => {
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { groupId } = useParams(); // ✅ URL 경로에서 groupId 가져오기

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("📌 가져온 groupId:", groupId);

      const response = await groupApi.fetchGroupDetail(groupId);
      const correctPassword = "12345"; // ✅ 임시 테스트용 비밀번호

      console.log("📝 입력된 비밀번호:", password);
      console.log("🔑 정확한 비밀번호:", correctPassword);
      console.log("✅ 비교 결과:", password.trim() === correctPassword);

      // ✅ 비밀번호 일치 여부 확인 (공백 제거 후 비교)
      if (password.trim() === correctPassword) {
        console.log("🎯 비밀번호 일치 - 비공개 그룹 페이지로 이동");
        navigate(`/groups/${groupId}`);
      } else {
        console.log("🚫 비밀번호 불일치 - 모달 표시");
        setShowModal(true);
      }
    } catch (error) {
      console.error("❗ 비밀번호 검증 중 오류 발생:", error);
      setShowModal(true);
    }
  };

  // 모달 닫을 때 홈으로 이동 (isPublic: false, autoToggle: true 상태 전달)
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
