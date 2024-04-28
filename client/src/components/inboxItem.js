import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";
import { add, formatDistance, startOfDay } from "date-fns";

const InboxItem = ({ user_id }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const response = await fetchTasks(user_id);
        const sortedTasks = response.data.tasks.sort(
          (a, b) => new Date(a.task_deadline) - new Date(b.task_deadline)
        );
        setTasks(sortedTasks.slice(0, 3)); // Keep only the first 3 tasks
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasksList();
  }, [user_id]);

  const oneWeekLater = add(new Date(), { days: 7 });

  const isDueWithinAWeek = (deadline) => {
    return new Date(deadline) <= oneWeekLater;
  };

  return (
    <div
      className="bg-white border rounded-4"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
    >
      <style>
        {`
        .task-container {
          transition: border 0.3s ease;
          border: 1px solid transparent;
        }
        
        .task-container:hover {
          /* border: 1px solid #007bff; */
          border: 1px solid #000000;
          cursor: pointer;
        }
        
        .icon {
          font-size: 30px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 50%;
        }
        `}
      </style>
      {tasks.map((task) => {
        const relativeTime = formatDistance(
          new Date(task.task_createdat),
          startOfDay(new Date()),
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
                  DUE{" "}
                  {new Date(task.task_deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
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
