import { CONFIG } from '../config/config';

/**
 * Ensures an image URL is correctly formatted for display.
 * Handles both external URLs and local uploads (via multer).
 */
export const getImageUrl = (url, petName = 'Pet') => {
  if (!url) return `https://placehold.co/400x300?text=${encodeURIComponent(petName)}`;
  
  // If it's a local upload path (starts with assets/ or is a relative path)
  if (url.startsWith('assets/') || (!url.startsWith('http') && !url.startsWith('data:'))) {
    // Ensure no double slashes if url starts with /
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;
    return `${CONFIG.MEDIA_BASE_URL}/${cleanUrl}`;
  }
  
  return url;
};
