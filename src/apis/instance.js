import axios from "axios";

const api = axios.create({
  baseURL: "http://54.180.25.217", // ✅ 실제 백엔드 서버 주소 입력
  //withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
