// api/search.js
import axios from "axios";
axios.defaults.withCredentials = true;

export const fetchSearchResults = async (query) => {
  // Construct the URL parameters
  const params = {
    query: query,
  };

  // Make the HTTP GET request using Axios
  const response = await axios.get(
    "http://localhost:4000/api/students/search",
    { params }
  );

  return response.data;
};
