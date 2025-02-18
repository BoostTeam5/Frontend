import api from "./instance";

// 📌 [추억 게시글 만들기]
export const createPost = async (groupId = 1, postData) => {
  try {
    const response = await api.post(`/api/groups/${groupId}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("Post creation error:", error);
    throw error;
  }
};

// 📌 [추억 게시글 조회]
export const readPost = async (
  groupId,
  page,
  pageSize,
  sortBy,
  keyword,
  isPublic
) => {
  try {
    const response = await api.get(`/api/groups/${groupId}/posts`, {
      params: { page, pageSize, sortBy, keyword, isPublic },
    });
    return response.data;
  } catch (error) {
    console.error("Read post error:", error);
    throw error;
  }
};

// 📌 [추억 수정 API]
export const putMemory = async (postId, updateData) => {
  try {
    const response = await api.put(`/api/posts/${postId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Post update error:", error);
    throw error;
  }
};

const MemoryApi = {
  createPost,
  readPost,
  putMemory,
};

export default MemoryApi;
