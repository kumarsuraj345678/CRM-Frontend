import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">
        Canova<span>CRM</span>
      </h2>
      <hr />

      <nav className="sidebar-menu">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "sidebar-menu-item active" : "sidebar-menu-item"
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/leads"
          className={({ isActive }) =>
            isActive ? "sidebar-menu-item active" : "sidebar-menu-item"
          }
        >
          Leads
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            isActive ? "sidebar-menu-item active" : "sidebar-menu-item"
          }
        >
          Employees
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "sidebar-menu-item active" : "sidebar-menu-item"
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
