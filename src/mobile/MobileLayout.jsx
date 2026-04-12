import React from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import "./styles/Mobile.css";

const MobileLayout = () => {
  return (
    <div className="mobile-wrapper">
      <div className="mobile-container">
        <div className="mobile-content">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default MobileLayout;
