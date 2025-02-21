import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buildGroup } from "../api/groupApi";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import toggleDefault from "../assets/toggle_default.png";
import toggleActive from "../assets/toggle_active.png";
import MemoryApi from "../apis/memoryAPI";
import "../style/CreateGroup.css";
import groupApi from "../api/groupApi";

const CreateGroup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [introduction, setIntroduction] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  // 이미지 업로드 핸들러 (파일 검증)
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   const allowedTypes = ["image/jpeg", "image/png"];
  //   const maxSize = 5 * 1024 * 1024;
  //   if (!file) return;
  //   if (!allowedTypes.includes(file.type)) {
  //     setErrorMessage("JPEG 또는 PNG 형식의 파일만 업로드 가능합니다.");
  //     return;
  //   }
  //   if (file.size > maxSize) {
  //     setErrorMessage("파일 크기는 5MB 이하여야 합니다.");
  //     return;
  //   }
  //   setGroupImage(file);
  //   setErrorMessage("");
  // };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // setIsUploading(true);
    try {
      const response = await MemoryApi.uploadImage(file);
      setImageUrl(response.imageUrl);
      console.log("업로드된 이미지 URL:", response.imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };

  // 그룹 생성 요청 (백엔드 API 호출)
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      // (예시) 이미지 업로드 API가 있다면 여기서 별도 업로드 후 URL 받기
      // 여기서는 간단하게 브라우저에서 미리보기용 URL 생성
      //const imageUrl = imageUrl ? URL.createObjectURL(imageUrl) : null;

      const groupData = {
        name,
        password,
        imageUrl,
        introduction,
        isPublic,
      };

      const result = await groupApi.buildGroup(groupData);
      console.log("생성된 그룹:", result);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("그룹 생성 실패:", error);
      setErrorMessage("그룹 생성 중 오류가 발생했습니다.");
      setShowErrorModal(true);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/");
  };

  const handleErrorConfirm = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="create-group-container">
      <h2 className="create-group-title">그룹 만들기</h2>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      <form className="create-group-form" onSubmit={handleCreateGroup}>
        <label className="create-group-label">그룹명</label>
        <input
          type="text"
          className="create-group-input"
          placeholder="그룹명을 입력해 주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="create-group-label">대표 이미지</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <label className="create-group-label">그룹 소개</label>
        <textarea
          className="create-group-textarea"
          placeholder="그룹 소개를 입력해 주세요"
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />

        <label className="create-group-label">비밀번호</label>
        <input
          type="password"
          className="create-group-input"
          placeholder="그룹 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="create-group-label">공개 여부</label>
        <div className="toggle-container">
          <span>{isPublic ? "공개" : "비공개"}</span>
          <img
            src={isPublic ? toggleActive : toggleDefault}
            alt="toggle"
            onClick={() => setIsPublic(!isPublic)}
          />
        </div>

        <button type="submit" onClick={handleCreateGroup}>
          그룹 만들기
        </button>
      </form>

      {showSuccessModal && (
        <SuccessModal
          title="그룹 만들기 성공"
          message="그룹이 성공적으로 생성되었습니다."
          onClose={handleSuccessConfirm}
        />
      )}

      {showErrorModal && (
        <ErrorModal
          title="그룹 만들기 실패"
          message="그룹 생성 중 문제가 발생했습니다."
          onClose={handleErrorConfirm}
        />
      )}
    </div>
  );
};

export default CreateGroup;
