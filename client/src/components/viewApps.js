const ViewApps = ({ apps }) => {
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
        {apps.map((app, index) => (
          <div className="m-1 row" key={index}>
            <div className="col-6 mb-2 d-flex align-items-center position-relative">
              <img
                src={`http://localhost:4000/${app.image_url.replace(
                  "\\",
                  "/"
                )}`}
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
            <div className="col-6 d-flex align-items-center ms-auto">
              <span>
                <i class="bi bi-trash"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApps;
