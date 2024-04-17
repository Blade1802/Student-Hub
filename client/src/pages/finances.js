// src/components/FinancialOverviewPage.js
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authCheck, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout";
import Sidebar from "../components/financeSideBar";
import { fetchPayments } from "../api/finances";

const FinancialOverviewPage = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("overview");
  const [user, setUser] = useState();
  const [payments, setPayments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = payments.length - 4;

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

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
      if (user?.user_id) {
        try {
          const response = await fetchPayments(user.user_id);
          setPayments(response.data.payments);
        } catch (error) {
          console.error("Fetch payments error:", error);
        }
      }
    };

    if (user) {
      fetchTasksList();
    }
  }, [user]);

  return (
    <>
      <style>
        {`
        .payments-container {
          overflow: hidden;
          transition: max-height 0.5s ease-in-out;
        }
        
        .payments-container.collapsed {
          max-height: 400px;  */
        }
        
        .payments-container.expanded {
          max-height: 600px;  */
        }
        `}
      </style>
      <Layout>
        <div className="container-fluid p-0">
          <div className="d-flex" id="wrapper">
            {/* Sidebar */}
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="container-fluid p-5 bg-white min-vh-100">
              <strong className="fs-4">Financials Overview</strong>

              {/* Main Content */}
              <div className="d-flex mt-4 w-75">
                <div
                  className="card me-3 w-50"
                  style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="card-body p-4">
                    <h5 className="card-title">
                      <span>
                        <i className="bi bi-bank2 me-3"></i>
                      </span>
                      Recent Payments
                    </h5>
                    <p className="card-text text-secondary">
                      A list of your most recently received student payments
                    </p>
                    <div
                      className={`mt-4 ${
                        showAll
                          ? "payments-container expanded"
                          : "payments-container collapsed"
                      }`}
                    >
                      {payments
                        .slice(0, showAll ? payments.length : 4)
                        .map((payment, index) => (
                          <div key={index} className="mb-4">
                            <strong>
                              €{payment.payment_amount} -{" "}
                              {payment.payment_method}
                            </strong>
                            <p className="text-secondary">
                              {new Date(
                                payment.payment_date
                              ).toLocaleDateString("en-GB")}
                            </p>
                          </div>
                        ))}
                      {payments.length > 4 && (
                        <button
                          className="btn w-100 p-2 mt-4 bg-light"
                          onClick={() => toggleShowAll()}
                          style={{
                            borderRadius: "20px",
                            border: "1px solid #ddd",
                          }}
                        >
                          <i className="bi bi-list mx-2"></i>
                          <span>
                            {showAll ? "Less" : `More (${hiddenCount})`}
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="mt-auto">
                      <hr />
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="#" className="text-decoration-none fw-bold">
                          View Account Activity
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="card ms-3 w-50"
                  style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                >
                  <div className="card-body d-flex flex-column p-4">
                    {" "}
                    {/* Flex container */}
                    <h5 className="card-title">
                      <span>
                        <i className="bi bi-cash-stack me-3"></i>
                      </span>
                      Due Now
                    </h5>
                    <p className="card-text text-secondary">
                      The sum of past and current charges due before or within
                      30 days
                    </p>
                    <div className="mt-4 flex-grow-1">
                      <h1 className="text-center">€3,189.00</h1>
                      <p className="card-text text-secondary text-center">
                        This amount includes anticipated payments
                      </p>
                    </div>
                    {/* Payment link section */}
                    <div className="mt-auto">
                      <hr />
                      <div>
                        <a
                          href="https://buy.stripe.com/test_aEUbLucNt84k5zibII"
                          className="text-decoration-none fw-bold"
                        >
                          Make a Payment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default FinancialOverviewPage;
