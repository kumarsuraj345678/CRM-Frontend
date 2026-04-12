import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import "../styles/DropdownMenu.css";

const DropdownMenu = ({
  options = [],
  value,
  onChange,
  placeholder = "Select",
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`dropdown-container ${open ? "open" : ""}`}>
      <div
        className="dropdown"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <span>{value || placeholder}</span>
        <FiChevronDown className={`arrow ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div
              key={opt}
              className={`dropdown-item ${value === opt ? "active" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
