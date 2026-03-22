import { createSlice } from '@reduxjs/toolkit';
import { getToken } from '../../utils/tokenStorage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: getToken(),
    loading: false,
    error: null,
  },
  reducers: {
    loginRequest: (state, action) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    registerRequest: (state) => { state.loading = true; state.error = null; },
    registerSuccess: (state) => { state.loading = false; },
    registerFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    getMeRequest: (state) => { state.loading = true; },
    getMeSuccess: (state, action) => { state.loading = false; state.user = action.payload; },
    getMeFailure: (state, action) => { state.loading = false; state.error = action.payload; },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const {
  loginRequest, loginSuccess, loginFailure,
  registerRequest, registerSuccess, registerFailure,
  getMeRequest, getMeSuccess, getMeFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
