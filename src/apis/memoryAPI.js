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
// export const putGroupInfo = async (groupId, updateData) => {
//   if (!groupId) {
//     console.error("❌ 그룹 ID가 없습니다.");
//     throw new Error("그룹 ID가 없습니다.");
//   }

//   console.log("📌 그룹 수정 요청 데이터:", updateData);
//   console.log("📌 그룹 수정 요청 URL:", `/api/groups/${groupId}`);

//   try {
//     const response = await api.put(`/api/groups/${groupId}`, updateData);
//     console.log("📌 그룹 수정 성공:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("📌 그룹 수정 실패:", error.response?.data || error);
//     throw error;
//   }
// };
// 그룹 수정 API (API 명세서에 맞게 수정)
export const putGroupInfo = async (groupId, updateData) => {
  try {
    // ✅ API 명세서에 맞는 데이터만 포함하도록 수정
    const requestData = {
      name: updateData.name, // 그룹명
      password: updateData.password, // 수정 권한 비밀번호 (필수)
      imageUrl: updateData.imageUrl, // 대표 이미지 URL
      isPublic: updateData.isPublic, // 공개 여부
      introduction: updateData.introduction, // 그룹 소개
    };

    console.log("📌 API 요청 데이터:", requestData);

    const response = await api.put(`/api/groups/${groupId}`, requestData);
    return response.data;
  } catch (error) {
    console.error("❌ 그룹 수정 요청 실패:", error.response?.data || error);
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

// formData라는 것도 있음!
export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file); // API 문서에 맞춰 key 이름을 "image"로 설정

    const response = await api.post(`/api/image`, formData, {
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

const MemoryApi = {
  createPost,
  readPosts,
  putGroupInfo,
  readGroupInfo,
  deleteGroup,
  uploadImage,
};

export default MemoryApi;
