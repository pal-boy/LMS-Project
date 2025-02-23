
import axios from "axios";

// const base_URL = "http://localhost:5010/api/v1/";
// const axiosInstance = axios.create();

console.log("backened url");
console.log(import.meta.env.VITE_BACKEND_URL);
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    accessControlAllowCredentials: true,
    withCredentials: true,
    // headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "Content-Type",
    // }
});

// axiosInstance.defaults.baseURL = base_URL;
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance