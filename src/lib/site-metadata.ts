const FALLBACK_SITE_URL = "https://justinh.design";

export function getSiteUrl(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL;
  }
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return FALLBACK_SITE_URL;
}
