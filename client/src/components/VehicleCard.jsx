import { motion } from "framer-motion";

function VehicleCard({ vehicle, isSelected, onOpenGallery }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      className={`overflow-hidden rounded-2xl border bg-slate-950/60 shadow-xl backdrop-blur-lg transition ${
        isSelected
          ? "border-emerald-400 shadow-emerald-500/15 ring-2 ring-emerald-400/30"
          : "border-emerald-500/15 hover:border-emerald-400/35"
      }`}
    >
      <button type="button" onClick={onOpenGallery} className="block w-full">
        <img
          src={vehicle.images[0]}
          alt={vehicle.name}
          className="h-52 w-full object-cover transition duration-500 hover:scale-[1.03]"
          loading="lazy"
        />
      </button>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{vehicle.name}</h3>
          <span className="rounded-full bg-emerald-950/80 px-3 py-1 text-xs text-emerald-200 ring-1 ring-emerald-500/25">
            {vehicle.category}
          </span>
        </div>
        <p className="text-sm text-slate-300">{vehicle.description}</p>
        <div className="text-sm text-slate-200">
          <p>From ${vehicle.rates.perKm}/km</p>
          <p>or ${vehicle.rates.perDay}/day</p>
        </div>
        <button
          type="button"
          onClick={onOpenGallery}
          className="w-full rounded-lg bg-emerald-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          {isSelected ? "Selected · View Gallery" : "Select Vehicle"}
        </button>
      </div>
    </motion.article>
  );
}

export default VehicleCard;
