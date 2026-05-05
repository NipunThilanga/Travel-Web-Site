export function buildBookingMessage(bookingDetails) {
  const {
    customerName,
    country,
    email,
    whatsapp,
    pickupLocation,
    destination,
    travelStartDate,
    travelEndDate,
    notes,
    selectedVehicle,
    pricingModel,
    distanceKm,
    durationDays,
    estimatedCost
  } = bookingDetails;

  return [
    "Hello! I would like to confirm a vehicle booking.",
    "",
    `Name: ${customerName}`,
    `Country: ${country}`,
    `Email: ${email}`,
    `WhatsApp: ${whatsapp}`,
    "",
    `Vehicle: ${selectedVehicle?.name ?? "N/A"}`,
    `Pricing: ${pricingModel === "perDay" ? "Per Day" : "Per KM"}`,
    `Pickup: ${pickupLocation}`,
    `Destination: ${destination}`,
    `Distance (km): ${distanceKm || "N/A"}`,
    `Duration (days): ${durationDays || "N/A"}`,
    `Travel dates: ${travelStartDate} to ${travelEndDate}`,
    `Estimated total: USD ${estimatedCost}`,
    "",
    `Notes: ${notes || "None"}`
  ].join("\n");
}

export function buildWhatsAppLink(phoneNumber, message) {
  const sanitized = phoneNumber.replace(/[^\d]/g, "");
  return `https://wa.me/${sanitized}?text=${encodeURIComponent(message)}`;
}
