import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDE_MS = 9000;

const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=85";
const VIDEO_SRC = "https://cdn.coverr.co/videos/coverr-sri-lanka-surf-4784/1080p.mp4";

function aiImageUrl(prompt) {
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1920&height=1080&nologo=true&model=flux`;
}

const SLIDES = [
  { type: "video", label: "Coast live", poster: VIDEO_POSTER, src: VIDEO_SRC },
  {
    type: "image",
    label: "Golden coast",
    prompt:
      "Sri Lanka tropical beach at sunset, palm trees, turquoise ocean, cinematic wide shot, golden light, photorealistic 8k",
    fallback:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80",
  },
  {
    type: "image",
    label: "Heritage",
    prompt:
      "Sigiriya rock fortress Sri Lanka, dramatic sky, lush green jungle below, epic landscape photography mist",
    fallback:
      "https://images.unsplash.com/photo-1588258529135-78ed91ac3588?auto=format&fit=crop&w=1920&q=80",
  },
  {
    type: "image",
    label: "Hill country",
    prompt:
      "Sri Lankan tea plantation rolling hills Nuwara Eliya morning mist green terraces aerial cinematic",
    fallback:
      "https://images.unsplash.com/photo-1596422846543-75e6fcae2108?auto=format&fit=crop&w=1920&q=80",
  },
  {
    type: "image",
    label: "Wildlife",
    prompt:
      "Wild elephants Sri Lanka national park golden hour dust safari cinematic nature documentary still",
    fallback:
      "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?auto=format&fit=crop&w=1920&q=80",
  },
];

const contentVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const HERO_COPY = {
  default: {
    kicker: "Premium Sri Lanka Mobility",
    title: "Explore Sri Lanka with trusted private transport.",
    body: "Modern fleet, professional drivers, and curated routes for beaches, mountains, wildlife, and cultural landmarks.",
  },
  hover: {
    kicker: "Private tours & transfers",
    title: "Door-to-door rides—from airport pickups to multi-day island loops.",
    body: "Clear quotes, English-speaking chauffeurs, and vehicles suited for quick hops or full heritage and wildlife itineraries.",
  },
};

function HeroImageInner({ slide, slideIndex, reduceMotion }) {
  const durationSec = SLIDE_MS / 1000;
  const [src, setSrc] = useState(() => aiImageUrl(slide.prompt));
  const [ready, setReady] = useState(false);

  return (
    <>
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ scale: reduceMotion ? 1 : 1 }}
        animate={{ scale: reduceMotion ? 1 : 1.1 }}
        transition={{ duration: durationSec - 0.35, ease: "linear" }}
      >
        <img
          src={src}
          alt=""
          onLoad={() => setReady(true)}
          onError={() => setSrc(slide.fallback)}
          decoding="async"
          fetchPriority={slideIndex < 2 ? "high" : "low"}
          className={`h-full w-full object-cover transition-opacity duration-[800ms] ease-out ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/25" />
    </>
  );
}

const slideTransition = { duration: 1.05, ease: [0.4, 0, 0.2, 1] };

function HeroSection() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const next = SLIDES[(index + 1) % SLIDES.length];
    if (next.type === "image") {
      const img = new Image();
      img.src = aiImageUrl(next.prompt);
    }
  }, [index]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-24">
      <div className="absolute inset-0 bg-slate-950" aria-hidden />

      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={slideTransition}
            className="absolute inset-0"
          >
            {SLIDES[index].type === "video" ? (
              <video
                className="absolute inset-0 h-full w-full object-cover contrast-[1.03] saturate-[1.06]"
                autoPlay
                muted
                loop
                playsInline
                poster={SLIDES[index].poster}
              >
                <source src={SLIDES[index].src} type="video/mp4" />
              </video>
            ) : (
              <HeroImageInner
                slide={SLIDES[index]}
                slideIndex={index}
                reduceMotion={reduceMotion}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Readability — gradients only, no backdrop-blur over the whole hero */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-slate-950/45"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(2,6,23,0.45)_100%)]"
        aria-hidden
      />

      {!reduceMotion && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-teal-500/18 blur-3xl"
            animate={{ x: [0, 28, 0], y: [0, -18, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-cyan-400/14 blur-3xl"
            animate={{ x: [0, -22, 0], y: [0, 22, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </>
      )}

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-20">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          className="group/card max-w-3xl rounded-3xl border border-white/25 bg-slate-950/50 p-8 shadow-2xl backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 supports-[backdrop-filter]:bg-slate-950/35 hover:border-teal-400/35"
        >
          <motion.div variants={itemVariants} className="relative min-h-[11.5rem] md:min-h-[13.5rem]">
            <div className="transition-all duration-300 ease-out group-hover/card:pointer-events-none group-hover/card:opacity-0">
              <p className="text-sm uppercase tracking-[0.25em] text-teal-200 drop-shadow-sm">
                {HERO_COPY.default.kicker}
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-md md:text-6xl">
                {HERO_COPY.default.title}
              </h1>
              <p className="mt-5 max-w-2xl text-slate-100 drop-shadow-sm md:text-lg">
                {HERO_COPY.default.body}
              </p>
            </div>
            <div
              className="absolute inset-0 opacity-0 transition-all duration-300 ease-out group-hover/card:pointer-events-auto group-hover/card:opacity-100"
              aria-hidden
            >
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-200 drop-shadow-sm">
                {HERO_COPY.hover.kicker}
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight text-white drop-shadow-md md:text-6xl">
                {HERO_COPY.hover.title}
              </h2>
              <p className="mt-5 max-w-2xl text-slate-100 drop-shadow-sm md:text-lg">
                {HERO_COPY.hover.body}
              </p>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/booking"
              className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-teal-300"
            >
              Book Your Ride
            </Link>
            <a
              href="#destinations"
              className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Explore Sri Lanka
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3">
        <div className="flex gap-2" role="tablist" aria-label="Hero background slides">
          {SLIDES.map((s, i) => (
            <button
              key={s.label}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${s.label}`}
              onClick={() => setIndex(i)}
              className="group relative h-2 overflow-hidden rounded-full bg-white/20 transition hover:bg-white/35"
              style={{ width: i === index ? 48 : 10 }}
            >
              {i === index && !reduceMotion && (
                <motion.span
                  key={index}
                  className="absolute inset-0 origin-left bg-teal-400/90"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                  style={{ transformOrigin: "0% 50%" }}
                />
              )}
              {i === index && reduceMotion && (
                <span className="absolute inset-0 bg-teal-400/90" />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs tracking-widest text-white/50">
          {SLIDES[index].label}
          {SLIDES[index].type === "image" ? " · AI imagery" : " · HD video"}
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
