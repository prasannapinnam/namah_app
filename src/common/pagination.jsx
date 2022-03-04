import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

function Pagination({ movieCount, pageSize, onPageChange, currentPage }) {
  const totalPages = Math.ceil(movieCount / pageSize);
  const pages = _.range(1, totalPages + 1); //returns an array of certain range
  if (totalPages === 1) return null;

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a
              className={
                page === currentPage
                  ? "page-link"
                  : "page-link text-light bg-dark"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  movieCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
