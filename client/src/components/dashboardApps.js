import { useEffect, useState } from "react";
import { fetchApps } from "../api/apps";
import ViewApps from "./viewApps";

const AppsComponent = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Function to fetch app data
    const fetchAppsList = async () => {
      try {
        const response = await fetchApps();
        setApps(response.data);
      } catch (error) {
        console.error("Error fetching app data:", error);
      }
    };

    fetchAppsList();
  }, []);

  return (
    <div>
      <ViewApps apps={apps} />
      <div className="row align-items-center mb-3">
        <div className="col">
          <strong className="fs-4">Your Apps</strong>
        </div>
        <div className="col">
          <button
            className="btn border border-dark rounded-pill"
            data-bs-toggle="offcanvas"
            data-bs-target="#viewApps"
            aria-controls="viewApps"
          >
            View All
          </button>
        </div>
      </div>
      {apps.map((app, index) => (
        <div className="m-1 row" key={index}>
          <div className="col-4 mb-2 d-flex align-items-center w-100 position-relative">
            <img
              src={`http://localhost:4000/${app.image_url.replace("\\", "/")}`}
              alt={`${app.name} icon`}
              className="me-2 rounded-5"
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <strong className="fs-4 mx-3">{app.name}</strong>
            <a
              href={app.app_link}
              className="stretched-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${app.name}`}
            ></a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppsComponent;
