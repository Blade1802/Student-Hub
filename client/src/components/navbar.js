import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <NavLink className="navbar-brand px-1" to="/">
          <i className="bi bi-mortarboard-fill fs-4"></i>
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
          {/* Search Bar */}
          {isAuth && (
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
          )}

          {/* Other Nav Items */}
          <ul className="navbar-nav">
            {isAuth ? (
              <>
                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="#">
                    <i className="bi bi-bell fs-5"></i>
                  </NavLink>
                </li>
                <li className="nav-item px-1">
                  <NavLink className="nav-link" to="#">
                    <i className="bi bi-inbox fs-5"></i>
                  </NavLink>
                </li>
                <li className="nav-item dropdown px-1">
                  <button
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
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
