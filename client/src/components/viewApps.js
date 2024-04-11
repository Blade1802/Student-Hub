import React from "react";
import { deleteApp } from "../api/apps";

const ViewApps = ({ apps, setApps }) => {
  const handleClick = async (appId) => {
    try {
      // Call the API to delete the app
      await deleteApp(appId);
      // Filter out the deleted app from the apps state
      const updatedApps = apps.filter((app) => app.id !== appId);
      setApps(updatedApps); // Update state
    } catch (error) {
      console.error("Error deleting app:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="viewApps"
      aria-labelledby="viewAppsLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="viewAppsLabel">
          All Apps
        </h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        {apps.length > 0 ? (
          apps.map((app, index) => (
            <div className="row m-1 align-items-center" key={app.id || index}>
              <div className="col-10 col-sm-10 col-md-10 d-flex align-items-center  position-relative">
                <img
                  src={`http://localhost:4000/${app.image_url.replace(
                    "\\",
                    "/"
                  )}`}
                  alt={`${app.name} icon`}
                  className="me-2 rounded-5"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <strong className="fs-5 mx-2">{app.name}</strong>
                <a
                  href={app.app_link}
                  className="stretched-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${app.name}`}
                ></a>
              </div>
              <div className="col-2 col-sm-2 col-md-2 text-end">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleClick(app.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No apps available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewApps;
