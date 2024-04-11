import { useRef, useState } from "react";
import { createApp } from "../api/apps";
import ToastComponent from "./toast";

const AppModel = () => {
  const [values, setValues] = useState({
    appName: "",
    appLink: "",
  });
  const appImageRef = useRef(null);
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const onChange = (e) => {
    if (e.target.name === "appImage") {
      // Check if there's a file selected
      if (e.target.files && e.target.files[0]) {
        // Update state to hold the selected file
        setValues({ ...values, [e.target.name]: e.target.files[0] });
      }
    } else {
      // For text inputs, store the value as usual
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("appName", values.appName);
      formData.append("appLink", values.appLink);
      if (appImageRef.current && appImageRef.current.files[0]) {
        formData.append("appImage", appImageRef.current.files[0]);
      }
      setToastMessage("App created successfully!");
      await createApp(formData);
      setToastSuccess(true);
      setShowToast(true);
      setValues({
        appName: "",
        appLink: "",
      });
      if (appImageRef.current) appImageRef.current.value = "";
      // Close the modal on successful submission
      const modalElement = document.getElementById("createAppModal");
      if (window.bootstrap && modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error creating app.");
      setToastSuccess(false);
      setShowToast(true);
    } finally {
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
      }, 5000);
    }
  };

  const closeToast = () => {
    setShowToast(false);
    setToastMessage("");
  };

  return (
    <>
      {/* App Model */}
      <div
        className="modal fade"
        id="createAppModal"
        tabIndex="-1"
        aria-labelledby="appModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="appModalLabel">
                Create App
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="appName" className="col-form-label">
                    App Name:
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    name="appName"
                    value={values.appName}
                    id="appName"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="appLink" className="col-form-label">
                    App Link:
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="url"
                    className="form-control"
                    name="appLink"
                    value={values.appLink}
                    id="appLink"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="appImage" className="col-form-label">
                    App Image:
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="file"
                    className="form-control"
                    name="appImage"
                    ref={appImageRef}
                    id="appImage"
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Create App
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastComponent
        id="createAppResponse"
        message={toastMessage}
        showToast={showToast}
        onClose={closeToast}
        isSuccess={toastSuccess}
      />
    </>
  );
};

export default AppModel;
