import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Pagination = ({ page, setPage, totalItems, itemsPerPage = 8 }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const safeTotalPages = totalPages === 0 ? 1 : totalPages;

  const getPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pages.push(i);
    }

    if (page > 4) pages.push("...");

    if (page > 3 && page < totalPages - 2) {
      pages.push(page);
    }

    if (page < totalPages - 3) pages.push("...");

    for (let i = Math.max(totalPages - 2, 4); i <= totalPages; i++) {
      pages.push(i);
    }

    return [...new Set(pages)];
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <FaArrowLeft className="icon" />
        <span>Previous</span>
      </button>

      <div className="page-numbers">
        {(totalPages === 0 ? [1] : getPageNumbers()).map((p, i) => (
          <span
            key={i}
            className={`page-number ${page === p ? "active" : ""}`}
            onClick={() => typeof p === "number" && setPage(p)}
            style={{ cursor: p === "..." ? "default" : "pointer" }}
          >
            {p}
          </span>
        ))}
      </div>

      <button
        className="page-btn"
        onClick={() => setPage(page + 1)}
        disabled={page === safeTotalPages}
      >
        <span>Next</span>
        <FaArrowRight className="icon" />
      </button>
    </div>
  );
};

export default Pagination;
