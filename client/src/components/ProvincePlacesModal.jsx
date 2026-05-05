import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, MapPin, Sparkles } from "lucide-react";

const shellVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 48, rotateX: 10 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 320, damping: 28, mass: 0.85 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 30,
    rotateX: 6,
    transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
  },
};

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: 6 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 420, damping: 28 },
  },
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

function ProvincePlacesModal({ province, onClose }) {
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
            aria-label="Close province places"
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
            aria-labelledby="province-places-title"
            variants={reduceMotion ? undefined : shellVariants}
            initial={reduceMotion ? { opacity: 0 } : "hidden"}
            animate={reduceMotion ? { opacity: 1 } : "show"}
            exit={reduceMotion ? { opacity: 0 } : "exit"}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[101] flex max-h-[min(92vh,960px)] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-cyan-400/25 bg-gradient-to-b from-slate-950 via-slate-900/95 to-slate-950 shadow-[0_0_80px_-20px_rgba(34,211,238,0.45)] sm:rounded-3xl"
            style={{ perspective: 1200 }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-8 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, 26, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl"
              animate={
                reduceMotion
                  ? undefined
                  : { x: [0, -20, 0], y: [0, -24, 0], scale: [1, 1.05, 1] }
              }
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex items-start justify-between gap-4 border-b border-cyan-500/20 bg-slate-950/40 px-5 py-5 sm:px-8">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-cyan-300/90"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Highlights
                </motion.div>
                <h2 id="province-places-title" className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {province.name}
                </h2>
                <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="h-4 w-4 text-cyan-400/80" />
                  {places.length} curated places · scroll to explore
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <motion.div
                variants={reduceMotion ? undefined : listVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
              >
                {places.map((place, idx) => (
                  <motion.article
                    key={place.id}
                    variants={reduceMotion ? undefined : cardVariants}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -10,
                            rotateX: 3,
                            rotateY: idx % 2 === 0 ? -2 : 2,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400, damping: 22 },
                          }
                    }
                    style={{ transformStyle: "preserve-3d" }}
                    className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/70 shadow-lg shadow-cyan-950/30 ring-1 ring-white/5"
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
                          reduceMotion ? undefined : { scale: 1.12, rotate: idx % 2 === 0 ? 0.4 : -0.4 }
                        }
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <motion.div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"
                        initial={{ opacity: 0.9 }}
                      />
                      <motion.div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: idx * 0.04 + 0.05, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                      />
                      <motion.div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-70"
                        style={{
                          background:
                            "linear-gradient(120deg, rgba(34,211,238,0.25) 0%, transparent 40%, rgba(217,70,239,0.15) 100%)",
                        }}
                      />
                    </div>
                    <div className="space-y-3 p-4">
                      <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{place.name}</h3>
                      <p className="text-sm leading-relaxed text-slate-300">{place.description}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

export default ProvincePlacesModal;
