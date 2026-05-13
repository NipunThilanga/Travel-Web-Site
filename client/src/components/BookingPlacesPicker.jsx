import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, ChevronUp, MapPin, Sparkles, X } from "lucide-react";
import { ProvinceCardBody } from "./ProvincesSection";

function chunkIntoSets(items, size) {
  const sets = [];
  for (let i = 0; i < items.length; i += size) {
    sets.push(items.slice(i, i + size));
  }
  return sets;
}

const rowVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28, mass: 0.75 },
  },
};

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
};

const PLACE_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80";

function placeImgDisplay(url) {
  return url || "";
}

function placeSpecificFallback(place) {
  const prompt = `${place?.name || "Sri Lanka travel place"} in Sri Lanka, realistic travel photography, natural light`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=900&height=560&nologo=true&model=flux`;
}

function labelForPlaceKey(key, provinces) {
  const colon = key.indexOf(":");
  if (colon === -1) return key;
  const provinceId = key.slice(0, colon);
  const placeId = key.slice(colon + 1);
  const province = provinces.find((p) => p.id === provinceId);
  const place = province?.places?.find((pl) => pl.id === placeId);
  return place?.name ?? key;
}

function BookingPlacePickModal({ province, stopPlaceKeys, onTogglePlace, onClose }) {
  const reduceMotion = useReducedMotion();
  const places = province?.places ?? [];

  useEffect(() => {
    if (!province) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [province]);

  useEffect(() => {
    if (!province) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [province, onClose]);

  if (typeof document === "undefined") return null;

  const content = (
    <AnimatePresence mode="wait">
      {province && (
        <motion.div
          key={province.id}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <motion.button
            type="button"
            aria-label="Close place picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-place-picker-title"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48, scale: 0.94 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] flex max-h-[min(92vh,960px)] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-emerald-400/25 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 shadow-[0_0_80px_-20px_rgba(52,211,153,0.35)] sm:rounded-3xl"
          >
            <div className="relative flex items-start justify-between gap-4 border-b border-emerald-500/20 bg-slate-950/40 px-5 py-5 sm:px-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-300/90"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Tap cards to add / remove
                </motion.div>
                <h2 id="booking-place-picker-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {province.name}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-emerald-400/80" />
                  Selected stops carry through to your route · multiple provinces allowed
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white transition hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <motion.div
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
                variants={reduceMotion ? undefined : { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
              >
                {places.map((place) => {
                  const compositeKey = `${province.id}:${place.id}`;
                  const selected = stopPlaceKeys.includes(compositeKey);
                  return (
                    <motion.article
                      key={place.id}
                      variants={
                        reduceMotion
                          ? undefined
                          : {
                              hidden: { opacity: 0, y: 40 },
                              show: {
                                opacity: 1,
                                y: 0,
                                transition: { type: "spring", stiffness: 420, damping: 28 },
                              },
                            }
                      }
                      className={`group relative overflow-hidden rounded-2xl border bg-slate-950/70 text-left shadow-lg ring-1 ring-white/5 transition-shadow ${
                        selected
                          ? "border-emerald-400/70 shadow-emerald-500/20 ring-2 ring-emerald-400/40"
                          : "border-cyan-500/20 hover:border-emerald-400/45"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => onTogglePlace(compositeKey)}
                        className="block w-full text-left"
                      >
                        <div className="relative h-44 overflow-hidden sm:h-48">
                          <motion.img
                            src={placeImgDisplay(place.image)}
                            alt=""
                            loading="lazy"
                            onError={(e) => {
                              const img = e.currentTarget;
                              const aiFallback = placeSpecificFallback(place);
                              if (!img.dataset.aiTried) {
                                img.dataset.aiTried = "1";
                                img.src = aiFallback;
                              } else if (img.src !== PLACE_FALLBACK_IMAGE) {
                                img.src = PLACE_FALLBACK_IMAGE;
                              }
                            }}
                            className="h-full w-full object-cover"
                            initial={{ scale: 1.05 }}
                            animate={{ scale: 1 }}
                            whileHover={
                              reduceMotion ? undefined : { scale: 1.08 }
                            }
                            transition={{ duration: 0.55 }}
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                          {selected && (
                            <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg">
                              <Check className="h-5 w-5" strokeWidth={2.5} />
                            </div>
                          )}
                          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200 ring-1 ring-emerald-500/40">
                            {selected ? "Added to trip" : "Tap to add"}
                          </div>
                        </div>
                        <div className="space-y-2 p-4">
                          <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{place.name}</h3>
                          <p className="line-clamp-4 text-sm leading-relaxed text-slate-300">{place.description}</p>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

function BookingPlacesPicker({ provinces, stopPlaceKeys, onStopPlaceKeysChange }) {
  const [activeProvince, setActiveProvince] = useState(null);
  const reduceMotion = useReducedMotion();
  const sets = useMemo(() => chunkIntoSets(provinces, 3), [provinces]);
  const cv = reduceMotion ? cardVariantsReduced : cardVariants;

  const togglePlace = (compositeKey) => {
    onStopPlaceKeysChange((prev) => {
      if (prev.includes(compositeKey)) return prev.filter((k) => k !== compositeKey);
      return [...prev, compositeKey];
    });
  };

  const removeAt = (index) => {
    onStopPlaceKeysChange((prev) => prev.filter((_, i) => i !== index));
  };

  const moveStop = (index, delta) => {
    onStopPlaceKeysChange((prev) => {
      const next = [...prev];
      const j = index + delta;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  return (
    <section className="rounded-2xl border border-cyan-500/15 bg-slate-950/40 p-4 shadow-inner shadow-black/20 sm:p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Destinations by province</p>
      <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Choose where you’re going</h2>
      <p className="mt-2 max-w-2xl text-sm text-slate-400">
        Open a province and tap image cards to build your route. You can pick multiple places across provinces—order
        matters for distance. Same style as the main site galleries.
      </p>

      {stopPlaceKeys.length > 0 && (
        <div className="mt-6 rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-300/90">Trip stops (order)</p>
          <ol className="mt-3 flex flex-col gap-2">
            {stopPlaceKeys.map((key, index) => (
              <li
                key={`${key}-${index}`}
                className="flex flex-wrap items-center gap-2 rounded-lg border border-emerald-500/20 bg-slate-950/60 px-3 py-2 text-sm text-slate-100"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/25 text-xs font-bold text-emerald-100">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1 truncate">{labelForPlaceKey(key, provinces)}</span>
                <span className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    aria-label="Move stop up"
                    disabled={index === 0}
                    onClick={() => moveStop(index, -1)}
                    className="rounded-md border border-white/10 p-1.5 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Move stop down"
                    disabled={index === stopPlaceKeys.length - 1}
                    onClick={() => moveStop(index, 1)}
                    className="rounded-md border border-white/10 p-1.5 text-slate-300 hover:bg-white/10 disabled:opacity-30"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Remove stop"
                    onClick={() => removeAt(index)}
                    className="rounded-md border border-rose-500/30 p-1.5 text-rose-200 hover:bg-rose-500/15"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-14 lg:gap-16">
        {sets.map((row, rowIdx) => (
          <div key={row.map((p) => p.id).join("-")} className="relative">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/80">
                Set {rowIdx + 1}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/35 to-transparent" />
            </div>

            <motion.div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px", amount: 0.15 }}
              variants={reduceMotion ? { hidden: {}, show: { transition: { staggerChildren: 0.04 } } } : rowVariants}
            >
              {row.map((province) => (
                <motion.button
                  key={province.id}
                  type="button"
                  variants={cv}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -10,
                          scale: 1.025,
                          transition: { type: "spring", stiffness: 450, damping: 24 },
                        }
                  }
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  onClick={() => setActiveProvince(province)}
                  className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/70 text-left shadow-lg shadow-cyan-950/25 ring-1 ring-white/5 transition-shadow duration-300 hover:border-cyan-400/45 hover:shadow-cyan-500/25 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
                >
                  <ProvinceCardBody province={province} reduceMotion={reduceMotion} />
                </motion.button>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      <BookingPlacePickModal
        province={activeProvince}
        stopPlaceKeys={stopPlaceKeys}
        onTogglePlace={togglePlace}
        onClose={() => setActiveProvince(null)}
      />
    </section>
  );
}

export default BookingPlacesPicker;
