// Resolves an image path: full URLs (Cloudinary) as-is, backend paths get the API origin,
// anything missing falls back to the bundled profile photo in /public.
export const imgSrc = (p, fallback = '/profile.jpg') => {
  if (!p) return fallback;
  if (p.startsWith('http')) return p;
  return `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${p}`;
};
