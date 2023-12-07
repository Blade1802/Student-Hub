import { useEffect, useState } from "react";
import { createTasks } from "../api/tasks";

const TaskModel = () => {
  const [values, setValues] = useState({
    title: "",
    url: "",
  });
  const [response, setResponse] = useState();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setResponse(await createTasks(values));
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setResponse(error);
    }
  };

  useEffect(() => {});

  return (
    <div>
      {/* Task Model Button */}
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#taskModal"
      >
        Create Task
      </button>

      {/* Task Model */}
      <div
        className="modal fade"
        id="taskModal"
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
              <div className="modal-body">
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
                    type="text"
                    className="form-control"
                    name="url"
                    value={values.url}
                    id="url"
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModel;
