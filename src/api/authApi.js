import axiosInstance from './axiosInstance';

export const login = (credentials) =>
  axiosInstance.post('/auth/login', credentials).then((res) => res.data);

export const register = (userData) =>
  axiosInstance.post('/auth/register', userData).then((res) => res.data);

export const getMe = () =>
  axiosInstance.get('/auth/me').then((res) => res.data);
