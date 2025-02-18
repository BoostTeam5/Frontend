import api from "./instance";

// 추억 게시글 만들기  V
export const createPost = async (groupId, postData) => {
  try {
    const response = await api.post(`/api/groups/${groupId}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error("Post creation error:", error);
    throw error;
  }
};

// 그룹의 모든 게시글 조회  V  => 근데 렌더링을 못함 왜!!
export const readPosts = async (
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

// 그룹 수정 API
export const putGroupInfo = async (groupId, updateData) => {
  try {
    const response = await api.put(`/api/groups/${groupId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Post update error:", error);
    throw error;
  }
};

export const readGroupInfo = async (groupId) => {
  try {
    const response = await api.get(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Reading Group Infor Error occured : ", error);
    throw error;
  }
};

const MemoryApi = {
  createPost,
  readPosts,
  putGroupInfo,
  readGroupInfo,
};

export default MemoryApi;
