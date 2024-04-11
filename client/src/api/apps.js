import axios from "axios";
axios.defaults.withCredentials = true;

// API Fetch Tasks
export async function fetchApps() {
  return await axios.get(`http://localhost:4000/api/apps/get-apps`);
}

// API Create App
export async function createApp(appData) {
  return await axios.post("http://localhost:4000/api/apps/upload-app", appData);
}

// API Delete App
export async function deleteApp(appID) {
  return await axios.delete(
    `http://localhost:4000/api/apps/delete-app/${appID}`
  );
}
