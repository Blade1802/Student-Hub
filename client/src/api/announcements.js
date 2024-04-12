import axios from "axios";
axios.defaults.withCredentials = true;

// API Fetch Tasks
export async function fetchAnnouncements() {
  return await axios.get(
    `http://localhost:4000/api/announcements/get-announcements`
  );
}

// API Create Tasks
export async function createAnnouncement(data) {
  return await axios.post(
    "http://localhost:4000/api/announcements/create-announcement",
    data
  );
}
