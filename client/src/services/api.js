import axios from "axios";


const API_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL_PROD 
  : import.meta.env.VITE_API_URL_DEV;

const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
    // In production, use /api (same origin); in local development, still use localhost:4000
  baseURL: API_URL,
});

// Attach JWT from Redux-persisted storage
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("olison_admin_token") ||
    sessionStorage.getItem("olison_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err.response?.data?.message || err.message || "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export default api;