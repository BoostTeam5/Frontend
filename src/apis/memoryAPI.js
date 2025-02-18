import api from "./instance";

// 추억 게시글 만들기
export const createPost = async (groupId, postData) => {
  try {
    const response = await api.post(`/api/groups/${groupId}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("Post creation error:", error);
    throw error;
  }
};

// 추억 게시글 읽기
export const readPost = async (
  page,
  pageSize,
  sortBy,
  keyword,
  isPublic,
  groupId
) => {
  try {
    const response = await api.get(`/api/groups/${groupId}/posts`);
  } catch (error) {
    console.error("Read creation error:", error);
    throw error;
  }
};

// 추억 수정하기
export const putMemory = async () => {
  try {
    const response = await api.put(`/api/posts/${postId}`, {});
  } catch (error) {}
};
const MemoryApi = {
  createPost,
  readPost,
  putMemory,
};
export default MemoryApi;
