// Placeholder images with better colors and styling
const PLACEHOLDER_BASE = 'https://via.placeholder.com/200x200/ec4899/ffffff?text=';

export const FESTIVAL_IMAGES = {
  'diwali.webp': `${PLACEHOLDER_BASE}Diwali`,
  'holi.webp': `${PLACEHOLDER_BASE}Holi`,
  'pongal_f.webp': `${PLACEHOLDER_BASE}Pongal`,
  'eid.webp': `${PLACEHOLDER_BASE}Eid`,
  'christmas.webp': `${PLACEHOLDER_BASE}Christmas`,
  'navratri.webp': `${PLACEHOLDER_BASE}Navratri`,
  'durga-puja.webp': `${PLACEHOLDER_BASE}Durga+Puja`,
  'ganesh-chaturthi.webp': `${PLACEHOLDER_BASE}Ganesh`,
  'onam.webp': `${PLACEHOLDER_BASE}Onam`,
  'raksha-bandan.webp': `${PLACEHOLDER_BASE}Raksha`,
};

export const FOOD_IMAGES = {
  'dosa.webp': `${PLACEHOLDER_BASE}Dosa`,
  'idli.webp': `${PLACEHOLDER_BASE}Idli`,
  'poha.webp': `${PLACEHOLDER_BASE}Poha`,
  'puri.webp': `${PLACEHOLDER_BASE}Puri`,
  'chapati.webp': `${PLACEHOLDER_BASE}Chapati`,
  'sambar.webp': `${PLACEHOLDER_BASE}Sambar`,
  'rasam.webp': `${PLACEHOLDER_BASE}Rasam`,
  'upma.webp': `${PLACEHOLDER_BASE}Upma`,
  'vada.webp': `${PLACEHOLDER_BASE}Vada`,
  'aloo-paratha.webp': `${PLACEHOLDER_BASE}Aloo`,
  'chole-bhature.webp': `${PLACEHOLDER_BASE}Chole`,
  'biryani.webp': `${PLACEHOLDER_BASE}Biryani`,
  'idiyappam.webp': `${PLACEHOLDER_BASE}Idiyappam`,
  'pongal.webp': `${PLACEHOLDER_BASE}Pongal`,
  'dhokla.webp': `${PLACEHOLDER_BASE}Dhokla`,
};

// Get image URL - returns placeholder images immediately
export function getFirebaseImageUrl(filename, category = 'food') {
  if (category === 'food' && FOOD_IMAGES[filename]) {
    return FOOD_IMAGES[filename];
  }
  if (category === 'festivals' && FESTIVAL_IMAGES[filename]) {
    return FESTIVAL_IMAGES[filename];
  }
  
  // Fallback placeholder
  const name = filename.replace('.webp', '').replace('-', '+').toUpperCase();
  return `${PLACEHOLDER_BASE}${encodeURIComponent(name)}`;
}
