import React, { useEffect, useRef, useState } from "react";
import "../styles/StatusContextMenu.css";
import { FiInfo } from "react-icons/fi";
import DropdownMenu from "./DropdownMenu";

const StatusContextMenu = ({ menuPosition, setMenuPosition, onSave }) => {
  const menuRef = useRef();

  const [status, setStatus] = useState("Ongoing");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setMenuPosition]);

  if (!menuPosition) return null;

  return (
    <>
      {showTooltip && (
        <div
          className="status-tooltip"
          style={{
            top: menuPosition.y - 10,
            left: menuPosition.x + 10,
          }}
        >
          Lead can not be closed if scheduled
        </div>
      )}

      <div
        ref={menuRef}
        className="status-menu"
        style={{
          top: menuPosition.y,
          left: Math.max(10, menuPosition.x - 180),
        }}
      >
        <div className="menu-header">
          <p>Lead Status</p>
          <FiInfo
            className="info-icon"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(!showTooltip);
            }}
          />
        </div>

        <DropdownMenu
          options={["Ongoing", "Closed"]}
          value={status}
          onChange={(val) => {
            if (val === "Closed") {
              setShowTooltip(true);
              return;
            }
            setStatus(val);
          }}
        />

        <button
          className="context-save-btn"
          onClick={() => {
            onSave(status);
            setMenuPosition(null);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default StatusContextMenu;
