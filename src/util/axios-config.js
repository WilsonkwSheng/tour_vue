import axios from "axios";

// Set the base URL for your API requests
axios.defaults.baseURL = "http://localhost:3000"; // Update with your API URL

// Add a request interceptor to include JWT token in headers
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
