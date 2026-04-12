import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { ReactComponent as LeadsIcon } from "../icons/leads.svg";
import { ReactComponent as ScheduleIcon } from "../icons/schedule.svg";
import { ReactComponent as ProfileIcon } from "../icons/profile.svg";

import "../styles/BottomNav.css";

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      <NavLink to="/m" end>
        <div className="nav-item">
          <HomeIcon className="icon" />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink to="/m/leads">
        <div className="nav-item">
          <LeadsIcon className="icon" />
          <span>Leads</span>
        </div>
      </NavLink>

      <NavLink to="/m/schedule">
        <div className="nav-item">
          <ScheduleIcon className="icon" />
          <span>Schedule</span>
        </div>
      </NavLink>

      <NavLink to="/m/profile">
        <div className="nav-item">
          <ProfileIcon className="icon" />
          <span>Profile</span>
        </div>
      </NavLink>
    </div>
  );
};

export default BottomNav;
