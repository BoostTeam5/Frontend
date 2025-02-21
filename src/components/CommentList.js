import styled from "styled-components";
import deleteIcon from "../assets/deleteIcon.png";
import editIcon from "../assets/editIcon.png";
import line from "../assets/listLine.png";
import replyLine from "../assets/line.png";
import CommentModal from "./CommentModal";
import CreateCommentModal from "./CreateCommentModal";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import Button from "./Button";
import {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} from "../commentApi";
import dayjs from "dayjs"; // npm install dayjs 필요

// createdAt 형식 지정
const formatDate = (date) => {
  return dayjs(date).format("YY.MM.DD HH:mm");
};

function CommentItem({ comment, refreshComments }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // 댓글 수정 요청
  const handleUpdateComment = async (nickname, content, password) => {
    try {
      await updateComment(comment.id, nickname, content, password);
      setIsEditOpen(false);
      refreshComments();
    } catch (e) {
      console.error("댓글 수정 실패", e);
    }
  };

  // 댓글 삭제 요청
  const handleDeleteComment = async (password) => {
    try {
      await deleteComment(comment.id, password);
      setIsDeleteOpen(false);
      refreshComments();
    } catch (e) {
      console.error("댓글 삭제 실패", e);
    }
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
          <span style={{ color: "#b8b8b8" }}>
            {formatDate(comment.createdAt)}
          </span>
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
              onClick={() => setIsEditOpen(true)}
              style={{ width: "20px", cursor: "pointer" }}
            />
            <img
              src={deleteIcon}
              alt="댓글 삭제"
              onClick={() => setIsDeleteOpen(true)}
              style={{ width: "20px", cursor: "pointer" }}
            />
          </div>
        </div>
        <img src={replyLine} alt="댓글 구분선" />
      </div>
      {isEditOpen && (
        <CommentModal
          comment={comment}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleUpdateComment}
        />
      )}
      {isDeleteOpen && (
        <DeleteModal
          onClose={() => setIsDeleteOpen(false)}
          onDelete={handleDeleteComment}
          title="댓글"
        />
      )}
    </div>
  );
}

function CommentList({ postId, commentCount, setCommentCount }) {
  const [comments, setComments] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // 댓글 목록 조회회
  const fetchComments = async () => {
    try {
      const response = await getComments(postId, 1, 10);
      setComments(response.data);
      setCommentCount(response.data.length);
    } catch (e) {
      console.error("댓글 조회 실패", e);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // 댓글 등록 요청
  const handleCreateComment = async (nickname, content, password) => {
    try {
      await createComment(postId, nickname, content, password);
      fetchComments(); // 댓글 목록 새로고침
      setIsCreateOpen(false);
    } catch (e) {
      console.error("댓글 등록 실패", e);
    }
  };

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <Button
        onClick={() => setIsCreateOpen(true)}
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        댓글 등록하기
      </Button>
      {isCreateOpen && (
        <CreateCommentModal
          onClose={() => setIsCreateOpen(false)}
          onSubmit={handleCreateComment}
        />
      )}

      <div
        style={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span>댓글 {commentCount}</span>
        <img src={line} alt="구분선" />
        <ul style={{ padding: "0px" }}>
          {comments.map((comment) => (
            <li style={{ listStyle: "none" }} key={comment.id}>
              <CommentItem comment={comment} refreshComments={fetchComments} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CommentList;
