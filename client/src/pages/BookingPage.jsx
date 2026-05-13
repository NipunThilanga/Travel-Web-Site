import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import BookingForm from "../components/BookingForm";
import VehicleCard from "../components/VehicleCard";
import VehicleGalleryModal from "../components/VehicleGalleryModal";
import RouteMapPanel from "../components/RouteMapPanel";

/** Only vehicles offered for booking (matches fleet). */
const BOOKING_FLEET_IDS = ["suzuki-wagonr", "toyota-kdh-van"];

function BookingPage({ vehicles }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const preselectId = searchParams.get("vehicle") || "";

  const bookingFleet = useMemo(
    () =>
      BOOKING_FLEET_IDS.map((id) => vehicles.find((v) => v.id === id)).filter(Boolean),
    [vehicles]
  );

  const defaultId = bookingFleet[0]?.id ?? "";
  const validPreselect =
    Boolean(preselectId) &&
    BOOKING_FLEET_IDS.includes(preselectId) &&
    bookingFleet.some((v) => v.id === preselectId);

  const [selectedVehicleId, setSelectedVehicleId] = useState(() =>
    validPreselect ? preselectId : defaultId
  );
  const [galleryVehicle, setGalleryVehicle] = useState(null);

  const [locations, setLocations] = useState([]);
  const [originId, setOriginId] = useState("pickup-cmb");
  const [destinationId, setDestinationId] = useState("");
  const [routeData, setRouteData] = useState(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState("");

  useEffect(() => {
    axios
      .get("/api/locations")
      .then((res) => setLocations(res.data))
      .catch(() => setLocations([]));
  }, []);

  useEffect(() => {
    if (validPreselect) {
      setSelectedVehicleId(preselectId);
      return;
    }
    setSelectedVehicleId(defaultId);
  }, [preselectId, validPreselect, defaultId, bookingFleet]);

  useEffect(() => {
    if (originId && destinationId && originId === destinationId) {
      setDestinationId("");
    }
  }, [originId, destinationId]);

  useEffect(() => {
    if (!originId || !destinationId || originId === destinationId) {
      setRouteData(null);
      setRouteError("");
      return;
    }

    let cancelled = false;
    setRouteLoading(true);
    setRouteError("");

    axios
      .post("/api/route-estimate", { originId, destinationId })
      .then((res) => {
        if (!cancelled) setRouteData(res.data);
      })
      .catch((err) => {
        if (!cancelled) {
          setRouteData(null);
          setRouteError(err.response?.data?.message ?? "Could not estimate route.");
        }
      })
      .finally(() => {
        if (!cancelled) setRouteLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [originId, destinationId]);

  const selectedVehicle = useMemo(
    () => bookingFleet.find((v) => v.id === selectedVehicleId) ?? null,
    [bookingFleet, selectedVehicleId]
  );

  const handleSelectVehicle = (vehicle) => {
    setSelectedVehicleId(vehicle.id);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("vehicle", vehicle.id);
      return next;
    });
  };

  return (
    <main className="band-fleet pt-28">
      <div className="band-inner mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Booking</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Reserve your ride</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Pick a vehicle, choose pickup and destination from our Sri Lanka locations, then review the estimated
              distance and fare. The map updates beside the form.
            </p>
          </div>
          <Link
            to="/#vehicles"
            className="rounded-full border border-emerald-400/40 bg-slate-950/40 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:border-emerald-300/70 hover:bg-emerald-500/10"
          >
            Back to vehicles
          </Link>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white">Choose a vehicle</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {bookingFleet.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={vehicle.id === selectedVehicleId}
                onSelect={handleSelectVehicle}
                onOpenGallery={() => {
                  setSelectedVehicleId(vehicle.id);
                  setGalleryVehicle(vehicle);
                }}
              />
            ))}
          </div>
        </section>

        <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] xl:items-start">
          <section className="min-w-0 space-y-6">
            <h2 className="text-lg font-semibold text-white">Trip details & contact</h2>
            <BookingForm
              selectedVehicle={selectedVehicle}
              onRemoveVehicle={() => setSelectedVehicleId("")}
              locations={locations}
              originId={originId}
              destinationId={destinationId}
              onOriginIdChange={setOriginId}
              onDestinationIdChange={setDestinationId}
              computedDistanceKm={routeData?.distanceKm ?? null}
              routeLoading={routeLoading}
              routeError={routeError}
              routeMethod={routeData?.method ?? ""}
            />
          </section>

          <aside className="min-w-0 xl:sticky xl:top-28">
            <h2 className="mb-3 text-lg font-semibold text-white xl:sr-only">Route map</h2>
            <RouteMapPanel routeEstimate={routeData} loading={routeLoading} error={routeError} />
          </aside>
        </div>

        <VehicleGalleryModal
          key={galleryVehicle?.id ?? "none"}
          vehicle={galleryVehicle}
          onClose={() => setGalleryVehicle(null)}
          onHire={(vehicle) => {
            handleSelectVehicle(vehicle);
            setGalleryVehicle(null);
          }}
        />
      </div>
    </main>
  );
}

export default BookingPage;
