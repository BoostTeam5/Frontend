import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import "./CreateGroupPage.css";

function CreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [password, setPassword] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupIntro, setGroupIntro] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 파일 업로드 핸들러
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!file) return;
    if (!allowedTypes.includes(file.type)) {
      setErrorMessage("JPEG 또는 PNG 형식의 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > maxSize) {
      setErrorMessage("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    setGroupImage(file);
    setErrorMessage("");
  };

  // 그룹 생성 요청
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (groupImage) {
        const formData = new FormData();
        formData.append("image", groupImage);
        const imageResponse = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (imageResponse.status === 200) {
          imageUrl = imageResponse.data.imageUrl;
        } else {
          throw new Error("이미지 업로드 실패");
        }
      }

      const response = await axios.post("/api/groups", {
        name: groupName,
        password,
        imageUrl,
        isPublic,
        introduction: groupIntro,
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        setErrorMessage("그룹 생성 실패");
      }
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <>
      <Header /> {/* ✅ 헤더 추가 */}
      <div className="create-group-container">
        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <form onSubmit={handleCreateGroup}>
          <label>그룹 이름</label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />

          <label>그룹 소개</label>
          <textarea
            value={groupIntro}
            onChange={(e) => setGroupIntro(e.target.value)}
            required
          />

          <label>대표 이미지</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <label>공개 여부</label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />

          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">그룹 만들기</button>
        </form>
      </div>
    </>
  );
}

export default CreateGroup;

