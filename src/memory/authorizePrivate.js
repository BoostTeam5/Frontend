import "./authorizePrivate.css";
function CheckAuthorize() {
  return (
    <div className="private-container">
      <div className="info-private"></div>
      <h2>비공개 추억</h2>
      <p>비공개 추억에 접근하기 위해 권한 확인이 필요합니다</p>
      <div className="check-password">
        <h3>비밀번호를 입력해주세요</h3>
        <input type="text" placeholder="비밀번호를 입력해주세요"></input>
        <button className="submit-pw-btn">제출하기</button>
      </div>
    </div>
  );
}

export default CheckAuthorize;
