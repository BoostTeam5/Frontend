import React, { useState } from "react";
import "./groupEditModal.css";

const GroupEditModal = ({ onClose, onSubmit, currentData }) => {
  const [groupName, setGroupName] = useState(currentData.groupName);
  const [groupImage, setGroupImage] = useState(currentData.groupImg);
  const [groupIntro, setGroupIntro] = useState(currentData.groupIntro);
  const [isPublic, setIsPublic] = useState(currentData.isPublic);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(URL.createObjectURL(file)); // 파일 선택 시 미리보기
    }
  };

  const handleSubmit = () => {
    onSubmit({ groupName, groupImg: groupImage, groupIntro, isPublic });
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
          <input type="file" id="file-upload" onChange={handleImageUpload} />
          <label htmlFor="file-upload" className="file-btn">
            파일 선택
          </label>
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
