import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/slices/searchSlice";
import { useLocation } from "react-router-dom";
import "../styles/SearchBar.css";

const SearchBar = ({ className = "" }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
    dispatch(
      setSearchQuery({
        text: "",
        page: location.pathname,
      }),
    );
  }, [location.pathname, dispatch]);

  const handleSearch = (e) => {
    const text = e.target.value;
    setValue(text);
    dispatch(
      setSearchQuery({
        text,
        page: location.pathname,
      }),
    );
  };

  return (
    <div className={`search-wrapper ${className}`}>
      <span className="search-icon">
        <FiSearch />
      </span>
      <input
        type="text"
        placeholder="Search here..."
        className="search-input"
        value={value}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
