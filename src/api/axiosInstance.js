import axios from 'axios';
import { getToken, removeToken } from '../utils/tokenStorage';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Request interceptor — attach JWT
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
