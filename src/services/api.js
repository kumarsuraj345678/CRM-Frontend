import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
API.interceptors.request.use((req) => {
  const adminToken = localStorage.getItem("adminToken");
  const employeeToken = localStorage.getItem("employeeToken");

  const token = adminToken || employeeToken;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;