import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CommentList from "../components/CommentList";
import MemoryInfo from "../components/MemoryInfo";
import { getMemory, updateMemory, deleteMemory } from "../memoryApi";
import { getComments } from "../commentApi";

// 피그마에 있는 폰트 적용
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Spoqa Han Sans Neo', sans-serif;
  }
`;

function MemoryDetail() {
  const { id } = useParams(); // URL에서 postId 가져오기
  const postId = parseInt(id, 10);
  const [memoryData, setMemoryData] = useState(null); // 추억 상세 정보
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        const response = await getMemory(postId);
        setMemoryData(response);
        setCommentCount(response.commentCount);
      } catch (e) {
        console.error("추억 불러오기 실패", e);
      }
    };

    fetchMemoryDetails();
  }, [postId]);

  // 추억 수정 요청
  const handleUpdateMemory = async (updatedMemory) => {
    try {
      const response = await updateMemory(postId, updatedMemory);
      setMemoryData(response);
      alert("수정 완료");
      return response;
    } catch (e) {
      console.error("추억 수정하기 실패", e);
    }
  };

  // 추억 삭제 요청
  const handleDeleteMemory = async (password) => {
    try {
      const response = await deleteMemory(postId, password);

      if (response && response.message === "게시글 삭제 성공") {
        alert("추억 삭제 완료");
        navigate("/"); // 우선 삭제 후 메인 페이지 이동
      }
    } catch (e) {
      alert("추억 삭제 실패");
    }
  };

  return (
    <div>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {memoryData && (
          <MemoryInfo
            postId={postId}
            memory={memoryData}
            onUpdate={handleUpdateMemory} // 수정 요청
            onDelete={handleDeleteMemory} // 삭제 요청
          />
        )}
        <CommentList
          postId={postId}
          commentCount={commentCount}
        />
      </div>
    </div>
  );
}

export default MemoryDetail;
