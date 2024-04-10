// ToastComponent.js
import React, { useEffect } from "react";

const ToastComponent = ({ message, showToast, onClose, isSuccess }) => {
  useEffect(() => {
    if (showToast) {
      const toastEl = document.getElementById("serverResponseToast");
      const toast = new window.bootstrap.Toast(toastEl);
      toast.show();
    }
  }, [showToast]);

  const badgeClass = isSuccess ? "bg-success" : "bg-danger";

  return (
    <div
      id="serverResponseToast"
      className="toast align-items-center text-black bg-white border-1"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-delay="5000"
      style={{ position: "fixed", bottom: "5rem", right: "1rem", zIndex: 1060 }}
    >
      <div className="toast-header">
        <span className={`badge ${badgeClass} p-2`}>
          <span className="visually-hidden">Response</span>
        </span>
        <strong className="me-auto ms-1">Response</strong>
        <small>11 mins ago</small>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
          onClick={onClose}
        ></button>
      </div>
      <div className="d-flex">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default ToastComponent;
