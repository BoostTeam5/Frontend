import axios from "axios";

const api = axios.create({
  // baseURL이 "/api/teams"인 경우, 호출 시 endpoint 앞에 "/teams"를 다시 붙이면 중복되므로 주의!
  baseURL: "http://localhost:5000/api/teams",
  headers: {
    "Content-Type": "application/json",
  },
});

// 그룹 생성 API (POST) - 실제 엔드포인트가 "/create"라면 아래와 같이 사용
export const buildGroup = async (groupData) => {
  const response = await api.post("/create", groupData);
  return response.data;
};

// 전체 그룹 조회 API (GET)
export const fetchGroups = async () => {
  const response = await api.get("/");
  return response.data;
};

// 특정 그룹 상세 조회 API (GET)
export const fetchGroupDetail = async (groupId) => {
  const response = await api.get(`/${groupId}`);
  return response.data;
};

// 그룹 비밀번호 확인 API (POST)
export const verifyGroupPassword = async (groupId, password) => {
  const response = await api.post(`/${groupId}/verify-password`, { password });
  return response.data;
};
