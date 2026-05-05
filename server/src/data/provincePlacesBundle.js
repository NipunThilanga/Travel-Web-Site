import { centralPlaces } from "./places/central.js";
import { southernPlaces } from "./places/southern.js";
import { westernPlaces } from "./places/western.js";
import { northernPlaces } from "./places/northern.js";
import { easternPlaces } from "./places/eastern.js";
import { northwesternPlaces } from "./places/northwestern.js";
import { northCentralPlaces } from "./places/northcentral.js";
import { uvaPlaces } from "./places/uva.js";
import { sabaragamuwaPlaces } from "./places/sabaragamuwa.js";

export const provincePlacesById = {
  central: centralPlaces,
  southern: southernPlaces,
  western: westernPlaces,
  northern: northernPlaces,
  eastern: easternPlaces,
  "north-western": northwesternPlaces,
  "north-central": northCentralPlaces,
  uva: uvaPlaces,
  sabaragamuwa: sabaragamuwaPlaces,
};
