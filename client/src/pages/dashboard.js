import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authCheck, onLogout } from "../api/auth";
import Layout from "../components/layout";
import { unauthenticateUser } from "../redux/slices/authSlice";
import InboxItem from "../components/inboxItem";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

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
  }, []);

  const today = new Date();
  const todayDate =
    today.toLocaleDateString("default", { weekday: "long" }) +
    " " +
    today.toLocaleString("default", { month: "long" }) +
    " " +
    today.getDate() +
    " " +
    today.getFullYear();

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1 className="text-center">
          {user.user_type === "admin" ? "Admin " : "Student "}Dashboard
        </h1>
        <div className="row mt-5">
          <div className="col-4">
            <h2>
              {today.getHours() < 12 ? "Good Morning" : "Good Afternoon"},{" "}
              {user.user_name}
            </h2>
            <h5 className="text-secondary mt-5">It's {todayDate}</h5>
          </div>
          <div className="col">
            <h4>Inbox</h4>
            <div className="mt-5">
              <InboxItem user_id={user.user_id} />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
