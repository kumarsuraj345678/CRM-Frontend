import { useEffect, useRef, useState } from "react";
import "../styles/FilterContextMenu.css";
import DropdownMenu from "./DropdownMenu";

const FilterContextMenu = ({ menuPosition, setMenuPosition }) => {
  const menuRef = useRef();
  const [value, setValue] = useState("Today");

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuPosition(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [setMenuPosition]);

  if (!menuPosition) return null;

  return (
    <div
      ref={menuRef}
      className="context-menu"
      onClick={(e) => e.stopPropagation()}
      style={{
        top: Math.max(menuPosition.y, 10),
        left: Math.max(menuPosition.x - 170, 10),
      }}
    >
      <p className="menu-title">Filter</p>

      <DropdownMenu
        options={["Today", "All"]}
        value={value}
        onChange={setValue}
      />

      <button
        className="context-save-btn"
        onClick={() => setMenuPosition(null)}
      >
        Save
      </button>
    </div>
  );
};

export default FilterContextMenu;
