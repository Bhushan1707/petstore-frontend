import axiosInstance from './axiosInstance';

export const applyForAdoption = ({ petId, ...applicationData }) =>
  axiosInstance.post(`/adoptions/apply/${petId}`, applicationData).then((res) => res.data);

export const getMyApplications = () =>
  axiosInstance.get('/adoptions/my-applications').then((res) => res.data);

export const getAllApplications = () =>
  axiosInstance.get('/adoptions').then((res) => res.data);

export const approveApplication = (id) =>
  axiosInstance.put(`/adoptions/${id}/approve`).then((res) => res.data);

export const rejectApplication = (id) =>
  axiosInstance.put(`/adoptions/${id}/reject`).then((res) => res.data);
