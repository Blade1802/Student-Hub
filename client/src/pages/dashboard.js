import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authCheck, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Layout from "../components/layout";
import Header from "../components/header";
import Footer from "../components/footer";
import InboxItem from "../components/inboxItem";
import TaskModel from "../components/taskModel";
import Navbar from "../components/navbar";
import Loading from "../components/loading";

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
    ", " +
    today.toLocaleString("default", { month: "long" }) +
    " " +
    today.getDate() +
    " " +
    today.getFullYear();

  return loading ? (
    <Layout>
      <Loading />
    </Layout>
  ) : (
    <div>
      <Navbar />
      <Header />
      <div className="container">
        {/* <h1 className="text-center mt-3">
          {user.user_type === "admin" ? "Admin " : "Student "}Dashboard
        </h1> */}
        <div className="row mt-5">
          <div className="col-4">
            <dt className="fs-2">
              {today.getHours() < 12 ? "Good Morning" : "Good Afternoon"},{" "}
              {user.user_name}
            </dt>
            <dt className="text-secondary mt-5 fs-5">It's {todayDate}</dt>
          </div>
          <div className="col">
            <dt className="fs-4">Inbox</dt>
            <div className="mt-5">
              <InboxItem user_id={user.user_id} />
            </div>
          </div>
        </div>
        <TaskModel />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
