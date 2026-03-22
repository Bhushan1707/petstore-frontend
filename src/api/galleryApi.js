import axiosInstance from './axiosInstance';

export const uploadPetImages = (petId, formData) =>
  axiosInstance
    .post(`/gallery/${petId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);

export const getGalleryByPet = (petId) =>
  axiosInstance.get(`/gallery/${petId}`).then((res) => res.data);

export const deleteGalleryImage = (imageId) =>
  axiosInstance.delete(`/gallery/image/${imageId}`).then((res) => res.data);
