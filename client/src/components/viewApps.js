import React from "react";
import { deleteApp } from "../api/apps";
import AppModel from "./appModel";

const ViewApps = ({ apps, setApps }) => {
  const handleClick = async (appId, appName) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${appName}?`
    );
    if (isConfirmed) {
      try {
        await deleteApp(appId);
        const updatedApps = apps.filter((app) => app.id !== appId);
        setApps(updatedApps);
      } catch (error) {
        console.error("Error deleting app:", error);
        // Optionally, update the UI to show an error message
      }
    }
  };

  const handleAppCreated = (newApp) => {
    setApps((currentApps) => [...currentApps, newApp]);
  };

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="viewApps"
      aria-labelledby="viewAppsLabel"
    >
      <style>
        {`
        .modal-backdrop.show {
          z-index: 1040; /* Ensure this is above the offcanvas backdrop z-index */
        }
        
        .modal {
          z-index: 1056; /* Ensure the modal is above its own backdrop */
        }
        `}
      </style>
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
      <AppModel onAppCreated={handleAppCreated} />
      <div className="offcanvas-body">
        <div className="d-flex justify-content-end mx-2">
          <button
            className="btn fs-4"
            data-bs-toggle="modal"
            data-bs-target="#createAppModal"
            aria-controls="createApp"
          >
            <i className="bi bi-plus-circle"></i>
          </button>
        </div>
        {apps.length > 0 ? (
          apps.map((app) => (
            <div className="row m-1 my-3 align-items-center" key={app.id}>
              <div className="col-10 col-sm-10 col-md-10 d-flex align-items-center position-relative">
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
                  onClick={() => handleClick(app.id, app.name)}
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
