import "./makeNewMemory.css";
import line2 from "../assets/line2.png";
import { useState } from "react";
import upload from "../assets/uploadMemory.png";
import { useNavigate } from "react-router-dom";

function MakeNewMemory() {
  const [tags, setTags] = useState([]); // 태그 목록 저장
  const [inputValue, setInputValue] = useState(""); // 입력 필드 값 저장
  const [isUpload, setIsUpload] = useState(false);

  const navigate = useNavigate();
  const handleUpload = () => {
    setIsUpload(true);
    navigate("/Home");
  };

  // 태그 추가 함수
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault(); // 기본 Enter 동작 방지 (폼 제출 방지)

      // 중복 태그 방지
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]); // 태그 추가
      }

      setInputValue(""); // 입력 필드 초기화
    }
  };

  // 태그 삭제 함수
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index)); // 해당 인덱스 태그 제거
  };

  return (
    <div className="makeMemory-container">
      <h2>추억 올리기</h2>
      <div className="makeMemory1">
        <label>닉네임</label>
        <input type="text" placeholder="닉네임을 입력해주세요"></input>

        <label>제목</label>
        <input type="text" placeholder="제목을 입력해주세요"></input>

        <label>이미지</label>
        <input type="image" placeholder="닉네임을 입력해주세요"></input>

        <label>본문</label>
        <textarea
          className="memory-content"
          type="text"
          placeholder="본문내용을 입력해주세요"
        ></textarea>
      </div>

      <img src={line2}></img>

      <div className="makeMemory2">
        <label>태그</label>
        <input
          type="text"
          placeholder="태그를 입력해주세요"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={handleKeyDown}
        ></input>

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
        <input type="text" placeholder="장소를 입력해주세요"></input>

        <label>추억의 순간</label>
        <input type="date" placeholder="YYYY-MM-DD"></input>

        <label>추억 공개 선택</label>
        <input type="checkbox"></input>

        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요"></input>
      </div>
      <img src={upload} onClick={handleUpload} />
    </div>
  );
}

export default MakeNewMemory;
