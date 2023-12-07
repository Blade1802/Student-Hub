import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";

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
  }, []);

  return (
    <div className="bg-white border rounded-4">
      {tasks.map((task) => {
        return (
          <div key={task.task_id} className="d-flex flex-row position-relative">
            <div className="p-4">
              <i className="bi bi-inbox" style={{ fontSize: 30 }}></i>
            </div>
            <div className="d-flex flex-column p-2">
              <div className="p-2 fw-bold">{task.task_title}</div>
              <p className="p-2 text-secondary fs-6">
                {new Date(task.task_createdat).toDateString()}
              </p>
            </div>
            <a
              href={task.task_url}
              className="stretched-link"
              target="_blank"
            ></a>
          </div>
        );
      })}
    </div>
  );
};

export default InboxItem;
