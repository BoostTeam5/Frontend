import axios from "axios";

const BASE_URL = "http://localhost:5000/api/posts";

// 게시글 상세 조회 요청
export const getMemory = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${postId}`);
    return response.data;
  } catch (e) {
    console.error("추억 조회 실패", e);
    throw e;
  }
};

// 게시글 조회 권한 확인 (비밀번호 확인)
export const verifyMemoryPassword = async (postId, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/${postId}/verify-password`, {
      password,
    });
    return response.data;
  } catch (e) {
    console.error("비밀번호가 일치하지 않음", e);
    throw e;
  }
};

// 게시글 공감하기
export const likeMemory = async (postId) => {
  try {
    const response = await axios.post(`${BASE_URL}/${postId}/like`);
    return response.data;
  } catch (e) {
    console.error("공감 보내기 실패", e);
    throw e;
  }
};

// 게시글 수정 요청
export const updateMemory = async (postId, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${postId}`, updateData);
    return response.data;
  } catch (e) {
    console.error("추억 수정 실패", e);
    throw e;
  }
};

// 게시글 삭제 요청
export const deleteMemory = async (postId, postPassword) => {
  console.log(postId, postPassword);
  try {
    const response = await axios.delete(`${BASE_URL}/${postId}`, {
      data: { postPassword },
    });
    return response.data;
  } catch (e) {
    console.error("추억 삭제 실패", e);
    throw e;
  }
};

// 이미지
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // API 문서에 맞춰 key 이름을 "image"로 설정

    const response = await axios.post(`/api/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 Content-Type
      },
    });

    return response.data; // { "imageUrl": "string" }
  } catch (error) {
    console.log("failed to upload image", error);
    throw error;
  }
};
