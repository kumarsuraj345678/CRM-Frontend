import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchStatsAPI,
  fetchSalesAPI,
  fetchActivitiesAPI,
  fetchEmployeeStatsAPI,
} from "../dashboardApi";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    return await fetchStatsAPI();
  },
);

export const fetchSalesData = createAsyncThunk(
  "dashboard/fetchSales",
  async () => {
    return await fetchSalesAPI();
  },
);

export const fetchActivities = createAsyncThunk(
  "dashboard/fetchActivities",
  async () => {
    return await fetchActivitiesAPI();
  },
);
export const fetchEmployeeStats = createAsyncThunk(
  "dashboard/fetchEmployeeStats",
  async () => {
    return await fetchEmployeeStatsAPI();
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    employeeStats: [],
    stats: {},
    salesData: [],
    activities: [],
    loading: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.salesData = action.payload;
      })

      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.activities = action.payload;
      })
      .addCase(fetchEmployeeStats.fulfilled, (state, action) => {
        state.employeeStats = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
