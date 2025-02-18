import "./makeNewMemory.css";
import line2 from "../assets/line2.png";
import { useState } from "react";
import upload from "../assets/uploadMemory.png";
import { useNavigate, useParams } from "react-router-dom";
import MemoryApi from "../apis/memoryAPI";

function MakeNewMemory() {
  const { groupId } = useParams(); // URL에서 가져오는 함수
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

  // ✅ 태그 추가 함수
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault(); // 기본 Enter 동작 방지
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue(""); // 입력 초기화
    }
  };

  // ✅ 태그 삭제 함수
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // ✅ 게시글 업로드 함수
  const handleUpload = async () => {
    if (!groupId) {
      alert("잘못된 접근입니다. 그룹 ID가 없습니다.");
      return;
    }
    console.log("현재 선택된 groupId:", groupId);

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

    try {
      await MemoryApi.createPost(groupId, postData);
      alert("게시글이 등록되었습니다.");
      navigate(`/groups/${groupId}`); // 등록 후 이동
    } catch (error) {
      console.error("게시글 등록 실패:", error);
      alert("게시글 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="makeMemory-container">
      <h2>추억 올리기</h2>
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

        <label>이미지 URL</label>
        <input
          type="text"
          placeholder="이미지 URL을 입력해주세요"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <label>본문</label>
        <textarea
          className="memory-content"
          placeholder="본문 내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <img src={line2} alt="구분선" />

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

        <label>추억 공개 선택</label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={() => setIsPublic((prev) => !prev)}
        />

        <label>비밀번호</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={postPassword}
          onChange={(e) => setPostPassword(e.target.value)}
        />

        <img src={upload} alt="업로드 버튼" onClick={handleUpload} />
      </div>
    </div>
  );
}

export default MakeNewMemory;
