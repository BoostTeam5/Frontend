import styled from "styled-components";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";
import line from "../assets/listLine.png";
import replyLine from "../assets/line.png";
import CommentModal from "./CommentModal";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "../commentApi";

function CommentItem({ comment, onEdit, onDelete }) {
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
          <span style={{ color: "#b8b8b8" }}>{comment.createdAt}</span>
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
              style={{ width: "20px", cursor: "pointer" }}
            />
            <img
              src={deleteIcon}
              alt="댓글 삭제"
              onClick={handleDelete}
              style={{ width: "20px", cursor: "pointer" }}
            />
          </div>
        </div>
        <img src={replyLine} alt="댓글 구분선" />
      </div>
      {isEditOpen && (
        <CommentModal
          onClose={() => setIsEditOpen(false)}
          onSubmit={onEdit}
          currentData={comment}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          onClose={() => setIsDeleteOpen(false)}
          onDelete={onDelete}
          title="댓글"
        />
      )}
    </div>
  );
}

function CommentList({ postId, commentCount }) {
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(commentCount);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newComment, setNewComment] = useState({
    nickname: "",
    content: "",
    password: "",
  });

  const fetchComments = async () => {
    try {
      const response = await getComments(postId, 1, 10);
      setComments(response.data);
    } catch (e) {
      console.error("댓글 조회 실패", e);
    }
  };

  // 댓글 등록 요청
  const handleCreateComment = async (e) => {
    e.preventDefault();
    try {
      const { nickname, content, password } = newComment;
      const response = await createComment(postId, nickname, content, password);
      setComments((prev) => [...prev, response]);
      setCommentsCount((prev) => prev + 1);
      setIsCreateOpen(false);
    } catch (e) {
      console.error("댓글 등록 실패", e);
    }
  };

  // 댓글 수정 요청
  const handleUpdateComment = async (id, updatedData) => {
    try {
      await updateComment(
        id,
        updatedData.nickname,
        updatedData.content,
        updatedData.password
      );
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === id ? { ...comment, ...updatedData } : comment
        )
      );
    } catch (e) {
      console.error("댓글 수정 실패", e);
    }
  };

  // 댓글 삭제 요청
  const handleDeleteComment = async (id, password) => {
    try {
      await deleteComment(id, password);
      setComments((prev) => prev.filter((comment) => comment.id !== id));
      setCommentsCount((prev) => prev - 1);
    } catch (e) {
      console.error("댓글 삭제 실패", e);
    }
  };

  // 댓글 등록 모드로 열기
  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };

  // 댓글 수정 모드로 열기
  const handleEditComment = (id) => {
    setEditingId(id);
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <Button
        onClick={handleCreateClick}
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        댓글 등록하기
      </Button>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span>댓글 {commentsCount}</span>
        <img src={line} alt="구분선" />
        <ul style={{ padding: "0px" }}>
          {comments.map((comment) => (
            <li style={{ listStyle: "none" }} key={comment.id}>
              <CommentItem
                comment={comment}
                onEdit={
                  comment.id === editingId
                    ? handleUpdateComment
                    : handleEditComment
                }
                onDelete={handleDeleteComment}
              />
            </li>
          ))}
        </ul>
      </div>
      {isCreateOpen && (
        <CommentModal
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateComment}
          comment={newComment}
          setComment={setNewComment}
        />
      )}
    </div>
  );
}

export default CommentList;
