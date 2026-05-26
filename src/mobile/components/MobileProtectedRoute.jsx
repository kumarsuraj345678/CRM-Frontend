import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const MobileProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/m/login" replace />;
  }

  return children;
};

export default MobileProtectedRoute;
