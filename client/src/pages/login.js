import { useState } from "react";
import { onLogin } from "../api/auth";
import Layout from "../components/layout";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await onLogin(values);
      dispatch(authenticateUser());

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <Layout>
      <form
        onSubmit={(e) => onSubmit(e)}
        className="bg-white border rounded-4 mx-auto p-4 w-50 mb-3 mt-5"
      >
        <h1 className="text-center mb-5">Login</h1>

        <div className="form-floating mb-3">
          <input
            onChange={(e) => onChange(e)}
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={values.email}
            placeholder="name@example.com"
            required
          />
          <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
};

export default Login;
