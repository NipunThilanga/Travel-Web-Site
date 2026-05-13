import { provincePlacesById } from "./provincePlacesBundle.js";
import { serviceLocations } from "./serviceLocations.js";

const SL_CENTER = { lat: 7.8731, lng: 80.7718 };

export function provinceHubCoords(provinceId) {
  const locs = serviceLocations.filter((s) => s.provinceId === provinceId);
  if (locs.length === 0) return SL_CENTER;
  const lat = locs.reduce((s, x) => s + x.lat, 0) / locs.length;
  const lng = locs.reduce((s, x) => s + x.lng, 0) / locs.length;
  return { lat, lng };
}

/** Small stable offset so two places in one province are not identical (until real per-place coords exist). */
function jitterOffset(compositeKey) {
  let h = 0;
  for (let i = 0; i < compositeKey.length; i += 1) {
    h = (Math.imul(31, h) + compositeKey.charCodeAt(i)) >>> 0;
  }
  const angle = (h % 360) * (Math.PI / 180);
  const dist = 0.012 + ((h >>> 8) % 60) / 60 / 25;
  return {
    dLat: Math.cos(angle) * dist * 0.55,
    dLng: Math.sin(angle) * dist * 0.55,
  };
}

/**
 * @param {string} provinceId e.g. "western"
 * @param {string} placeId e.g. "galle-face"
 */
export function resolvePlacePoint(provinceId, placeId) {
  const compositeKey = `${provinceId}:${placeId}`;
  const hub = provinceHubCoords(provinceId);
  const j = jitterOffset(compositeKey);
  const places = provincePlacesById[provinceId];
  const place = places?.find((p) => p.id === placeId);
  const label = place?.name ?? compositeKey;

  return {
    compositeKey,
    label,
    lat: hub.lat + j.dLat,
    lng: hub.lng + j.dLng,
  };
}
