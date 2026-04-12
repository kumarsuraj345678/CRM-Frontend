import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slices/employeeSlice";
import dashboardReducer from "./slices/dashboardSlice";
import leadReducer from "./slices/leadSlice";
import searchReducer from "./slices/searchSlice";
import authReducer from "./slices/authSlice";
export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    dashboard: dashboardReducer,
    employees: employeeReducer,
    leads: leadReducer,
    search: searchReducer,
  },
});
