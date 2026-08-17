import axios from "axios";

export const api = axios.create({
  baseURL:
    "http://localhost:8000/api/v1" ||
    "https://node-react-setup.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});
