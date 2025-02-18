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

// 그룹 수정 API   뭔가 문제있음
export const putGroupInfo = async (groupId, updateData) => {
  try {
    const response = await api.put(`/api/groups/${groupId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Post update error:", error);
    throw error;
  }
};

// 그룹 정보 가져오기  V 이것도 완료
export const readGroupInfo = async (groupId) => {
  try {
    const response = await api.get(`/api/groups/${groupId}`);
    return response.data;
  } catch (error) {
    console.error("Reading Group Infor Error occured : ", error);
    throw error;
  }
};

// 그룹 삭제하기     V 어찌저찌 연결 완료 GPT 덕분
export const deleteGroup = async (groupId, password) => {
  try {
    const response = await api.delete(`/api/groups/${groupId}`, {
      data: { password }, // DELETE 요청의 body에 password 포함
    });
    return response.data; // 성공하면 응답 반환
  } catch (error) {
    console.error("failed to delete Group", error);
    throw error;
  }
};

const MemoryApi = {
  createPost,
  readPosts,
  putGroupInfo,
  readGroupInfo,
  deleteGroup,
};

export default MemoryApi;
