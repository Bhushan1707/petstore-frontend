import { createSlice } from '@reduxjs/toolkit';

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    pets: [],
    pet: null,
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    fetchPetsRequest: (state) => { state.loading = true; state.error = null; },
    fetchPetsSuccess: (state, action) => {
      state.loading = false;
      const data = action.payload.data || action.payload;
      state.pets = data.pets || data;
      state.totalPages = data.pages || 1;
      state.currentPage = data.page || 1;
    },
    fetchPetsFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    fetchPetByIdRequest: (state) => { state.loading = true; state.error = null; state.pet = null; },
    fetchPetByIdSuccess: (state, action) => {
      state.loading = false;
      state.pet = action.payload.data || action.payload;
    },
    fetchPetByIdFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    createPetRequest: (state) => { state.loading = true; state.error = null; },
    createPetSuccess: (state, action) => {
      state.loading = false;
      state.pets.unshift(action.payload.data || action.payload);
    },
    createPetFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    updatePetRequest: (state) => { state.loading = true; state.error = null; },
    updatePetSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload.data || action.payload;
      const idx = state.pets.findIndex((p) => p._id === updated._id);
      if (idx !== -1) state.pets[idx] = updated;
    },
    updatePetFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    deletePetRequest: (state) => { state.loading = true; state.error = null; },
    deletePetSuccess: (state, action) => {
      state.loading = false;
      state.pets = state.pets.filter((p) => p._id !== action.payload);
    },
    deletePetFailure: (state, action) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  fetchPetsRequest, fetchPetsSuccess, fetchPetsFailure,
  fetchPetByIdRequest, fetchPetByIdSuccess, fetchPetByIdFailure,
  createPetRequest, createPetSuccess, createPetFailure,
  updatePetRequest, updatePetSuccess, updatePetFailure,
  deletePetRequest, deletePetSuccess, deletePetFailure,
} = petSlice.actions;

export default petSlice.reducer;
