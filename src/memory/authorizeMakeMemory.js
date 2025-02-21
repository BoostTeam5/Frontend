// import { useNavigate, useParams } from "react-router-dom";
// import React, { useState } from "react";
// import "./authorizeMakeMemory.css";
// import MemoryApi from "../apis/memoryAPI";

// function CheckAuthorizeCreateMemory() {
//   const { groupId } = useParams();
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const checkPw = async () => {
//     const data = {
//       password: password,
//     };
//     const response = await MemoryApi.checkGroupPw(groupId, data);

//     try {
//       if (response) {
//         console.log("추억만들기 비밀번호 매칭 성공");
//         navigate(`/groups/${groupId}`);
//       }
//     } catch (error) {
//       console.log(error);
//       alert("정확한 비밀번호를 입력해주세요.");
//     }
//   };
//   return (
//     <div className="makeMemory-container">
//       <div className="info-make-pw"></div>

//       <p>추억 올리기</p>
//       <div className="check-password">
//         <h3>올리기 권한 인증</h3>
//         <input
//           type="password"
//           placeholder="비밀번호를 입력해주세요"
//           onChange={(e) => setPassword(e.target.value)}
//         ></input>
//         <button className="submit-pw-btn" onClick={checkPw}>
//           제출하기
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CheckAuthorize;

// CheckAuthorizeCreateMemory.js

import React, { useState } from "react";
import MemoryApi from "../apis/memoryAPI";
import "./authorizeMakeMemory.css";

function CheckAuthorizeCreateMemory({ groupId, onSuccess, onClose }) {
  const [password, setPassword] = useState("");

  // 그룹 비밀번호 확인
  const checkPw = async () => {
    console.log("버튼 클릭됨됨");
    try {
      const data = { password: password };
      const response = await MemoryApi.checkGroupPw(groupId, data);
      // 서버가 비밀번호 검증 성공 시 어떤 응답을 주는지 확인 후 조건 수정
      // 예: response.success === true, response.message === "비밀번호 확인 완료" 등
      if (response && response.message === "비밀번호가 확인되었습니다") {
        console.log("추억만들기 비밀번호 매칭 성공");
        onSuccess(); // 부모의 성공 콜백 호출 → 실제 게시글 등록 로직 실행
      } else {
        alert("정확한 비밀번호를 입력해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("정확한 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className="makeMemory-container">
      {/* 모달 닫기 버튼 (필요 시 스타일 조정) */}
      <button onClick={onClose} style={{ float: "right" }}>
        ×
      </button>

      <p>추억 올리기</p>
      <div className="check-password">
        <h3>올리기 권한 인증</h3>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="submit-pw-btn" onClick={checkPw}>
          제출하기
        </button>
      </div>
    </div>
  );
}

export default CheckAuthorizeCreateMemory;
