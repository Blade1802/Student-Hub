import TaskModel from "./taskModel";

const TASK_TYPE_MODAL_MAPPING = {
  "create task": { component: TaskModel, modalId: "createTaskModal" },
  // Add other mappings as necessary
};

const TaskItem = ({ task }) => {
  const taskInfo = TASK_TYPE_MODAL_MAPPING[task.title.toLowerCase()];
  const ModalComponent = taskInfo ? taskInfo.component : null;
  const modalId = taskInfo ? taskInfo.modalId : "";

  return (
    <>
      <div style={{ width: "65%" }}>
        <div className="card-body p-4">
          {ModalComponent ? (
            <>
              <a
                className="text-decoration-none"
                data-bs-toggle="modal"
                href={`#${modalId}`}
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
