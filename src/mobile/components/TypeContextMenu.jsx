import React, { useEffect, useRef } from "react";
import "../styles/TypeContextMenu.css";

const TypeContextMenu = ({ menuPosition, setMenuPosition, onSelectType }) => {
  const menuRef = useRef();

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
    <div
      ref={menuRef}
      className="type-context-menu"
      style={{
        top: menuPosition.y,
        left: Math.max(10, menuPosition.x - 80),
      }}
    >
      <p className="type-menu-title">Type</p>

      <button
        className="menu-btn hot"
        onClick={() => {
          onSelectType("Hot");
          setMenuPosition(null);
        }}
      >
        Hot
      </button>

      <button
        className="menu-btn warm"
        onClick={() => {
          onSelectType("Warm");
          setMenuPosition(null);
        }}
      >
        Warm
      </button>

      <button
        className="menu-btn cold"
        onClick={() => {
          onSelectType("Cold");
          setMenuPosition(null);
        }}
      >
        Cold
      </button>
    </div>
  );
};

export default TypeContextMenu;
