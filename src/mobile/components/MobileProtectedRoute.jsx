import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MobileProtectedRoute = ({ children }) => {
  const reduxUser = useSelector((state) => state.authReducer.user);

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const user = reduxUser || storedUser;

  if (!user || user.role !== "employee") {
    return <Navigate to="/m/login" replace />;
  }

  return children;
};

export default MobileProtectedRoute;
