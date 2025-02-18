import axios from "axios";

// Axios 공통 인스턴스 생성
const api = axios.create({
  baseURL: "https://your-api-url.com", // API 기본 URL
  timeout: 5000, // 요청 제한 시간 (5초)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
