import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://tech-care-server.vercel.app'
});

axiosInstance.interceptors.response.use(
    (res) => res,
    (error) => Promise.reject(error?.response?.data?.content || error?.response?.data?.message || error?.response?.message || error?.message || 'Something went wrong'),
);

export default axiosInstance;