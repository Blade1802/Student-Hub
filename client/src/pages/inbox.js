import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authCheck, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Layout from "../components/layout";
import Loading from "../components/loading";
import { fetchTasks } from "../api/tasks";
import { formatDistance, startOfDay } from "date-fns";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [tasks, setTasks] = useState([]);

  const logout = async () => {
    try {
      await onLogout();

      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const checkAuth = async () => {
    try {
      setUser((await authCheck()).data.user);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchTasksList = async () => {
      try {
        const response = await fetchTasks(user.user_id);
        const sortedTasks = response.data.tasks.sort(
          (b, a) => new Date(a.task_createdat) - new Date(b.task_createdat)
        );
        setTasks(sortedTasks);
      } catch (error) {
        console.log(error);
      }
    };

    user && fetchTasksList();
  }, [user]);

  return loading ? (
    <Layout>
      <Loading />
    </Layout>
  ) : (
    <Layout>
      <div className="bg-primary text-white px-4 py-3">
        <strong className="fs-4">Inbox</strong>
      </div>
      <div
        className="d-flex p-3 flex-column align-items-stretch flex-shrink-0 bg-light border-end"
        style={{ width: "380px", height: "100vh" }}
      >
        <div className="list-group list-group-flush border-bottom scrollarea">
          {tasks.map((task) => {
            const relativeTime = formatDistance(
              new Date(task.task_createdat),
              startOfDay(new Date()),
              { addSuffix: true }
            );
            return (
              <a
                href="#"
                className="list-group-item list-group-item-action py-3 lh-tight bg-light"
                aria-current="true"
                key={task.task_id}
              >
                <div className="d-flex w-100 align-items-center justify-content-between">
                  <strong className="mb-1">{task.task_title}</strong>
                  <small></small>
                </div>
                <div className="col-10 mb-1 small">
                  {relativeTime} - Due{" "}
                  {new Date(task.task_deadline).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
