import React, { useEffect, useRef } from "react";
import "../../src/styles/ContextMenu.css";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  onDelete,
  selectedCount,
}) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition({});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setMenuPosition]);
  if (!menuPosition.left) return null;

  return (
    <div
      ref={menuRef}
      className="context-menu"
      style={{
        top: menuPosition.top,
        left: menuPosition.left - (menuRef.current?.offsetWidth || 170),
      }}
    >
      <div
        className="menu-item"
        onClick={() => {
          console.log("Edit clicked");
          setMenuPosition({});
        }}
      >
        <div className="menu-icon">
          <MdOutlineModeEdit />
        </div>
        Edit
      </div>

      <div
        className="menu-item delete"
        onClick={() => {
          onDelete();
          setMenuPosition({});
        }}
      >
        <div className="menu-icon">
          <RiDeleteBin6Line />
        </div>
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
