import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProvincePlacesModal from "./ProvincePlacesModal";

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

const PROVINCE_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=640&q=75";

function cardImageSrc(url) {
  try {
    const base = url.split("?")[0];
    return `${base}?auto=format&fit=crop&w=640&q=75`;
  } catch {
    return url;
  }
}

function provinceSpecificFallback(name) {
  const prompt = `${name || "Sri Lanka province"} landscape in Sri Lanka, realistic travel photography`;
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=640&height=420&nologo=true&model=flux`;
}

function ProvinceCardBody({ province, reduceMotion }) {
  const count = province.places?.length ?? 0;
  return (
    <>
      <div className="relative h-28 w-full shrink-0 overflow-hidden sm:h-32">
        <motion.img
          src={cardImageSrc(province.coverImage)}
          alt={province.name}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            const aiFallback = provinceSpecificFallback(province.name);
            if (!img.dataset.aiTried) {
              img.dataset.aiTried = "1";
              img.src = aiFallback;
            } else if (img.src !== PROVINCE_FALLBACK_IMAGE) {
              img.src = PROVINCE_FALLBACK_IMAGE;
            }
          }}
          className="h-full w-full object-cover"
          whileHover={reduceMotion ? undefined : { scale: 1.08 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <h3 className="absolute bottom-2 left-3 right-3 text-sm font-semibold leading-tight text-white drop-shadow-md sm:text-base">
          {province.name.replace(" Province", "")}
        </h3>
      </div>

      <div className="relative z-[1] flex flex-1 flex-col gap-2 p-3 pt-2">
        <div className="flex flex-wrap gap-1">
          {province.locations.map((loc) => (
            <motion.span
              key={loc.name}
              title={loc.description}
              initial={false}
              whileHover={
                reduceMotion ? undefined : { scale: 1.06, y: -1 }
              }
              transition={{ type: "spring", stiffness: 500, damping: 24 }}
              className="max-w-full cursor-default truncate rounded-md bg-cyan-950/45 px-2 py-0.5 text-[10px] font-medium text-cyan-100 ring-1 ring-cyan-500/25 sm:text-[11px]"
            >
              {loc.name}
            </motion.span>
          ))}
        </div>
        <p className="line-clamp-2 text-[11px] leading-snug text-slate-400 sm:text-xs">
          {province.locations.map((l) => l.description).join(" · ")}
        </p>
        {count > 0 && (
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-400/90">
            Tap · {count} places inside
          </p>
        )}
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,238,0.14) 0%, transparent 42%, rgba(6,182,212,0.1) 100%)",
        }}
      />
    </>
  );
}

function ProvincesSection({ provinces }) {
  const [activeProvince, setActiveProvince] = useState(null);
  const reduceMotion = useReducedMotion();
  const sets = chunkIntoSets(provinces, 3);
  const cv = reduceMotion ? cardVariantsReduced : cardVariants;

  return (
    <section id="destinations" className="band-destinations py-20">
      <div className="band-inner mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Sri Lanka Showcase</p>
        <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Destinations by province</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Tap any province card for a full gallery of curated places with imagery and long-form notes.
        </p>

        <div className="mt-12 flex flex-col gap-14 lg:gap-16">
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

        <ProvincePlacesModal province={activeProvince} onClose={() => setActiveProvince(null)} />
      </div>
    </section>
  );
}

export default ProvincesSection;
