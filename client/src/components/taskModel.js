import { useState } from "react";
import { createTasks } from "../api/tasks";
import { add } from "date-fns";
import ToastComponent from "./toast";

const TaskModel = () => {
  const [values, setValues] = useState({
    title: "",
    url: "",
    deadline: add(new Date(), { days: 7 }).toISOString().split("T")[0],
    user_type: "everyone",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTasks(values);
      setToastMessage("Task created successfully!");
      setToastSuccess(true);
      setShowToast(true);
      setValues({
        title: "",
        url: "",
        deadline: add(new Date(), { days: 7 }).toISOString().split("T")[0],
        user_type: "everyone",
      });
      // Close the modal on successful submission
      const modalElement = document.getElementById("createTaskModal");
      if (window.bootstrap && modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
    } catch (error) {
      console.log(error);
      setToastMessage("Error creating task.");
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
      {/* Task Model */}
      <div
        className="modal fade"
        id="createTaskModal"
        tabIndex="-1"
        aria-labelledby="taskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="taskModalLabel">
                Create Task for Students
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="modal-body row">
                <div className="mb-3">
                  <label htmlFor="title" className="col-form-label">
                    Title:
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="text"
                    className="form-control"
                    name="title"
                    value={values.title}
                    id="title"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="url" className="col-form-label">
                    URL:
                  </label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="url"
                    className="form-control"
                    name="url"
                    value={values.url}
                    id="url"
                    required
                  />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="deadline" className="col-form-label">
                    Deadline:
                  </label>
                  <input
                    onChange={onChange}
                    type="date"
                    className="form-control"
                    name="deadline"
                    value={values.deadline}
                    id="deadline"
                    min={new Date().toISOString().split("T")[0]} // Set minimum date to today
                    required
                  />
                </div>
                <div className="mb-3 col-6">
                  <label htmlFor="user_type" className="col-form-label">
                    User Type:
                  </label>
                  <select
                    onChange={(e) => onChange(e)}
                    className="form-select"
                    name="user_type"
                    value={values.user_type}
                    id="user_type"
                    required
                  >
                    <option value="everyone">Everyone</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                  </select>
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
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastComponent
        id="createTaskResponse"
        message={toastMessage}
        showToast={showToast}
        onClose={closeToast}
        isSuccess={toastSuccess}
      />
    </>
  );
};

export default TaskModel;
