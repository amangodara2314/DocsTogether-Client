import api from "../configs/axios";

const login = async (email, password) => {
  return api.post("/auth/login", { email, password });
};

const signup = async (name, email, password) => {
  return api.post("/auth/register", { name, email, password });
};

const verifyEmail = async (token) => {
  return api.get("/auth/verify-email?token=" + token);
};

const getUser = async () => {
  return api.get("/auth/user");
};
export { login, signup, verifyEmail, getUser };
