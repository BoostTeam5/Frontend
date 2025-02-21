import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import "./authorizePrivate.css";
import MemoryApi from "../apis/memoryAPI";
function CheckAuthorize() {
  const { postId } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const checkPw = async () => {
    const data = {
      password: password,
    };
    const response = await MemoryApi.checkPostPw(postId, data);

    try {
      if (response) {
        console.log("비공개 비밀번호 매칭 성공");
        navigate(`/posts/${postId}`);
      }
    } catch (error) {
      console.log(error);
      alert("정확한 비밀번호를 입력해주세요.");
    }
  };
  return (
    <div className="private-container">
      <div className="info-private"></div>
      <h2>비공개 추억</h2>
      <p>비공개 추억에 접근하기 위해 권한 확인이 필요합니다</p>
      <div className="check-password">
        <h3>비밀번호를 입력해주세요</h3>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="submit-pw-btn" onClick={checkPw}>
          제출하기
        </button>
      </div>
    </div>
  );
}

export default CheckAuthorize;
