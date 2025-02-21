// import React, { useState, useEffect } from "react";
// import "./groupEditModal.css";
// import MemoryApi from "../apis/memoryAPI";

// const GroupEditModal = ({ onClose, onSubmit, currentData, groupId }) => {
//   const [groupName, setGroupName] = useState(currentData.groupName);
//   const [groupImage, setGroupImage] = useState(currentData.groupImg);
//   const [groupIntro, setGroupIntro] = useState(currentData.groupIntro);
//   const [isPublic, setIsPublic] = useState(currentData.isPublic);

//   const [imageUrl, setImageUrl] = useState(""); // 이미지 업로드 후 URL 저장
//   const [isUploading, setIsUploading] = useState(false); // 업로드 상태

//   // 이미지 업로드
//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setIsUploading(true); // 업로드 시작
//     try {
//       const response = await MemoryApi.uploadImage(file);
//       setImageUrl(response.imageUrl);
//       console.log("업로드된 이미지 URL:", response.imageUrl);
//     } catch (error) {
//       console.error("이미지 업로드 실패:", error);
//     } finally {
//       setIsUploading(false); // 업로드 완료
//     }
//   };

//   //그룹 정보 수정하기
//   useEffect(() => {
//     const putGroupInfo = async (updatedData) => {
//       try {
//         const updatedData = {
//           name,
//           password,
//           imageUrl,
//           isPublic,
//           introduction,
//         };
//         const data = await MemoryApi.putGroupInfo(groupId, updatedData);
//         setGroup(data);
//       } catch (error) {
//         console.log("error updating group", error);
//       }
//     };

//     if (groupId) {
//       putGroupInfo();
//     }
//   });

//   const handleSubmit = () => {
//     const updatedGroupData = {
//       name: groupName, // 그룹 이름
//       imageUrl: groupImage, // 대표 이미지 URL
//       introduction: groupIntro, // 그룹 소개
//       isPublic: isPublic, // 공개 여부
//     };

//     onSubmit(updatedGroupData); // 부모 컴포넌트로 데이터 전달
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <button className="close-btn" onClick={onClose}>
//           ×
//         </button>

//         <h2>그룹 정보 수정</h2>

//         <label>그룹명</label>
//         <input
//           type="text"
//           value={currentData.groupName}
//           onChange={(e) => setGroupName(e.target.value)}
//         />

//         <label>대표 이미지</label>
//         <div className="image-upload">
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {isUploading && <p>이미지 업로드 중...</p>}
//           {imageUrl && (
//             <img
//               src={imageUrl}
//               alt="업로드 미리보기"
//               style={{ width: "200px" }}
//             />
//           )}
//         </div>

//         <label>그룹 소개</label>
//         <textarea
//           value={groupIntro}
//           onChange={(e) => setGroupIntro(e.target.value)}
//         ></textarea>

//         <label>그룹 공개 선택</label>
//         <div className="toggle-container">
//           <span>공개</span>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={isPublic}
//               onChange={() => setIsPublic(!isPublic)}
//             />
//             <span className="slider round"></span>
//           </label>
//         </div>

//         <button className="submit-btn" onClick={handleSubmit}>
//           수정하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GroupEditModal;

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./groupEditModal.css";
import MemoryApi from "../apis/memoryAPI";

const GroupEditModal = ({ onClose, onSubmit, currentData }) => {
  const { groupId } = useParams(); // URL에서 가져오는 함수
  const [group, setGroup] = useState([]); // 그룹 정보 상태

  const [groupName, setGroupName] = useState(currentData.groupName);
  const [groupImage, setGroupImage] = useState(currentData.groupImg);
  const [groupIntro, setGroupIntro] = useState(currentData.groupIntro);
  const [isPublic, setIsPublic] = useState(currentData.isPublic);
  const [password, setPassword] = useState(""); // 그룹 수정 비밀번호

  const [imageUrl, setImageUrl] = useState(""); // 이미지 업로드 후 URL 저장
  const [isUploading, setIsUploading] = useState(false); // 업로드

  // ✅ 이미지 업로드 처리
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await MemoryApi.uploadImage(file);
      setImageUrl(response.imageUrl);
      console.log("업로드된 이미지 URL:", response.imageUrl);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // ✅ 그룹 수정 요청 함수
  const handleSubmit = async () => {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    const updatedGroupData = {
      name: groupName || currentData.groupName,
      password, // ✅ 필수 값
      imageUrl: imageUrl || groupImage,
      introduction: groupIntro,
      isPublic,
    };

    // ❌ undefined 값 필터링하여 API 요청 보내기
    const cleanedData = Object.fromEntries(
      Object.entries(updatedGroupData).filter(([_, v]) => v !== undefined)
    );

    try {
      console.log("📌 그룹 수정 요청 데이터:", cleanedData); // ✅ 확인용
      const updatedGroup = await MemoryApi.putGroupInfo(groupId, cleanedData);
      console.log("✅ 그룹 정보 수정 성공:", updatedGroup);

      onSubmit(updatedGroup);
      onClose();
    } catch (error) {
      console.error("❌ 그룹 정보 수정 실패:", error.response?.data || error);
      //alert("그룹 정보를 수정하는 데 실패했습니다.");
    }
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
        <input
          type="text"
          value={groupIntro}
          onChange={(e) => setGroupIntro(e.target.value)}
        ></input>
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
        <label>수정 권한 인증</label>
        <input
          type="text"
          placeholder="그룹 비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>🔍 현재 입력된 비밀번호: {password}</p> {/* 🔥 디버깅용으로 추가 */}
        <button className="submit-btn" onClick={handleSubmit}>
          수정하기
        </button>
      </div>
    </div>
  );
};

export default GroupEditModal;
