import React from "react";

const SidebarBadge = ({ count }) => {
  return count > 0 ? (
    <span className="badge bg-primary rounded-pill ms-auto">{count}</span>
  ) : (
    <span className="text-primary ms-auto pe-2">0</span>
  );
};

const Sidebar = ({
  studentCount,
  peopleCount,
  tasksCount,
  articlesCount,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light border-end"
      style={{ width: "280px", height: "100vh" }}
    >
      <button
        onClick={() => onCategoryChange("all")}
        className={`d-flex align-items-center  mb-md-0 btn text-decoration-none ${
          selectedCategory === "all" ? "link-primary" : "link-dark"
        }`}
      >
        <span className="fs-4">
          <i className="bi bi-bookmark me-2"></i>Search Results
        </span>
      </button>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto border-bottom pb-3">
        <li className="nav-item">
          <button
            onClick={() => onCategoryChange("student")}
            className={`nav-link d-flex justify-content-between align-items-center btn w-100 ${
              selectedCategory === "student" ? "" : "link-dark"
            }`}
          >
            <span>
              <i className="bi bi-person-circle me-2"></i>
              Student
            </span>
            <SidebarBadge count={studentCount} />
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
              <i className="bi bi-people-fill me-2"></i>
              People
            </span>
            <SidebarBadge count={peopleCount} />
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
              <i className="bi bi-table me-2"></i>
              Tasks and Reports
            </span>
            <SidebarBadge count={tasksCount} />
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
              <i className="bi bi-journal-text me-2"></i>
              Articles
            </span>
            <SidebarBadge count={articlesCount} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
