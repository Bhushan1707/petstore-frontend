import axiosInstance from './axiosInstance';

export const getPets = (params) =>
  axiosInstance.get('/pets', { params }).then((res) => res.data);

export const getPetById = (id) =>
  axiosInstance.get(`/pets/${id}`).then((res) => res.data);

export const createPet = (payload) => {
  if (payload.formData) {
    return axiosInstance.post('/pets', payload.formData).then((res) => res.data);
  }
  return axiosInstance.post('/pets', payload).then((res) => res.data);
};

export const updatePet = (payload) => {
  if (payload.formData) {
    return axiosInstance.put(`/pets/${payload.id}`, payload.formData).then((res) => res.data);
  }
  const { id, ...petData } = payload;
  return axiosInstance.put(`/pets/${id}`, petData).then((res) => res.data);
};

export const deletePet = (id) =>
  axiosInstance.delete(`/pets/${id}`).then((res) => res.data);
