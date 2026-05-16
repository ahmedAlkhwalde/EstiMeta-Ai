import axios from "axios";

export const API_BASE_URL = "http://192.168.1.4:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postChat = (payload) => api.post("/api/chat", payload).then((r) => r.data);
export const fetchUrlAsArrayBuffer = (url) => axios.get(url, { responseType: "arraybuffer" });

export default api;
