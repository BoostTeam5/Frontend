import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommentList from "../components/CommentList";
import MemoryInfo from "../components/MemoryInfo";
import { getMemory, updateMemory, deleteMemory } from "../memoryApi";

// 피그마에 있는 폰트 적용
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Spoqa Han Sans Neo', sans-serif;
  }
`;

function MemoryDetail() {
  const { postId } = useParams(); // URL에서 postId 가져오기
  //const postId = parseInt(id, 10);
  const [memoryData, setMemoryData] = useState(null); // 추억 상세 정보
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const navigate = useNavigate();

  // 게시글 상세 조회
  useEffect(() => {
    const fetchMemoryDetails = async () => {
      try {
        const response = await getMemory(postId);
        setMemoryData(response);
        setCommentCount(response.commentCount);
        setLikeCount(response.likeCount);
        console.log("memoryDetail", response);
      } catch (e) {
        console.error("추억 불러오기 실패", e);
      }
    };

    fetchMemoryDetails();
  }, [postId]);

  // 댓글 개수 업데이트
  const updateCommentCount = (newCount) => {
    setCommentCount(newCount);
  };

  // 공감 개수 업데이트
  const updateLikeCount = (newCount) => {
    setLikeCount(newCount);
  };

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
      await deleteMemory(postId, password);
      navigate("/"); // 삭제 후 메인 페이지 이동
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
          gap: "100px",
          maxWidth: "100%",
          paddingBottom: "50px",
        }}
      >
        {memoryData && (
          <MemoryInfo
            postId={postId}
            memory={memoryData}
            commentCount={commentCount}
            likeCount={likeCount}
            setLikeCount={updateLikeCount}
            onUpdate={handleUpdateMemory} // 수정 요청
            onDelete={handleDeleteMemory} // 삭제 요청
          />
        )}
        <CommentList
          postId={postId}
          commentCount={commentCount}
          setCommentCount={updateCommentCount}
        />
      </div>
    </div>
  );
}

export default MemoryDetail;
