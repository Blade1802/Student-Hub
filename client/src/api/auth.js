import axios from "axios";
axios.defaults.withCredentials = true;

// API Login
export async function onLogin(loginData) {
  return await axios.post("http://localhost:4000/api/login", loginData);
}

// API User Authentication Check
export async function authCheck() {
  return await axios.get("http://localhost:4000/api/authCheck");
}

// API Logout
export async function onLogout() {
  return await axios.get("http://localhost:4000/api/logout");
}

// API Fetch Protected Data
export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:4000/api/protected");
}
