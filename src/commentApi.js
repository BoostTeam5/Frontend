import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// 댓글 조회 요청
export const getComments = async (postId, page, pageSize) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/posts/${postId}/comments?page=${page}&pageSize=${pageSize}`
    );
    //const response = await axios.get(`${BASE_URL}/posts/${postId}/comments`, {params: {page, pageSize},});
    return response.data;
  } catch (e) {
    console.error("댓글 조회 실패", e);
    throw e;
  }
};

// 댓글 등록 요청
export const createComment = async (postId, nickname, content, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts/${postId}/comments`, {
      nickname,
      content,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("댓글 등록 실패", e);
    throw e;
  }
};

// 댓글 수정 요청
export const updateComment = async (commentId, nickname, content, password) => {
  try {
    const response = await axios.put(`${BASE_URL}/comments/${commentId}`, {
      nickname,
      content,
      password,
    });
    return response.data;
  } catch (e) {
    console.error("댓글 수정 실패", e);
    throw e;
  }
};

// 댓글 삭제 요청
export const deleteComment = async (commentId, password) => {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
      data: { password },
    });
    return response.data;
  } catch (e) {
    console.error("댓글 삭제 실패", e);
    throw e;
  }
};
