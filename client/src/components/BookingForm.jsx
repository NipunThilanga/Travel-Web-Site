import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Trash2, CarFront } from "lucide-react";

const initialState = {
  customerName: "",
  country: "",
  email: "",
  whatsapp: "",
  pickupLocation: "",
  destination: "",
  travelStartDate: "",
  travelEndDate: "",
  notes: "",
  pricingModel: "perKm",
  distanceKm: 0,
  durationDays: 1
};

function sortLocations(list) {
  return [...list].sort((a, b) => {
    if (a.id === "pickup-cmb") return -1;
    if (b.id === "pickup-cmb") return 1;
    return a.label.localeCompare(b.label);
  });
}

function BookingForm({
  selectedVehicle,
  onRemoveVehicle,
  locations = [],
  originId = "pickup-cmb",
  destinationId = "",
  onOriginIdChange,
  onDestinationIdChange,
  /** When provided, destination comes from province place picks (not the dropdown). */
  tripDestinationSummary,
  computedDistanceKm = null,
  routeLoading = false,
  routeError = "",
  routeMethod = ""
}) {
  const [formData, setFormData] = useState(initialState);
  const [estimate, setEstimate] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const sortedLocations = useMemo(() => sortLocations(locations), [locations]);
  const provinceDestinationMode = typeof tripDestinationSummary === "string";
  const usePickupSelect = sortedLocations.length > 0 && onOriginIdChange;
  const useLegacyDestinationDropdown =
    usePickupSelect && onDestinationIdChange && !provinceDestinationMode;

  const canSubmit = useMemo(
    () =>
      selectedVehicle &&
      formData.customerName &&
      formData.country &&
      formData.email &&
      formData.whatsapp &&
      formData.pickupLocation &&
      formData.destination &&
      formData.travelStartDate &&
      formData.travelEndDate,
    [formData, selectedVehicle]
  );

  useEffect(() => {
    if (!usePickupSelect) return;
    const start = sortedLocations.find((l) => l.id === originId);
    setFormData((prev) => ({
      ...prev,
      pickupLocation: start?.label ?? ""
    }));
  }, [usePickupSelect, sortedLocations, originId]);

  useEffect(() => {
    if (!provinceDestinationMode) return;
    setFormData((prev) => ({
      ...prev,
      destination: tripDestinationSummary
    }));
  }, [provinceDestinationMode, tripDestinationSummary]);

  useEffect(() => {
    if (provinceDestinationMode || !useLegacyDestinationDropdown) return;
    const end = sortedLocations.find((l) => l.id === destinationId);
    setFormData((prev) => ({
      ...prev,
      destination: end?.label ?? ""
    }));
  }, [provinceDestinationMode, useLegacyDestinationDropdown, sortedLocations, destinationId]);

  useEffect(() => {
    if (computedDistanceKm == null || !Number.isFinite(Number(computedDistanceKm))) return;
    const km = Number(computedDistanceKm);
    setFormData((prev) => ({ ...prev, distanceKm: km }));
  }, [computedDistanceKm]);

  useEffect(() => {
    async function run() {
      if (!selectedVehicle) return;
      const km = Number(formData.distanceKm) || 0;
      const response = await axios.post("/api/calculate", {
        vehicleId: selectedVehicle.id,
        pricingModel: formData.pricingModel,
        distanceKm: km,
        durationDays: Number(formData.durationDays)
      });
      setEstimate(response.data.total);
    }

    run().catch(() => setEstimate(0));
  }, [selectedVehicle, formData.pricingModel, formData.distanceKm, formData.durationDays]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = async () => {
    if (!selectedVehicle) return;
    const response = await axios.post("/api/calculate", {
      vehicleId: selectedVehicle.id,
      pricingModel: formData.pricingModel,
      distanceKm: Number(formData.distanceKm),
      durationDays: Number(formData.durationDays)
    });
    setEstimate(response.data.total);
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    if (!canSubmit || !selectedVehicle) return;

    setSubmitting(true);
    setMessage("");
    try {
      const response = await axios.post("/api/bookings/whatsapp-link", {
        ...formData,
        vehicleId: selectedVehicle.id,
        distanceKm: Number(formData.distanceKm),
        durationDays: Number(formData.durationDays)
      });
      setEstimate(response.data.estimatedCost);
      window.open(response.data.whatsappLink, "_blank");
      setMessage("Booking details prepared. Redirecting to WhatsApp chat.");
    } catch {
      setMessage("Booking failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submitBooking}
      className="space-y-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/25 p-6 shadow-inner shadow-black/20 backdrop-blur"
    >
      <h3 className="text-xl font-semibold text-white">Trip & Booking Details</h3>
      {!selectedVehicle && <p className="text-sm text-amber-300">Select a vehicle first to continue.</p>}
      {selectedVehicle && (
        <div className="overflow-hidden rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-900/35 via-slate-950/65 to-cyan-950/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/25 px-4 py-3">
            <div className="flex items-center gap-2">
              <CarFront className="h-4 w-4 text-emerald-300" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">Selected Vehicle</p>
            </div>
            <button
              type="button"
              onClick={onRemoveVehicle}
              className="inline-flex items-center gap-2 rounded-full border border-rose-400/45 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-rose-200 transition hover:bg-rose-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
          <div className="grid gap-3 px-4 py-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/25 bg-slate-950/55 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">Vehicle</p>
              <p className="mt-1 font-semibold text-white">{selectedVehicle.name}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-slate-950/55 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">Category</p>
              <p className="mt-1 font-semibold text-emerald-200">{selectedVehicle.category}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-slate-950/55 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">Seats & Transmission</p>
              <p className="mt-1 font-semibold text-white">
                {selectedVehicle.seats} seats · {selectedVehicle.transmission}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-slate-950/55 p-3">
              <p className="text-xs uppercase tracking-wider text-slate-400">Rates</p>
              <p className="mt-1 font-semibold text-white">
                ${selectedVehicle.rates.perKm}/km · ${selectedVehicle.rates.perDay}/day
              </p>
            </div>
            <div className="rounded-xl border border-emerald-500/25 bg-slate-950/55 p-3 md:col-span-2">
              <p className="text-xs uppercase tracking-wider text-slate-400">Description</p>
              <p className="mt-1 text-sm text-slate-200">{selectedVehicle.description}</p>
            </div>
          </div>
        </div>
      )}

      {usePickupSelect ? (
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-xs font-medium text-slate-400">Pickup</span>
            <select
              value={originId}
              onChange={(e) => onOriginIdChange(e.target.value)}
              className="w-full rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm outline-none ring-emerald-400 transition focus:ring-2"
            >
              {sortedLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.label}
                </option>
              ))}
            </select>
          </label>
          {provinceDestinationMode ? (
            <div className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-400">Destinations (from place picks)</span>
              <div className="min-h-[3rem] rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm leading-relaxed text-slate-200">
                {tripDestinationSummary ? (
                  tripDestinationSummary
                ) : (
                  <span className="text-slate-500">Select one or more places under “Destinations by province”.</span>
                )}
              </div>
            </div>
          ) : (
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-400">Destination</span>
              <select
                value={destinationId}
                onChange={(e) => onDestinationIdChange(e.target.value)}
                className="w-full rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm outline-none ring-emerald-400 transition focus:ring-2"
              >
                <option value="">Choose destination…</option>
                {sortedLocations.map((loc) => (
                  <option key={loc.id} value={loc.id} disabled={loc.id === originId}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          {routeLoading && <p className="text-xs text-cyan-200/90 md:col-span-2">Calculating route distance…</p>}
          {routeError && <p className="text-xs text-rose-300 md:col-span-2">{routeError}</p>}
          {!routeLoading && computedDistanceKm != null && Number.isFinite(Number(computedDistanceKm)) && (
            <p className="text-xs text-emerald-200/90 md:col-span-2">
              Route distance: ~{Number(computedDistanceKm).toFixed(1)} km
              {routeMethod === "google" ? " (Google driving)" : routeMethod === "estimate" ? " (estimated)" : ""}
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["pickupLocation", "Pickup Location"],
            ["destination", "Destination"]
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              required
              value={formData[name]}
              onChange={onChange}
              placeholder={label}
              className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm outline-none ring-emerald-400 transition focus:ring-2"
            />
          ))}
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["customerName", "Name"],
          ["country", "Country"],
          ["email", "Email"],
          ["whatsapp", "WhatsApp Number"]
        ].map(([name, label]) => (
          <input
            key={name}
            name={name}
            required
            value={formData[name]}
            onChange={onChange}
            placeholder={label}
            className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm outline-none ring-emerald-400 transition focus:ring-2"
          />
        ))}
        <input
          name="travelStartDate"
          type="date"
          required
          value={formData.travelStartDate}
          onChange={onChange}
          className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
        />
        <input
          name="travelEndDate"
          type="date"
          required
          value={formData.travelEndDate}
          onChange={onChange}
          className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
        />
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <select
          name="pricingModel"
          value={formData.pricingModel}
          onChange={onChange}
          className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
        >
          <option value="perKm">Per Kilometer</option>
          <option value="perDay">Per Day</option>
        </select>
        <input
          name="distanceKm"
          type="number"
          min="0"
          step="0.1"
          value={formData.distanceKm}
          onChange={onChange}
          placeholder="Distance (km)"
          className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
        />
        <input
          name="durationDays"
          type="number"
          min="1"
          value={formData.durationDays}
          onChange={onChange}
          placeholder="Duration (days)"
          className="rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
        />
      </div>
      <textarea
        name="notes"
        value={formData.notes}
        onChange={onChange}
        placeholder="Notes (flight details, special requests)"
        className="min-h-24 w-full rounded-lg border border-emerald-500/20 bg-slate-950/70 px-3 py-2.5 text-sm"
      />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={calculate}
          disabled={!selectedVehicle}
          className="rounded-lg border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-400/10 disabled:opacity-50"
        >
          Recalculate total
        </button>
        <p className="text-sm text-slate-200">
          Estimated total: ${estimate.toFixed(2)}{" "}
          <span className="text-slate-500">
            ({formData.pricingModel === "perKm" ? "per km rate" : "per day rate"})
          </span>
        </p>
      </div>
      <button
        type="submit"
        disabled={!canSubmit || submitting}
        className="w-full rounded-lg bg-emerald-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
      >
        {submitting ? "Preparing WhatsApp..." : "Confirm Booking via WhatsApp"}
      </button>
      {message && <p className="text-sm text-emerald-200">{message}</p>}
    </form>
  );
}

export default BookingForm;
