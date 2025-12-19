import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

// Cache for download URLs to avoid repeated API calls
const urlCache = {};

export async function getFirebaseImageUrl(gsUrl) {
  if (!gsUrl) return null;
  
  // Return cached URL if available
  if (urlCache[gsUrl]) {
    return urlCache[gsUrl];
  }

  // If it's already an HTTPS URL, return as is
  if (gsUrl.startsWith('https://')) {
    urlCache[gsUrl] = gsUrl;
    return gsUrl;
  }

  // Convert gs:// to HTTPS download URL
  if (gsUrl.startsWith('gs://')) {
    try {
      // Extract bucket and path from gs://bucket/path format
      const parts = gsUrl.replace('gs://', '').split('/');
      const path = parts.slice(1).join('/');
      
      // Create storage reference and get download URL
      const fileRef = ref(storage, path);
      const downloadUrl = await getDownloadURL(fileRef);
      
      // Cache the URL
      urlCache[gsUrl] = downloadUrl;
      console.log('✓ Loaded image from Firebase:', path);
      return downloadUrl;
    } catch (error) {
      console.error('⚠ Firebase Storage Error:', gsUrl, error.message);
      // Return placeholder if Firebase access fails
      const placeholderUrl = `https://via.placeholder.com/200x200?text=${encodeURIComponent(gsUrl.split('/').pop().split('.')[0])}`;
      urlCache[gsUrl] = placeholderUrl;
      return placeholderUrl;
    }
  }

  return gsUrl;
}

// Preload multiple images
export async function preloadImages(gsUrls) {
  const promises = gsUrls.map(url => getFirebaseImageUrl(url));
  return Promise.allSettled(promises);
}
