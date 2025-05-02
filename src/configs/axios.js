import axios from "axios";
import Cookies from "js-cookie";
import { headerMethods } from "../lib/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("auth-token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    if (headerMethods.includes(config.method.toUpperCase())) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 403) {
      Cookies.remove("auth-token");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
