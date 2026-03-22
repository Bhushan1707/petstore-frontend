import { createSlice } from '@reduxjs/toolkit';

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    images: [],
    loading: false,
    uploading: false,
    error: null,
  },
  reducers: {
    fetchGalleryRequest: (state) => { state.loading = true; state.error = null; },
    fetchGallerySuccess: (state, action) => {
      state.loading = false;
      state.images = action.payload.data || action.payload;
    },
    fetchGalleryFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    uploadImagesRequest: (state) => { state.uploading = true; state.error = null; },
    uploadImagesSuccess: (state, action) => {
      state.uploading = false;
      const newImages = action.payload.data || action.payload;
      state.images = [...newImages, ...state.images];
    },
    uploadImagesFailure: (state, action) => { state.uploading = false; state.error = action.payload; },

    deleteImageRequest: (state) => { state.loading = true; state.error = null; },
    deleteImageSuccess: (state, action) => {
      state.loading = false;
      state.images = state.images.filter((img) => img._id !== action.payload);
    },
    deleteImageFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    clearGallery: (state) => { state.images = []; },
  },
});

export const {
  fetchGalleryRequest, fetchGallerySuccess, fetchGalleryFailure,
  uploadImagesRequest, uploadImagesSuccess, uploadImagesFailure,
  deleteImageRequest, deleteImageSuccess, deleteImageFailure,
  clearGallery,
} = gallerySlice.actions;

export default gallerySlice.reducer;
