/**
 * Pickup / destination points shown on the booking flow.
 * Coordinates are approximate center points for routing estimates & maps.
 * Matches province spotlight locations from `provinces.js`.
 */
export const serviceLocations = [
  {
    id: "pickup-cmb",
    label: "Bandaranaike International Airport (CMB)",
    provinceId: null,
    lat: 7.1808,
    lng: 79.8841,
    kind: "pickup"
  },
  {
    id: "western-colombo",
    label: "Colombo",
    provinceId: "western",
    lat: 6.9271,
    lng: 79.8612,
    kind: "destination"
  },
  {
    id: "western-negombo",
    label: "Negombo",
    provinceId: "western",
    lat: 7.2083,
    lng: 79.8358,
    kind: "destination"
  },
  {
    id: "western-kalutara",
    label: "Kalutara",
    provinceId: "western",
    lat: 6.5854,
    lng: 79.9607,
    kind: "destination"
  },
  {
    id: "central-kandy",
    label: "Kandy",
    provinceId: "central",
    lat: 7.2906,
    lng: 80.6337,
    kind: "destination"
  },
  {
    id: "central-nuwara-eliya",
    label: "Nuwara Eliya",
    provinceId: "central",
    lat: 6.9497,
    lng: 80.7891,
    kind: "destination"
  },
  {
    id: "central-sigiriya",
    label: "Sigiriya",
    provinceId: "central",
    lat: 7.957,
    lng: 80.7603,
    kind: "destination"
  },
  {
    id: "southern-galle",
    label: "Galle",
    provinceId: "southern",
    lat: 6.0329,
    lng: 80.2168,
    kind: "destination"
  },
  {
    id: "southern-mirissa",
    label: "Mirissa",
    provinceId: "southern",
    lat: 5.9463,
    lng: 80.4516,
    kind: "destination"
  },
  {
    id: "southern-tangalle",
    label: "Tangalle",
    provinceId: "southern",
    lat: 6.024,
    lng: 80.7971,
    kind: "destination"
  },
  {
    id: "northern-jaffna",
    label: "Jaffna",
    provinceId: "northern",
    lat: 9.6615,
    lng: 80.0255,
    kind: "destination"
  },
  {
    id: "northern-delft-island",
    label: "Delft Island",
    provinceId: "northern",
    lat: 9.528,
    lng: 79.708,
    kind: "destination"
  },
  {
    id: "northern-nallur",
    label: "Nallur",
    provinceId: "northern",
    lat: 9.6747,
    lng: 80.027,
    kind: "destination"
  },
  {
    id: "eastern-trincomalee",
    label: "Trincomalee",
    provinceId: "eastern",
    lat: 8.5874,
    lng: 81.2152,
    kind: "destination"
  },
  {
    id: "eastern-pasikuda",
    label: "Pasikuda",
    provinceId: "eastern",
    lat: 7.926,
    lng: 81.538,
    kind: "destination"
  },
  {
    id: "eastern-arugam-bay",
    label: "Arugam Bay",
    provinceId: "eastern",
    lat: 6.8394,
    lng: 81.836,
    kind: "destination"
  },
  {
    id: "north-western-kurunegala",
    label: "Kurunegala",
    provinceId: "north-western",
    lat: 7.4813,
    lng: 80.362,
    kind: "destination"
  },
  {
    id: "north-western-chilaw",
    label: "Chilaw",
    provinceId: "north-western",
    lat: 7.5758,
    lng: 79.795,
    kind: "destination"
  },
  {
    id: "north-western-wilpattu-edge",
    label: "Wilpattu Edge",
    provinceId: "north-western",
    lat: 8.025,
    lng: 80.108,
    kind: "destination"
  },
  {
    id: "north-central-anuradhapura",
    label: "Anuradhapura",
    provinceId: "north-central",
    lat: 8.3114,
    lng: 80.4037,
    kind: "destination"
  },
  {
    id: "north-central-polonnaruwa",
    label: "Polonnaruwa",
    provinceId: "north-central",
    lat: 7.9398,
    lng: 81.0187,
    kind: "destination"
  },
  {
    id: "north-central-minneriya",
    label: "Minneriya",
    provinceId: "north-central",
    lat: 8.039,
    lng: 80.889,
    kind: "destination"
  },
  {
    id: "uva-ella",
    label: "Ella",
    provinceId: "uva",
    lat: 6.8667,
    lng: 81.0463,
    kind: "destination"
  },
  {
    id: "uva-badulla",
    label: "Badulla",
    provinceId: "uva",
    lat: 6.9934,
    lng: 81.055,
    kind: "destination"
  },
  {
    id: "uva-haputale",
    label: "Haputale",
    provinceId: "uva",
    lat: 6.7654,
    lng: 80.957,
    kind: "destination"
  },
  {
    id: "sabaragamuwa-ratnapura",
    label: "Ratnapura",
    provinceId: "sabaragamuwa",
    lat: 6.6828,
    lng: 80.3992,
    kind: "destination"
  },
  {
    id: "sabaragamuwa-kitulgala",
    label: "Kitulgala",
    provinceId: "sabaragamuwa",
    lat: 7.255,
    lng: 80.417,
    kind: "destination"
  },
  {
    id: "sabaragamuwa-sinharaja-fringe",
    label: "Sinharaja Fringe",
    provinceId: "sabaragamuwa",
    lat: 6.4,
    lng: 80.465,
    kind: "destination"
  }
];

export function getLocationById(id) {
  return serviceLocations.find((loc) => loc.id === id) ?? null;
}
