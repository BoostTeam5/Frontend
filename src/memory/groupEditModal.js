import React, { useState } from "react";
import "./groupEditModal.css";
import MemoryApi from "../apis/memoryAPI";

const GroupEditModal = ({ onClose, onSubmit, currentData }) => {
  const [groupName, setGroupName] = useState(currentData.groupName);
  const [groupImage, setGroupImage] = useState(currentData.groupImg);
  const [groupIntro, setGroupIntro] = useState(currentData.groupIntro);
  const [isPublic, setIsPublic] = useState(currentData.isPublic);

  const [imageUrl, setImageUrl] = useState(""); // 이미지 업로드 후 URL 저장
  const [isUploading, setIsUploading] = useState(false); // 업로드 상태 추가

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true); // 업로드 시작
    try {
      const response = await MemoryApi.uploadImage(file);
      setImageUrl(response.imageUrl);
      console.log("업로드된 이미지 URL:", response.imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsUploading(false); // 업로드 완료
    }
  };

  const handleSubmit = () => {
    const updatedGroupData = {
      name: groupName, // 그룹 이름
      imageUrl: groupImage, // 대표 이미지 URL
      introduction: groupIntro, // 그룹 소개
      isPublic: isPublic, // 공개 여부
    };

    onSubmit(updatedGroupData); // 부모 컴포넌트로 데이터 전달
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <h2>그룹 정보 수정</h2>

        <label>그룹명</label>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <label>대표 이미지</label>
        <div className="image-upload">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {isUploading && <p>이미지 업로드 중...</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="업로드 미리보기"
              style={{ width: "200px" }}
            />
          )}
        </div>

        <label>그룹 소개</label>
        <textarea
          value={groupIntro}
          onChange={(e) => setGroupIntro(e.target.value)}
        ></textarea>

        <label>그룹 공개 선택</label>
        <div className="toggle-container">
          <span>공개</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default GroupEditModal;
