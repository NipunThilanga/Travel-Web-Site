import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import VehicleCard from "./VehicleCard";
import BookingForm from "./BookingForm";
import VehicleGalleryModal from "./VehicleGalleryModal";

function VehiclesSection({ vehicles }) {
  const visibleVehicles = useMemo(() => vehicles.slice(0, 2), [vehicles]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(visibleVehicles[0]?.id ?? "");
  const [galleryVehicle, setGalleryVehicle] = useState(null);

  const selectedVehicle = visibleVehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? null;

  const handleHireVehicle = (vehicle) => {
    setSelectedVehicleId(vehicle.id);
    setGalleryVehicle(null);
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="vehicles" className="band-fleet py-20">
      <div className="band-inner mx-auto max-w-6xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-emerald-300">Fleet Collection</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Choose your perfect ride</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Select a vehicle, then add your trip details to get a live estimate.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            isSelected={vehicle.id === selectedVehicleId}
            onOpenGallery={() => setGalleryVehicle(vehicle)}
          />
        ))}
      </div>

      <div id="booking" className="mt-12">
        <BookingForm selectedVehicle={selectedVehicle} onRemoveVehicle={() => setSelectedVehicleId("")} />
      </div>
      <VehicleGalleryModal
        key={galleryVehicle?.id ?? "none"}
        vehicle={galleryVehicle}
        onClose={() => setGalleryVehicle(null)}
        onHire={handleHireVehicle}
      />
      </div>
    </section>
  );
}

export default VehiclesSection;
