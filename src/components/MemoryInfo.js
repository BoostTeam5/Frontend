import flowerImg from "../assets/flowerIcon.png";
import replyCountImg from "../assets/bubbleIcon.png";
import likeBtn from "../assets/likeBtn.png";
import line from "../assets/line.png";
import MemoryUpdateModal from "./MemoryUpdateModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import contentImg from "../assets/contentImg.png";
import CommentModal from "./CommentModal";

const MEMORY_DETAIL = {
  id: 1,
  groupId: 12,
  nickname: "달봉이 아들",
  title: "인천 앞바다에서 무려 60cm 월척을 낚다!",
  content:
    "인천 앞바다에서 월척을 낚았습니다!\n가족들과 기억에 오래도록 남을 멋진 하루였어요 가족들과 기억에 오래도록 남을 멋진 하루였어요. 가족들과 기억에 오래도록 남을 멋진 하루였어요.\n\n인천 앞바다에서 월척을 낚았습니다!\n가족들과 기억에 오래도록 남을 멋진 하루였어요.\n\n인천 앞바다에서 월척을 낚았습니다!",
  imageUrl: "",
  tags: ["인천", "낚시"],
  location: "인천 앞바다",
  moment: "2024-02-19",
  likeCount: 120,
  commentCount: 8,
  isPublic: true,
  createdAt: "",
};

function MemoryInfo({ onEdit, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [memory, setMemory] = useState(MEMORY_DETAIL);

  const handleDelete = () => {
    setIsDeleteOpen(true);
    onDelete(memory.id);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
    onEdit(memory.id);
  };

  const handleCreateComment = () => {
    setIsCreateOpen(true);
  };

  const handleLikeClick = () => {
    console.log("현재 공감수:", memory.likeCount + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "20px" }}>
            <span>{memory.nickname}</span>
            <span>|</span>
            <span>{memory.isPublic ? "공개" : "비공개"}</span>
          </div>
          <div>
            <TextButton onClick={handleEdit} style={{ color: "#282828" }}>
              추억 수정하기
            </TextButton>
            <TextButton onClick={handleDelete} style={{ color: "#787878" }}>
              추억 삭제하기
            </TextButton>
          </div>
        </div>
        <h2>{memory.title}</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          {memory.tags.map((tag, idx) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "50px",
              marginBottom: "10px",
            }}
          >
            <span>{memory.location}</span>
            <span>{memory.moment} 18:00</span>
            <span>
              <img src={flowerImg} alt="공감수" /> {memory.likeCount}
            </span>
            <span>
              <img src={replyCountImg} alt="댓글수" /> {memory.commentCount}
            </span>
          </div>
          <img
            src={likeBtn}
            alt="공감 보내기 버튼"
            onClick={handleLikeClick}
            style={{ cursor: "pointer" }}
          />
        </div>
        <img src={line} alt="구분선" />
      </div>

      <Content>
        <img src={contentImg} alt="본문 첨부사진" />
        <p>{memory.content}</p>
      </Content>

      <Button onClick={handleCreateComment}>댓글 등록하기</Button>

      {isEditOpen && (
        <MemoryUpdateModal
          onClose={() => setIsEditOpen(false)}
          initialValues={memory}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal title="추억" onClose={() => setIsDeleteOpen(false)} />
      )}
      {isCreateOpen && <CommentModal onClose={() => setIsCreateOpen(false)} />}
    </div>
  );
}

export default MemoryInfo;

const TextButton = styled(Button)`
  background: none;
  border: none;
  padding: 0px 10px;
  width: auto;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  height: fit-content;
  gap: 30px;
  margin: 50px 0px;
  white-space: pre-wrap;
`;
