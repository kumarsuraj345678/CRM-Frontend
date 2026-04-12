import API from "../services/api";

export const fetchStatsAPI = async () => {
  const res = await API.get("/dashboard/stats");
  return res.data;
};

export const fetchSalesAPI = async () => {
  const res = await API.get("/dashboard/sales");
  return res.data;
};

export const fetchActivitiesAPI = async () => {
  const res = await API.get("/dashboard/activities");
  return res.data;
};

export const fetchEmployeeStatsAPI = async () => {
  const res = await API.get("/dashboard/employee-stats");
  return res.data;
};