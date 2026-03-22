import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import petReducer from './pets/petSlice';
import adoptionReducer from './adoptions/adoptionSlice';
import galleryReducer from './gallery/gallerySlice';

const rootReducer = combineReducers({
  auth: authReducer,
  pets: petReducer,
  adoptions: adoptionReducer,
  gallery: galleryReducer,
});

export default rootReducer;
