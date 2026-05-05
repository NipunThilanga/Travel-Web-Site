import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    country: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, required: true },
    pickupLocation: { type: String, required: true },
    destination: { type: String, required: true },
    travelStartDate: { type: String, required: true },
    travelEndDate: { type: String, required: true },
    notes: { type: String },
    vehicleId: { type: String, required: true },
    pricingModel: { type: String, enum: ["perKm", "perDay"], required: true },
    distanceKm: { type: Number, default: 0 },
    durationDays: { type: Number, default: 0 },
    estimatedCost: { type: Number, required: true }
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
