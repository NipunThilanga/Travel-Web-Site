import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import VehicleCard from "./VehicleCard";
import VehicleGalleryModal from "./VehicleGalleryModal";

function VehiclesSection({ vehicles }) {
  const visibleVehicles = useMemo(() => vehicles.slice(0, 2), [vehicles]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(visibleVehicles[0]?.id ?? "");
  const [galleryVehicle, setGalleryVehicle] = useState(null);
  const navigate = useNavigate();

  const selectedVehicle = visibleVehicles.find((vehicle) => vehicle.id === selectedVehicleId) ?? null;

  const handleHireVehicle = (vehicle) => {
    setGalleryVehicle(null);
    navigate(`/booking?vehicle=${encodeURIComponent(vehicle.id)}`);
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
          Select a vehicle to preview photos, then hire to open the booking page with your choice.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {visibleVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            isSelected={vehicle.id === selectedVehicleId}
            onOpenGallery={() => {
              setSelectedVehicleId(vehicle.id);
              setGalleryVehicle(vehicle);
            }}
          />
        ))}
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
