import axios from "axios";

const base_URL = "http://localhost:5010/api/v1/"
const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = base_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance