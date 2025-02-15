import dotenv from 'dotenv';
dotenv.config();
import axios from "axios";

// const base_URL = "http://localhost:5010/api/v1/";
// const axiosInstance = axios.create();

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

// axiosInstance.defaults.baseURL = base_URL;
// axiosInstance.defaults.withCredentials = true;

export default axiosInstance