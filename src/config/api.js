import axios from "axios";

// export const API_BASE_URL = "projectmanagementtoolbackend-production-86c3.up.railway.app";
export const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({ baseURL: API_BASE_URL, withCredentials: true });

// Interceptor ensures latest token is always picked up
api.interceptors.request.use(
  (config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
