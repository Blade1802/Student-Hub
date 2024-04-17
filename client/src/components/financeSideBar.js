import React from "react";

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end"
      style={{ width: "280px" }}
    >
      <div className="fs-4 p-2">
        <i className="bi bi-bank2 me-3"></i>
        <strong>Financials</strong>
      </div>

      <hr />
      <ul className="nav nav-pills flex-column mb-auto border-bottom pb-3">
        <li className="nav-item">
          <button
            onClick={() => onCategoryChange("overview")}
            className={`nav-link d-flex justify-content-between align-items-center btn w-100 ${
              selectedCategory === "overview" ? "" : "link-dark"
            }`}
          >
            <span>
              <i className="bi bi-megaphone me-2"></i>
              Overview
            </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onCategoryChange("people")}
            className={`nav-link d-flex justify-content-between align-items-center btn w-100 ${
              selectedCategory === "people" ? "" : "link-dark"
            }`}
          >
            <span>
              <i className="bi bi-credit-card me-2"></i>
              Manage Payments
            </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onCategoryChange("tasks")}
            className={`nav-link d-flex justify-content-between align-items-center btn w-100 ${
              selectedCategory === "tasks" ? "" : "link-dark"
            }`}
          >
            <span>
              <i className="bi bi-cash me-2"></i>
              Financial Aid
            </span>
          </button>
        </li>
        <li>
          <button
            onClick={() => onCategoryChange("articles")}
            className={`nav-link d-flex justify-content-between align-items-center btn w-100 ${
              selectedCategory === "articles" ? "" : "link-dark"
            }`}
          >
            <span>
              <i className="bi bi-files me-2"></i>
              Documents
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
