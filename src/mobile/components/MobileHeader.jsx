import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../styles/MobileHeader.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MobileHeader = ({ type = "home", title = "", name = "" }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const reduxUser = useSelector((state) => state.authReducer.user);
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const user = reduxUser || storedUser;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className={`mobile-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-top">
        <span className="brand">
          Canova<span className="highlight">CRM</span>
        </span>
      </div>

      <div className="header-bottom">
        {type === "home" ? (
          <>
            <p>{getGreeting()}</p>
            <h2>
              {user?.firstName} {user?.lastName}
            </h2>
          </>
        ) : (
          <div className="header-back">
            <IoIosArrowBack
              className="back-icon"
              onClick={() => navigate("/m")}
            />
            <h2>{title}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
