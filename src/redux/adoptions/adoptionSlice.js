import { createSlice } from '@reduxjs/toolkit';

const adoptionSlice = createSlice({
  name: 'adoptions',
  initialState: {
    applications: [],
    myApplications: [],
    loading: false,
    error: null,
  },
  reducers: {
    applyForAdoptionRequest: (state) => { state.loading = true; state.error = null; },
    applyForAdoptionSuccess: (state, action) => {
      state.loading = false;
      state.myApplications.unshift(action.payload.data || action.payload);
    },
    applyForAdoptionFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    fetchMyApplicationsRequest: (state) => { state.loading = true; state.error = null; },
    fetchMyApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.myApplications = action.payload.data || action.payload;
    },
    fetchMyApplicationsFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    fetchAllApplicationsRequest: (state) => { state.loading = true; state.error = null; },
    fetchAllApplicationsSuccess: (state, action) => {
      state.loading = false;
      state.applications = action.payload.data || action.payload;
    },
    fetchAllApplicationsFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    approveRequest: (state) => { state.loading = true; state.error = null; },
    approveSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload.data || action.payload;
      const idx = state.applications.findIndex((a) => a._id === updated._id);
      if (idx !== -1) state.applications[idx] = updated;
    },
    approveFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    rejectRequest: (state) => { state.loading = true; state.error = null; },
    rejectSuccess: (state, action) => {
      state.loading = false;
      const updated = action.payload.data || action.payload;
      const idx = state.applications.findIndex((a) => a._id === updated._id);
      if (idx !== -1) state.applications[idx] = updated;
    },
    rejectFailure: (state, action) => { state.loading = false; state.error = action.payload; },
  },
});

export const {
  applyForAdoptionRequest, applyForAdoptionSuccess, applyForAdoptionFailure,
  fetchMyApplicationsRequest, fetchMyApplicationsSuccess, fetchMyApplicationsFailure,
  fetchAllApplicationsRequest, fetchAllApplicationsSuccess, fetchAllApplicationsFailure,
  approveRequest, approveSuccess, approveFailure,
  rejectRequest, rejectSuccess, rejectFailure,
} = adoptionSlice.actions;

export default adoptionSlice.reducer;
