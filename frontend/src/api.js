import axios from "axios";
const API = axios.create({
  baseURL: "https://csp-7ud9.onrender.com/api",
});
// Attach token helper for admin endpoints if needed
export const setAuthToken = (token) => {
  if (token) API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete API.defaults.headers.common["Authorization"];
};
export default API;
