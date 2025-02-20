import React, { useState } from "react";
import "../style/CreateGroup.css";
import { useNavigate } from "react-router-dom";
import toggleDefault from "../assets/toggle_default.png";
import toggleActive from "../assets/toggle_active.png";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
//import { buildGroup } from "../api/groupApi"; // 이미 존재하는 함수 사용

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setGroupImage(file);
  };

  /*
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await buildGroup({
        name: groupName,
        image: groupImage,
        description: groupDescription,
        isPublic,
        password,
      });
      alert("그룹이 성공적으로 생성되었습니다!");
    } catch (error) {
      console.error("그룹 생성 실패:", error);
      alert("그룹 생성 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };
  */
   // 🧪 임시 테스트용 함수 (API 없이 화면 테스트 가능!)
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGroup = {
        id: Date.now(), // ✅ 그룹 ID 생성
        name: groupName,
        image: groupImage,
        description: groupDescription,
        isPublic,
        password, // ✅ 사용자가 입력한 비밀번호 저장
      };

      console.log("✅ 생성된 그룹:", newGroup);
      setShowSuccessModal(true); // ✅ 성공 모달 표시
    } catch (error) {
      console.error("❌ 그룹 생성 실패:", error);
      setShowErrorModal(true); // ✅ 실패 모달 표시
    }
  };
  // ✅ 성공 모달 닫기 후 이전 페이지로 이동
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate(-1); // ✅ 이전 페이지로 돌아가기
  };

  // ✅ 실패 모달 닫기 후 다시 그룹 만들기 페이지 유지
  const handleErrorConfirm = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="create-group-container">
      <h2 className="create-group-title">그룹 만들기</h2>
      <form className="create-group-form" onSubmit={handleSubmit}>
        {/* 그룹명 */}
        <label className="create-group-label">그룹명</label>
        <input
          type="text"
          className="create-group-input"
          placeholder="그룹명을 입력해 주세요"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        {/* 대표 이미지 */}
        <label className="create-group-label">대표 이미지</label>
        <div className="create-group-image-upload">
          <input
            type="text"
            className="create-group-file-display"
            value={groupImage ? groupImage.name : "파일을 선택해 주세요"}
            readOnly
          />
          <input
            type="file"
            accept="image/*"
            id="file-upload"
            onChange={handleImageChange}
            hidden
          />
          <button
            type="button"
            className="create-group-file-button"
            onClick={() => document.getElementById("file-upload").click()}
          >
            파일 선택
          </button>
        </div>

        {/* 그룹 소개 */}
        <label className="create-group-label">그룹 소개</label>
        <textarea
          className="create-group-textarea"
          placeholder="그룹을 소개해 주세요"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />

        {/* 그룹 공개 선택 */}
        <label className="create-group-label">그룹 공개 선택</label>
        <div className="create-group-toggle-container">
          <span className="create-group-toggle-text">
            {isPublic ? "공개" : "비공개"}
          </span>
          <img
            src={isPublic ? toggleActive : toggleDefault}
            alt="toggle"
            className="create-group-toggle"
            onClick={() => setIsPublic(!isPublic)}
          />
        </div>

        {/* 비밀번호 생성 */}
        <label className="create-group-label">비밀번호 생성</label>
        <input
          type="password"
          className="create-group-input"
          placeholder="그룹 비밀번호를 생성해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 만들기 버튼 */}
        <button type="submit" className="create-group-submit-button">
          만들기
        </button>
      </form>

       {/* ✅ 성공 모달 */}
       {showSuccessModal && (
        <SuccessModal
          title="그룹 만들기 성공"
          message="그룹이 성공적으로 등록되었습니다."
          onClose={handleSuccessConfirm}
        />
      )}

      {/* ✅ 실패 모달 */}
      {showErrorModal && (
        <ErrorModal
          title="그룹 만들기 실패"
          message="그룹 등록에 실패했습니다."
          onClose={handleErrorConfirm}
        />
      )}
    </div>
  );
};

export default CreateGroup;
