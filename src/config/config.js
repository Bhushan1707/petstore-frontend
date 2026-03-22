const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
// Extract base URL for media (e.g., http://localhost:5000)
const MEDIA_BASE_URL = API_BASE_URL.replace(/\/api$/, '') || 'http://localhost:5000';

export const CONFIG = {
  API_BASE_URL,
  MEDIA_BASE_URL,
};
