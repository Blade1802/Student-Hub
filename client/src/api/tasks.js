import axios from "axios";
axios.defaults.withCredentials = true;

// API Fetch Tasks
export async function fetchTasks(user_id) {
  return await axios.get(`http://localhost:4000/api/get-tasks/${user_id}`);
}
