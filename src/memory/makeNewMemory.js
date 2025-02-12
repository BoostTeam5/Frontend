function MakeNewMemory() {
  return (
    <div>
      <label>닉네임</label>
      <input type="text" enterKeyHint="닉네임을 입력해주세요"></input>

      <label>제목</label>
      <input type="text" enterKeyHint="제목을 입력해주세요"></input>

      <label>이미지</label>
      <input type="image" enterKeyHint="닉네임을 입력해주세요"></input>

      <label>본문문</label>
      <input type="text" enterKeyHint="본문내용을 입력해주세요"></input>

      <label>태그</label>
      <input type="text" enterKeyHint="태그를 입력해주세요"></input>

      <label>장소</label>
      <input type="text" enterKeyHint="장소를 입력해주세요"></input>

      <label>추억의 순간</label>
      <input type="date" enterKeyHint="YYYY-MM-DD"></input>

      <label>추억 공개 선택</label>
      <input type="checkbox"></input>

      <label>비밀번호</label>
      <input type="password" enterKeyHint="비밀번호를 입력해주세요"></input>
    </div>
  );
}

export default MakeNewMemory;
