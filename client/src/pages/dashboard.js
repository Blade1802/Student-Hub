import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authCheck, onLogout } from "../api/auth";
import Layout from "../components/layout";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
      await authCheck();

      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Dashboard</h1>

        <button onClick={() => logout()} className="btn btn-primary">
          Logout
        </button>
      </Layout>
    </div>
  );
};

export default Dashboard;
