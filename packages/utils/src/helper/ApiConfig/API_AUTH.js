import axios from "axios";
import { URL_CONFIG } from "../../Config/URLs";
import { getAuthToken } from "./API_Helper";
import { refreshAccessToken } from "./AuthService";
import { getAppName } from "../Helper"; // your helper file

// Create axios instance
const API_AUTH = axios.create({
  baseURL: URL_CONFIG.API_URL,
  withCredentials: true, // ensures cookies (refresh token) are sent
});

// Request interceptor → attach token + app name
API_AUTH.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["X-App-Client"] = getAppName(); // 👈 always include app name
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle 401 and refresh token
API_AUTH.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest); // ✅ Retry using same axios instance
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API_AUTH;
