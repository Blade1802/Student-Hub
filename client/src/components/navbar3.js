import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook to navigate programmatically

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
      navigate("/");
    } catch (error) {
      console.log(error?.response || error); // Safe navigation operator for error response
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <i className="bi bi-mortarboard-fill"></i>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* <!-- Search form --> */}
          <div className="d-flex me-auto w-50">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
              />
            </div>
          </div>
          <ul className="navbar-nav">
            {/* Conditional rendering based on auth state */}
            {isAuth ? (
              <>
                {/* <!-- Other navbar items --> */}
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi bi-person-circle"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi bi-bell"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="bi bi-basket"></i>
                    </a>
                  </li>
                </ul>
                {/* Logout */}
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>
                    Logout <i className="bi bi-box-arrow-right"></i>
                  </button>
                </li>
              </>
            ) : (
              <>
                {/* Login/Register */}
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
