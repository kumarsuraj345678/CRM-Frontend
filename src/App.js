import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employees from "./pages/Employees/Employees";
import Leads from "./pages/Leads/Leads";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Auth/Login";

import MobileLayout from "./mobile/MobileLayout";
import Home from "./mobile/pages/Home";
import MobileLogin from "./mobile/pages/MobileLogin";
import MobileLeads from "./mobile/pages/MobileLeads";
import MobileSchedule from "./mobile/pages/MobileSchedule";
import MobileProfile from "./mobile/pages/MobileProfile";
import MobileProtectedRoute from "./mobile/components/MobileProtectedRoute";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/leads" element={<Leads />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/m/login" element={<MobileLogin />} />
        <Route
          path="/m"
          element={
            <MobileProtectedRoute>
              <MobileLayout />
            </MobileProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="leads" element={<MobileLeads />} />
          <Route path="schedule" element={<MobileSchedule />} />
          <Route path="profile" element={<MobileProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
