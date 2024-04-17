import axios from "axios";
axios.defaults.withCredentials = true;

// API Fetch Payments
export async function fetchPayments(user_id) {
  return await axios.get(
    `http://localhost:4000/api/finances/get-payments/${user_id}`
  );
}
