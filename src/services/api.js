import axios from "axios";

const API = axios.create({
  baseURL: "https://crm-backend-1zni.onrender.com/api",
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