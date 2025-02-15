import styled from "styled-components";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";
import line from "../assets/listLine.png";
import replyLine from "../assets/line.png";
import CommentModal from "./CommentModal";
import DeleteModal from "./DeleteModal";
import { useState } from "react";

// 임시 데이터
const COMMENTS = [
  {
    id: 1,
    nickname: "다람이네 가족",
    content: "우와 60cm라니..!",
    password: "password",
    createdAt: "25.02.15",
  },
  {
    id: 2,
    nickname: "핑구",
    content: "저도 가족들과 가봐야겠어요~",
    password: "password",
    createdAt: "25.02.15",
  },
  {
    id: 3,
    nickname: "달팽스",
    content: "댓글달고감",
    password: "password",
    createdAt: "25.02.15",
  },
];

function CommentItem({ comment, onEdit, onDelete, onSubmit }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    setIsDeleteOpen(true);
    onDelete(comment.id);
  };

  const handleEdit = () => {
    setIsEditOpen(true);
    onEdit(comment.id);
  };

  const deleteTest = (password) => {
    if (comment.password === password) console.log("비밀번호 일치");
    else console.log("불일치. 다시 입력하세요");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <span>{comment.nickname}</span>
          <span>{comment.createdAt}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{comment.content}</span>
          <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
            <img
              src={editIcon}
              alt="댓글 수정"
              onClick={handleEdit}
              style={{ cursor: "pointer" }}
            />
            <img
              src={deleteIcon}
              alt="댓글 삭제"
              onClick={handleDelete}
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <img src={replyLine} alt="댓글 구분선" />
      </div>
      {isEditOpen && (
        <CommentModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={onSubmit}
          currentData={comment}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          onClose={() => setIsDeleteOpen(false)}
          onDelete={deleteTest}
          title="댓글"
        />
      )}
    </div>
  );
}

function CommentList({ comments = COMMENTS, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = () => {};

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>댓글 8</span>
      <img src={line} alt="구분선" />
      <ul style={{ padding: "0px" }}>
        {comments.map((comment) => {
          if (comment.id === editingId) {
            const { id, nickname, content, password, createdAt } = comment;
            const currentData = { nickname, content, password, createdAt };

            // 댓글 수정 api 연동하기
            const handleSubmit = (formData) => onUpdate(id, formData);

            return (
              <li style={{ listStyle: "none" }} key={comment.id}>
                <CommentItem comment={currentData} onSubmit={handleSubmit} />
              </li>
            );
          }
          return (
            <li style={{ listStyle: "none" }} key={comment.id}>
              <CommentItem
                comment={comment}
                onDelete={onDelete}
                onEdit={setEditingId}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CommentList;
