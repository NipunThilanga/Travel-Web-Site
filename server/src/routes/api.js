import express from "express";
import { vehicles } from "../data/vehicles.js";
import { provinces } from "../data/provinces.js";
import { serviceLocations } from "../data/serviceLocations.js";
import { calculateTripCost } from "../utils/fareCalculator.js";
import { estimateRouteKm, estimateMultiStopRoute } from "../utils/routeEstimate.js";
import { buildBookingMessage, buildWhatsAppLink } from "../utils/whatsappMessage.js";
import { Booking } from "../models/Booking.js";

const router = express.Router();

router.get("/vehicles", (_, res) => {
  res.json(vehicles);
});

router.get("/provinces", (_, res) => {
  res.json(provinces);
});

router.get("/locations", (_, res) => {
  const list = serviceLocations.map(({ id, label, provinceId, kind }) => ({
    id,
    label,
    provinceId,
    kind
  }));
  res.json(list);
});

router.post("/route-estimate", async (req, res) => {
  const body = req.body ?? {};
  const originId = body.originId ?? body.origin_id;
  let stopPlaceKeys = body.stopPlaceKeys ?? body.stop_place_keys;
  const destinationId = body.destinationId ?? body.destination_id;

  if (typeof stopPlaceKeys === "string") {
    try {
      stopPlaceKeys = JSON.parse(stopPlaceKeys);
    } catch {
      stopPlaceKeys = stopPlaceKeys ? [stopPlaceKeys] : [];
    }
  }

  if (!originId || typeof originId !== "string") {
    return res.status(400).json({ message: "originId is required (pickup location id)." });
  }

  try {
    if (Array.isArray(stopPlaceKeys) && stopPlaceKeys.length > 0) {
      const result = await estimateMultiStopRoute(originId, stopPlaceKeys);
      if (result.error) {
        return res.status(400).json({ message: result.error });
      }
      return res.json(result);
    }

    if (destinationId) {
      const result = await estimateRouteKm(originId, destinationId);
      if (result.error) {
        return res.status(400).json({ message: result.error });
      }
      return res.json(result);
    }

    return res.status(400).json({
      message:
        "Send stopPlaceKeys: string[] (province place ids like \"central:temple-id\") from the booking picker, or destinationId for legacy hub-to-hub routes."
    });
  } catch (error) {
    console.error("route-estimate:", error);
    return res.status(500).json({ message: "Could not estimate route." });
  }
});

router.post("/calculate", (req, res) => {
  const { vehicleId, pricingModel, distanceKm, durationDays } = req.body;
  const vehicle = vehicles.find((item) => item.id === vehicleId);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found." });
  }

  const total = calculateTripCost({
    rates: vehicle.rates,
    pricingModel,
    distanceKm,
    durationDays
  });

  return res.json({ total });
});

router.post("/bookings/whatsapp-link", async (req, res) => {
  const payload = req.body;
  const vehicle = vehicles.find((item) => item.id === payload.vehicleId);

  if (!vehicle) {
    return res.status(404).json({ message: "Vehicle not found." });
  }

  const estimatedCost = calculateTripCost({
    rates: vehicle.rates,
    pricingModel: payload.pricingModel,
    distanceKm: payload.distanceKm,
    durationDays: payload.durationDays
  });

  const bookingPayload = {
    ...payload,
    selectedVehicle: vehicle,
    estimatedCost
  };

  if (process.env.MONGODB_URI) {
    await Booking.create({
      customerName: payload.customerName,
      country: payload.country,
      email: payload.email,
      whatsapp: payload.whatsapp,
      pickupLocation: payload.pickupLocation,
      destination: payload.destination,
      travelStartDate: payload.travelStartDate,
      travelEndDate: payload.travelEndDate,
      notes: payload.notes,
      vehicleId: payload.vehicleId,
      pricingModel: payload.pricingModel,
      distanceKm: Number(payload.distanceKm) || 0,
      durationDays: Number(payload.durationDays) || 0,
      estimatedCost
    });
  }

  const message = buildBookingMessage(bookingPayload);
  const whatsappLink = buildWhatsAppLink(process.env.BUSINESS_WHATSAPP || "94770000000", message);

  return res.json({ whatsappLink, estimatedCost });
});

export default router;
