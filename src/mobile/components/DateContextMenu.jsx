import React, { useEffect, useRef, useState } from "react";
import "../styles/DateContextMenu.css";

const DateContextMenu = ({ menuPosition, setMenuPosition, onSave }) => {
  const menuRef = useRef();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setMenuPosition]);
  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split("T")[0]);

    setTime(
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  if (!menuPosition) return null;

  return (
    <div
      ref={menuRef}
      className="date-menu"
      onClick={(e) => e.stopPropagation()}
      style={{
        top: menuPosition.y,
        left: Math.max(10, menuPosition.x - 180),
      }}
    >
      <div className="menu-group">
        <p className="menu-label">Date</p>
        <div className="input-box">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="menu-group">
        <p className="menu-label">Time</p>
        <div className="input-box">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <button
        className="context-save-btn"
        onClick={() => {
          onSave({ date, time });
          setMenuPosition(null);
        }}
      >
        Save
      </button>
    </div>
  );
};

export default DateContextMenu;
