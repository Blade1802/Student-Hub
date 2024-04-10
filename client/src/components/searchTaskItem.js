import TaskModel from "./taskModel";

const TASK_TYPE_MODAL_MAPPING = {
  "Create Task": TaskModel,
  // Add other mappings as necessary
};

const TaskItem = ({ task }) => {
  // Determine the appropriate modal component based on the task title
  const ModalComponent = TASK_TYPE_MODAL_MAPPING[task.title] || null;

  return (
    <>
      <div style={{ width: "65%" }}>
        <div className="card-body p-4">
          {ModalComponent ? (
            <>
              <a
                className="text-decoration-none"
                data-bs-toggle="modal"
                href="#taskModal"
              >
                <h5 className="text-primary">{task.title}</h5>
              </a>
              <ModalComponent />
            </>
          ) : (
            <h5 className="text-primary">{task.title}</h5>
          )}
          <p className="card-text text-secondary">Task</p>
        </div>
      </div>
      <ModalComponent />
    </>
  );
};

export default TaskItem;
