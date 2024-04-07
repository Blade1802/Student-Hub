import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";
import { formatDistance } from "date-fns";
import "./inboxItem.css";

const InboxItem = ({ user_id }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const response = await fetchTasks(user_id);
        setTasks(response.data.tasks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasksList();
  }, [user_id]);

  const isDueWithinAWeek = (deadline) => {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7); // Set to 7 days after today

    return new Date(deadline) <= oneWeekLater;
  };

  return (
    <div className="bg-white border rounded-4">
      {tasks.map((task) => {
        const relativeTime = formatDistance(
          new Date(task.task_createdat),
          new Date(),
          { addSuffix: true }
        );
        const deadlineIsSoon = isDueWithinAWeek(task.task_deadline);

        return (
          <div
            key={task.task_id}
            className="task-container d-flex flex-row position-relative"
          >
            <div className="p-4 d-flex align-items-center justify-content-center">
              <i className="p-2 bi bi-inbox border rounded-circle d-flex align-items-center justify-content-center icon"></i>
            </div>
            <div className="d-flex flex-column p-2">
              <div className="p-2 fw-bold">{task.task_title}</div>
              <span className="p-2 text-secondary fs-6">{relativeTime}</span>
              {deadlineIsSoon && (
                <span
                  className="mx-2 px-1 bg-danger-subtle text-danger fw-bold width-0"
                  style={{ maxWidth: "max-content" }}
                >
                  DUE {new Date(task.task_deadline).toLocaleDateString()}
                </span>
              )}
            </div>
            <a
              href={task.task_url}
              className="stretched-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${task.task_title}`}
            ></a>
          </div>
        );
      })}
    </div>
  );
};

export default InboxItem;
