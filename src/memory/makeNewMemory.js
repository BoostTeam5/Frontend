import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemoryApi from "../apis/memoryAPI";
import "./makeNewMemory.css";
import upload from "../assets/uploadMemory.png";
import line2 from "../assets/line2.png";
import defaultImg from "../assets/family.png";

// 추가: 그룹 비밀번호 확인 모달
import CheckAuthorizeCreateMemory from "./authorizeMakeMemory";

function MakeNewMemory({ onClose }) {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postPassword, setPostPassword] = useState("");
  const [groupPassword, setGroupPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [location, setLocation] = useState("");
  const [moment, setMoment] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // 모달 열림 여부
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // 태그 추가
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  // 태그 삭제
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // 이미지 업로드
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

  // (실제) 게시글 업로드 로직
  const handleUpload = async () => {
    try {
      if (!groupId) {
        alert("잘못된 접근입니다. 그룹 ID가 없습니다.");
        return;
      }

      const postData = {
        nickname,
        title,
        content,
        postPassword,
        groupPassword,
        imageUrl,
        tags,
        location,
        moment,
        isPublic,
      };

      await MemoryApi.createPost(groupId, postData);
      alert("게시글이 등록되었습니다.");

      // 등록 후 이동
      navigate(`/groups/${groupId}`);
      if (onClose) onClose(); // 모달형태로 사용 중이라면 닫기
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  // 업로드 버튼 클릭 시 → 먼저 그룹 비밀번호 인증 모달 열기
  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  // 인증 모달에서 성공 시 → 실제 글 등록
  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    handleUpload(); // 인증 성공하면 실제 업로드 로직 실행
  };

  return (
    <div className="modal-overlay-memory">
      <div className="modal-content-memory">
        <h2 className="modal-title">추억 올리기</h2>
        <div className="makeMemory-content">
          {/* 왼쪽 영역 */}
          <div className="makeMemory1">
            <label>닉네임</label>
            <input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <label>제목</label>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>이미지</label>
            <div className="image-upload-memory">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {isUploading && <p>이미지 업로드 중...</p>}
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="업로드 미리보기"
                  style={{ width: "200px", marginTop: "10px" }}
                />
              )}
            </div>

            <label>본문</label>
            <textarea
              className="memory-content"
              placeholder="본문 내용을 입력해주세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          {/* 구분선 */}
          <img src={line2} alt="구분선" className="divider-img" />

          {/* 오른쪽 영역 */}
          <div className="makeMemory2">
            <label>태그</label>
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <div className="tag-list">
              {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                  #{tag}
                  <span className="remove-tag" onClick={() => removeTag(index)}>
                    ✖
                  </span>
                </div>
              ))}
            </div>

            <label>장소</label>
            <input
              type="text"
              placeholder="장소를 입력해주세요"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <label>추억의 순간</label>
            <input
              type="date"
              value={moment}
              onChange={(e) => setMoment(e.target.value)}
            />

            <label>공개 여부</label>
            <div className="toggle-container-memory">
              <span>공개</span>
              <label className="switch-memory">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic((prev) => !prev)}
                />
                <span className="slider-memory round-memory"></span>
              </label>
            </div>

            <label>비밀번호 생성</label>
            <input
              type="password"
              placeholder="추억 비밀번호를 생성해주세요"
              value={postPassword}
              onChange={(e) => setPostPassword(e.target.value)}
            />

            {/* 업로드 버튼 → 먼저 인증 모달 열기 */}
            <img
              src={upload}
              alt="업로드 버튼"
              className="upload-btn-create"
              onClick={openAuthModal}
            />
          </div>
        </div>
      </div>

      {/* 그룹 비밀번호 인증 모달 */}
      {authModalOpen && (
        <div className="modal-overlay-memory">
          <CheckAuthorizeCreateMemory
            groupId={groupId}
            onSuccess={handleAuthSuccess} // 인증 성공 시 실제 업로드
            onClose={() => setAuthModalOpen(false)} // 모달 닫기
          />
        </div>
      )}
    </div>
  );
}

export default MakeNewMemory;
