import { provincePlacesById } from "./provincePlacesBundle.js";

const provincesBase = [
  {
    id: "central",
    name: "Central Province",
    coverImage:
      "https://images.unsplash.com/photo-1587451901407-e6f82f0f5e1b?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Kandy", description: "Sacred city, lake views, and vibrant temple culture." },
      { name: "Nuwara Eliya", description: "Tea gardens, cool weather, and colonial charm." },
      { name: "Sigiriya", description: "Ancient rock fortress with panoramic jungle vistas." }
    ]
  },
  {
    id: "southern",
    name: "Southern Province",
    coverImage:
      "https://images.unsplash.com/photo-1586511925558-a4c6376fe65f?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Galle", description: "Historic Dutch fort, cafes, and sunset walls." },
      { name: "Mirissa", description: "Golden beaches, whale watching, and nightlife." },
      { name: "Tangalle", description: "Quiet coastline and luxury beachfront escapes." }
    ]
  },
  {
    id: "western",
    name: "Western Province",
    coverImage:
      "https://images.unsplash.com/photo-1592009309601-9414e0a0f6d5?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Colombo", description: "Urban energy, food scene, and oceanfront promenade." },
      { name: "Negombo", description: "Lagoon tours and easy airport-side beach stays." },
      { name: "Kalutara", description: "River bends, temples, and coastal leisure." }
    ]
  },
  {
    id: "northern",
    name: "Northern Province",
    coverImage:
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Jaffna", description: "Distinct Tamil heritage, islands, and seafood." },
      { name: "Delft Island", description: "Wild ponies and windswept landscapes." },
      { name: "Nallur", description: "Iconic temple architecture and local culture." }
    ]
  },
  {
    id: "eastern",
    name: "Eastern Province",
    coverImage:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Trincomalee", description: "Natural harbor and crystal-clear bays." },
      { name: "Pasikuda", description: "Shallow turquoise waters for calm beach days." },
      { name: "Arugam Bay", description: "World-class surf point with laid-back vibe." }
    ]
  },
  {
    id: "north-western",
    name: "North Western Province",
    coverImage:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Kurunegala", description: "Rock outcrops and historic royal stories." },
      { name: "Chilaw", description: "Coastal temples and fishing town character." },
      { name: "Wilpattu Edge", description: "Gateway routes to Sri Lanka's largest national park." }
    ]
  },
  {
    id: "north-central",
    name: "North Central Province",
    coverImage:
      "https://images.unsplash.com/photo-1541417904950-b855846fe074?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Anuradhapura", description: "Ancient kingdom, stupas, and sacred Bodhi tree." },
      { name: "Polonnaruwa", description: "Well-preserved ruins and cycling heritage trails." },
      { name: "Minneriya", description: "Famous elephant gathering safari experiences." }
    ]
  },
  {
    id: "uva",
    name: "Uva Province",
    coverImage:
      "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Ella", description: "Nine Arch Bridge, hikes, and scenic train routes." },
      { name: "Badulla", description: "Waterfalls and misty mountain roads." },
      { name: "Haputale", description: "Tea viewpoints overlooking southern plains." }
    ]
  },
  {
    id: "sabaragamuwa",
    name: "Sabaragamuwa Province",
    coverImage:
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1200&q=80",
    locations: [
      { name: "Ratnapura", description: "Gem capital and rainforest gateways." },
      { name: "Kitulgala", description: "White-water rafting and jungle adventure." },
      { name: "Sinharaja Fringe", description: "Biodiversity-rich rainforest experiences." }
    ]
  }
];

export const provinces = provincesBase.map((province) => ({
  ...province,
  places: provincePlacesById[province.id] ?? [],
}));
