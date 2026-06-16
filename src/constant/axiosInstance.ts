import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: (import.meta.env.MODE === 'production')
        ? import.meta.env.VITE_API_URL_PROD
        : import.meta.env.VITE_API_URL_DEV,
});