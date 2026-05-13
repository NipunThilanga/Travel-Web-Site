import { haversineKm, approximateRoadKm } from "./geo.js";
import { getLocationById } from "../data/serviceLocations.js";
import { resolvePlacePoint } from "../data/placeCoords.js";

async function fetchGoogleDrivingKm(a, b) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  const params = new URLSearchParams({
    origins: `${a.lat},${a.lng}`,
    destinations: `${b.lat},${b.lng}`,
    units: "metric",
    key
  });

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) return null;

  const data = await res.json();
  const element = data.rows?.[0]?.elements?.[0];
  if (!element || element.status !== "OK") return null;

  const meters = element.distance?.value;
  if (typeof meters !== "number") return null;

  return Number((meters / 1000).toFixed(2));
}

/** Legacy flat service location IDs (dropdown). */
export async function estimateRouteKm(originId, destinationId) {
  const origin = getLocationById(originId);
  const destination = getLocationById(destinationId);

  if (!origin || !destination) {
    return { error: "Unknown pickup or destination." };
  }

  if (originId === destinationId) {
    return { error: "Pickup and destination must be different." };
  }

  const straightLineKm = Number(haversineKm(origin.lat, origin.lng, destination.lat, destination.lng).toFixed(2));

  let drivingKm = await fetchGoogleDrivingKm(origin, destination);
  let method = "google";

  if (drivingKm == null) {
    drivingKm = approximateRoadKm(straightLineKm);
    method = "estimate";
  }

  return {
    distanceKm: drivingKm,
    straightLineKm,
    method,
    origin: {
      id: origin.id,
      label: origin.label,
      lat: origin.lat,
      lng: origin.lng
    },
    destination: {
      id: destination.id,
      label: destination.label,
      lat: destination.lat,
      lng: destination.lng
    },
    stops: [],
    waypointsEmbed: []
  };
}

/**
 * Ordered province places: keys like "central:dalada-maligawa".
 * Route = pickup → stop1 → stop2 → …
 */
export async function estimateMultiStopRoute(originId, stopPlaceKeys) {
  const origin = getLocationById(originId);
  if (!origin) {
    return { error: "Unknown pickup location." };
  }

  if (!Array.isArray(stopPlaceKeys) || stopPlaceKeys.length === 0) {
    return { error: "Select at least one destination place." };
  }

  const stopPoints = [];
  for (const rawKey of stopPlaceKeys) {
    const key = String(rawKey);
    const colon = key.indexOf(":");
    if (colon === -1) {
      return { error: "Invalid place key." };
    }
    const provinceId = key.slice(0, colon);
    const placeId = key.slice(colon + 1);
    if (!provinceId || !placeId) {
      return { error: "Invalid place key." };
    }
    stopPoints.push(resolvePlacePoint(provinceId, placeId));
  }

  const chain = [
    { id: origin.id, label: origin.label, lat: origin.lat, lng: origin.lng },
    ...stopPoints.map((s) => ({
      id: s.compositeKey,
      label: s.label,
      lat: s.lat,
      lng: s.lng
    }))
  ];

  let totalKm = 0;
  let totalStraight = 0;
  let method = "google";

  for (let i = 0; i < chain.length - 1; i += 1) {
    const a = chain[i];
    const b = chain[i + 1];
    const straight = haversineKm(a.lat, a.lng, b.lat, b.lng);
    totalStraight += straight;

    let legKm = await fetchGoogleDrivingKm(a, b);
    if (legKm == null) {
      legKm = approximateRoadKm(straight);
      method = "estimate";
    }
    totalKm += legKm;
  }

  const last = stopPoints[stopPoints.length - 1];

  const waypointsEmbed =
    stopPoints.length > 1 ? stopPoints.slice(0, -1).map((s) => ({ lat: s.lat, lng: s.lng })) : [];

  return {
    distanceKm: Number(totalKm.toFixed(2)),
    straightLineKm: Number(totalStraight.toFixed(2)),
    method,
    origin: {
      id: origin.id,
      label: origin.label,
      lat: origin.lat,
      lng: origin.lng
    },
    destination: {
      id: last.compositeKey,
      label: last.label,
      lat: last.lat,
      lng: last.lng
    },
    stops: stopPoints.map((s) => ({
      compositeKey: s.compositeKey,
      label: s.label,
      lat: s.lat,
      lng: s.lng
    })),
    waypointsEmbed
  };
}
