import { useNavigate, useParams } from "react-router-dom";
import "./authorizePrivate.css";
import MemoryApi from "../apis/memoryAPI";
function CheckAuthorize() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const checkPw = async () => {
    const response = await MemoryApi.checkPostPw(postId);

    if (response) {
      navigate(`/posts/${postId}`);
    }
    alert("정확한 비밀번호를 입력해주세요.");
  };
  return (
    <div className="private-container">
      <div className="info-private"></div>
      <h2>비공개 추억</h2>
      <p>비공개 추억에 접근하기 위해 권한 확인이 필요합니다</p>
      <div className="check-password">
        <h3>비밀번호를 입력해주세요</h3>
        <input type="text" placeholder="비밀번호를 입력해주세요"></input>
        <button className="submit-pw-btn" onClick={checkPw}>
          제출하기
        </button>
      </div>
    </div>
  );
}

export default CheckAuthorize;
