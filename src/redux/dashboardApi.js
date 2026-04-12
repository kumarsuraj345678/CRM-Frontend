import axios from "axios";

const API = "http://localhost:5000/api/dashboard";

export const fetchStatsAPI = async () => {
  const res = await axios.get(`${API}/stats`);
  return res.data;
};

export const fetchSalesAPI = async () => {
  const res = await axios.get(`${API}/sales`);
  return res.data;
};

export const fetchActivitiesAPI = async () => {
  const res = await axios.get(`${API}/activities`);
  return res.data;
};

export const fetchEmployeeStatsAPI = async () => {
  const res = await axios.get(`${API}/employee-stats`);
  return res.data;
};
