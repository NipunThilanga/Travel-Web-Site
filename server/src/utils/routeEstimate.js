import { haversineKm, approximateRoadKm } from "./geo.js";
import { getLocationById } from "../data/serviceLocations.js";

async function fetchGoogleDrivingKm(origin, destination) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;

  const params = new URLSearchParams({
    origins: `${origin.lat},${origin.lng}`,
    destinations: `${destination.lat},${destination.lng}`,
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
    }
  };
}
