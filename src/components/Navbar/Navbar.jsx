import React from "react";
import "../../styles/Navbar.css";

import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

const Navbar = () => {
  const location = useLocation();

  const hideRoutes = ["/settings", "/m", "/m/profile"];

  const shouldHide = hideRoutes.includes(location.pathname);

  return <div className="navbar">{!shouldHide && <SearchBar />}</div>;
};

export default Navbar;
