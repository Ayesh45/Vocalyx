/**
 * Convert Firebase Storage gs:// URLs to HTTPS URLs
 */
export function convertFirebaseStorageUrl(gsUrl) {
  if (!gsUrl) return null;
  
  // If already HTTPS, return as is
  if (gsUrl.startsWith('http')) {
    return gsUrl;
  }
  
  // Convert gs://bucket/path to HTTPS URL
  // Format: gs://vocalyx-df528.firebasestorage.app/path/to/file
  if (gsUrl.startsWith('gs://')) {
    // Extract bucket and path
    const parts = gsUrl.replace('gs://', '').split('/');
    const bucket = parts[0].replace('.firebasestorage.app', '');
    const path = parts.slice(1).join('/');
    
    // Return HTTPS URL
    return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
  }
  
  return gsUrl;
}

export default { convertFirebaseStorageUrl };
