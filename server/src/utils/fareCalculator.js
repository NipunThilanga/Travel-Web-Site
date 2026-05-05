export function calculateTripCost({ rates, pricingModel, distanceKm, durationDays }) {
  if (!rates) {
    return 0;
  }

  if (pricingModel === "perDay") {
    const days = Number(durationDays) || 0;
    return Number((days * rates.perDay).toFixed(2));
  }

  const kms = Number(distanceKm) || 0;
  return Number((kms * rates.perKm).toFixed(2));
}
