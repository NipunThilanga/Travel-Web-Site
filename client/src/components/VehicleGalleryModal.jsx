import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function VehicleGalleryModal({ vehicle, onClose, onHire }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!vehicle) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [vehicle]);

  useEffect(() => {
    if (!vehicle) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % vehicle.images.length);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + vehicle.images.length) % vehicle.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vehicle, onClose]);

  if (!vehicle || typeof document === "undefined") return null;

  const next = () => setIndex((i) => (i + 1) % vehicle.images.length);
  const prev = () => setIndex((i) => (i - 1 + vehicle.images.length) % vehicle.images.length);

  return createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        key={vehicle.id}
        className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm"
          aria-label="Close vehicle gallery"
        />

        <motion.div
          key={vehicle.id}
          initial={{ opacity: 0, y: 32, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="relative z-[121] w-full max-w-5xl overflow-hidden rounded-t-3xl border border-emerald-400/25 bg-slate-950 shadow-2xl shadow-emerald-950/35 sm:rounded-3xl"
        >
          <div className="flex items-start justify-between border-b border-emerald-500/20 px-5 py-4 sm:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-emerald-300/80">{vehicle.category}</p>
              <h3 className="mt-1 text-xl font-bold text-white sm:text-2xl">{vehicle.name}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 bg-white/5 p-2 text-white transition hover:border-emerald-400/50 hover:bg-emerald-400/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative">
            <img
              src={vehicle.images[index]}
              alt={`${vehicle.name} ${index + 1}`}
              className="h-[42vh] w-full object-cover sm:h-[54vh]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/35 p-2 text-white hover:bg-black/55"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/35 p-2 text-white hover:bg-black/55"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {vehicle.images.map((_, i) => (
                <button
                  key={`${vehicle.id}-dot-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition ${i === index ? "w-8 bg-emerald-300" : "w-2 bg-white/55"}`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
            <p className="text-sm text-slate-300">
              {vehicle.seats} seats · {vehicle.transmission} · ${vehicle.rates.perKm}/km · ${vehicle.rates.perDay}/day
            </p>
            <button
              type="button"
              onClick={() => onHire(vehicle)}
              className="rounded-full bg-emerald-400 px-6 py-2.5 font-semibold text-slate-950 transition hover:bg-emerald-300"
            >
              Hire
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

export default VehicleGalleryModal;
