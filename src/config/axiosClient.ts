import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3333", // Altere para sua URL base
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default axiosClient;
