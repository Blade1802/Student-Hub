import React from "react";

const SidebarBadge = ({ count }) => {
  if (count > 0) {
    return (
      <span className="badge bg-primary rounded-pill ms-auto">{count}</span>
    );
  } else {
    return <span className="text-primary ms-auto pe-2">0</span>;
  }
};

const Sidebar = ({ studentCount, peopleCount, tasksCount, articlesCount }) => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none"
      >
        <span className="fs-4 ms-2">
          <i class="bi bi-bookmark me-2"></i>Search Results
        </span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a
            href="#student"
            className="nav-link link-dark d-flex justify-content-between"
            aria-current="page"
          >
            <span>
              <i className="bi bi-person-circle me-2"></i>
              Student
            </span>
            <SidebarBadge count={studentCount} />
          </a>
        </li>
        <li>
          <a
            href="#people"
            className="nav-link link-dark d-flex justify-content-between"
          >
            <span>
              <i className="bi bi-people-fill me-2"></i>
              People
            </span>
            <SidebarBadge count={peopleCount} />
          </a>
        </li>
        <li>
          <a
            href="#tasks-reports"
            className="nav-link link-dark d-flex justify-content-between"
          >
            <span>
              <i className="bi bi-table me-2"></i>
              Tasks and Reports
            </span>
            <SidebarBadge count={tasksCount} />
          </a>
        </li>
        <li>
          <a
            href="#articles"
            className="nav-link link-dark d-flex justify-content-between"
          >
            <span>
              <i className="bi bi-journal-text me-2"></i>
              Articles
            </span>
            <SidebarBadge count={articlesCount} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
