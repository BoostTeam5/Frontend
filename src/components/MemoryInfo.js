import flowerImg from "../assets/flowerIcon.png";
import replyCountImg from "../assets/bubbleIcon.png";
import likeBtn from "../assets/likeBtn.png";
import line from "../assets/line.png";
import MemoryUpdateModal from "./MemoryUpdateModal";
import DeleteModal from "./DeleteModal";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import contentImg from "../assets/contentImg.png";
import { likeMemory } from "../memoryApi";
import dayjs from "dayjs";

const formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

function MemoryInfo({ postId, memory, commentCount, onUpdate, onDelete }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [memoryData, setMemoryData] = useState(memory);

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (memoryData?.post_tags?.length) {
      const extractedTags = memoryData.post_tags.map(
        (pt) => pt.tags?.tagName || ""
      );
      if (tags.length === 0) {
        setTags(extractedTags);
      }
    }
  }, [memoryData]);

  const handleUpdate = async (updatedData) => {
    const response = await onUpdate(updatedData);
    setMemoryData(response);
    setTags(response.tags);
    setIsEditOpen(false); // API 요청이 성공한 후 모달 닫기
  };

  const handleDelete = async (postPassword) => {
    await onDelete(postPassword);
    setIsDeleteOpen(false);
  };

  // 공감 보내기
  const handleLike = async () => {
    try {
      await likeMemory(postId);
      alert("공감 보내기 성공!");
    } catch (e) {
      console.error("공감 보내기 실패", e);
    }
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
            <span style={{ color: "#8d8d8d" }}>
              {memory.isPublic ? "공개" : "비공개"}
            </span>
          </div>
          <div style={{ display: "flex", gap: "40px" }}>
            <TextButton
              onClick={() => setIsEditOpen(true)}
              style={{ color: "#282828" }}
            >
              추억 수정하기
            </TextButton>
            <TextButton
              onClick={() => setIsDeleteOpen(true)}
              style={{ color: "#8d8d8d" }}
            >
              추억 삭제하기
            </TextButton>
          </div>
        </div>
        <h2>{memory.title}</h2>
        <div style={{ display: "flex", gap: "10px", color: "#b8b8b8" }}>
          {tags.map((tag, idx) => (
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
              alignItems: "center",
              marginTop: "50px",
              marginBottom: "10px",
            }}
          >
            <span>{memory.location}</span>
            <span>{formatDate(memory.moment)}</span>

            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <img src={flowerImg} alt="공감수" style={{ width: "25px" }} />{" "}
              <span style={{ color: "#8d8d8d" }}>{memory.likeCount}</span>
            </div>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <img src={replyCountImg} alt="댓글수" style={{ width: "25px" }} />
              <span style={{ color: "#8d8d8d" }}>{commentCount}</span>
            </div>
          </div>
          <img
            src={likeBtn}
            alt="공감 보내기 버튼"
            onClick={handleLike}
            style={{ width: "180px", cursor: "pointer" }}
          />
        </div>
        <img src={line} alt="구분선" />
      </div>

      <Content>
        <img src={contentImg} alt="본문 첨부사진" />
        <p>{memory.content}</p>
      </Content>

      {isEditOpen && (
        <MemoryUpdateModal
          postId={postId}
          memory={memory}
          onUpdate={handleUpdate}
          onClose={() => setIsEditOpen(false)}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          title="추억"
          onDelete={handleDelete}
          onClose={() => setIsDeleteOpen(false)}
        />
      )}
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
