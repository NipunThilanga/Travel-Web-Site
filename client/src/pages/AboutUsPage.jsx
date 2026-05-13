import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  HeartHandshake,
  Leaf,
  MapPinned,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const pillars = [
  {
    icon: ShieldCheck,
    title: "Safety first",
    text: "Vetted vehicles, clear insurance expectations, and drivers who know when to slow down on hill-country bends.",
  },
  {
    icon: MapPinned,
    title: "Island-native routing",
    text: "We plan around monsoon pockets, festival traffic, and the quiet backroads that maps rarely love—until you do.",
  },
  {
    icon: HeartHandshake,
    title: "Human hospitality",
    text: "English-speaking chauffeurs, patient airport pickups, and the small touches—cold water, local tips—that turn transfers into memories.",
  },
  {
    icon: Leaf,
    title: "Thoughtful travel",
    text: "Fewer empty legs, smarter loops, and respect for the communities and wildlife that make Sri Lanka singular.",
  },
];

const moments = [
  { year: "Roots", label: "Family-run ethos", detail: "Born from a love of cross-island road trips and frustration with opaque pricing." },
  { year: "Fleet", label: "Curated wheels", detail: "Compact city runners to group vans—each chosen for real Sri Lankan roads, not brochure fantasies." },
  { year: "Today", label: "Serendib Drive", detail: "A modern booking layer on top of old-school care: WhatsApp clarity, fair estimates, and guides who still stop for roadside king coconut." },
];

function AboutUsPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative overflow-hidden pt-24 md:pt-28">
      {/* Ambient orbs */}
      {!reduceMotion && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-40 top-32 h-[28rem] w-[28rem] rounded-full bg-teal-500/12 blur-3xl"
            animate={{ x: [0, 24, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-[40%] h-[22rem] w-[22rem] rounded-full bg-cyan-400/10 blur-3xl"
            animate={{ x: [0, -18, 0], y: [0, 16, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Hero */}
      <section className="relative z-10 border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/80">
        <div className="band-inner mx-auto max-w-6xl px-4 pb-16 pt-8 md:pb-24 md:pt-12">
          <motion.div
            initial="hidden"
            animate="show"
            className="relative overflow-hidden rounded-3xl border border-teal-400/20 bg-slate-950/60 p-8 shadow-2xl shadow-teal-950/30 backdrop-blur-md md:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, rgba(45,212,191,0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(34,211,238,0.12), transparent 40%)",
              }}
            />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <motion.p
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-teal-300/90"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  About Serendib Drive Lanka
                </motion.p>
                <motion.h1
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="mt-4 bg-gradient-to-br from-white via-teal-100 to-cyan-200 bg-clip-text text-4xl font-bold leading-[1.1] text-transparent md:text-5xl lg:text-6xl"
                >
                  We don’t just drive the island—
                  <span className="block text-white/95">we choreograph it.</span>
                </motion.h1>
                <motion.p
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  className="mt-6 text-lg leading-relaxed text-slate-300 md:text-xl"
                >
                  Private transport with a pulse: curated routes, transparent fares, and chauffeurs who treat every
                  pickup like a welcome home—whether you’re landing at CMB or chasing sunrise on the east coast.
                </motion.p>
              </div>
              <motion.div
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col"
              >
                <Link
                  to="/booking"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/30 transition hover:from-teal-300 hover:to-emerald-300"
                >
                  <Compass className="h-4 w-4" />
                  Plan a trip
                </Link>
                <Link
                  to="/destinations"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-400/50 hover:bg-cyan-500/10"
                >
                  <Waves className="h-4 w-4 text-cyan-300" />
                  Browse destinations
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story band */}
      <section className="band-fleet relative z-10 py-16 md:py-24">
        <div className="band-inner relative z-10 mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm uppercase tracking-[0.28em] text-emerald-300/90">Our story</p>
              <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Built for the rhythm of the road</h2>
              <p className="mt-5 text-slate-400 leading-relaxed">
                Serendib Drive Lanka grew from late-night airport runs and tea-country weekends—the kind where the best
                moments happen between the pins on a map. We wanted a service that felt{" "}
                <span className="text-teal-200/95">honest</span>: no mystery surcharges, no ghosting on WhatsApp, no
                vans that rattle louder than the ocean.
              </p>
              <p className="mt-4 text-slate-400 leading-relaxed">
                Today we pair a lean digital booking flow with drivers who’ve memorised monsoon light on the Southern
                Expressway and the polite chaos of Pettah at rush hour. Same island—just fewer friction points between
                you and the next incredible view.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl border border-emerald-500/20 bg-slate-950/50 p-8 shadow-inner shadow-black/30"
            >
              <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-full border border-emerald-400/20 md:block" aria-hidden />
              <Users className="h-10 w-10 text-emerald-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">People, not pixels</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Behind every quote is a real dispatcher and a driver who knows your mother’s village name might sound
                nothing like how Google spells it. We’re small enough to care, structured enough to scale—and always
                hungry for the next epic detour you suggest.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Live estimates tied to your route—not generic tables from 2014.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  Province-by-province inspiration when you’re not sure where next.
                </li>
                <li className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  WhatsApp handoff so confirmations feel like texting a friend who owns a fleet.
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pillars bento */}
      <section className="relative z-10 border-y border-cyan-500/10 bg-slate-950/90 py-16 md:py-24">
        <div className="band-inner mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/90">What guides us</p>
            <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Four promises we refuse to break</h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-cyan-500/15 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 shadow-lg shadow-cyan-950/20"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,211,238,0.12) 0%, transparent 55%, rgba(45,212,191,0.08) 100%)",
                  }}
                />
                <item.icon className="relative h-9 w-9 text-cyan-300" strokeWidth={1.75} />
                <h3 className="relative mt-4 text-lg font-semibold text-white">{item.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{item.text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="band-destinations relative z-10 py-16 md:py-24">
        <div className="band-inner relative z-10 mx-auto max-w-6xl px-4">
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/90">The arc</p>
          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">How we got here</h2>
          <div className="relative mt-12 max-w-3xl">
            <div
              aria-hidden
              className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400/50 via-cyan-500/20 to-transparent md:left-1/2 md:-translate-x-1/2"
            />
            <ul className="space-y-10">
              {moments.map((m, i) => (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col gap-2 pl-12 md:grid md:grid-cols-2 md:gap-8 md:pl-0 ${i % 2 === 0 ? "md:text-right" : ""}`}
                >
                  <div className={`md:col-span-1 ${i % 2 === 0 ? "md:pr-12" : "md:col-start-2 md:pl-12"}`}>
                    <span className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/40 bg-slate-950 text-xs font-bold text-cyan-200 md:left-1/2 md:-translate-x-1/2">
                      {i + 1}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400/90">{m.year}</p>
                    <p className="text-lg font-semibold text-white">{m.label}</p>
                  </div>
                  <p className={`text-sm leading-relaxed text-slate-400 md:col-span-1 ${i % 2 === 0 ? "md:col-start-2 md:pl-12 md:text-left" : "md:pr-12 md:text-right"}`}>
                    {m.detail}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="relative z-10 bg-gradient-to-b from-slate-950 to-slate-950 py-16 md:py-20">
        <div className="band-inner mx-auto max-w-6xl px-4">
          <div className="grid gap-10 rounded-3xl border border-white/10 bg-slate-900/40 p-8 backdrop-blur md:grid-cols-3 md:p-10">
            {[
              { stat: "9", label: "Provinces in our showcase", sub: "Curated place galleries you can actually book toward." },
              { stat: "24/7", label: "Airport muscle memory", sub: "CMB runs, red-eye hugs, and calm when bags go missing." },
              { stat: "∞", label: "Detour appetite", sub: "If the light hits Sigiriya right, we’ll find 15 minutes—safely." },
            ].map((s) => (
              <div key={s.label} className="text-center md:text-left">
                <p className="font-mono text-4xl font-bold tabular-nums text-teal-300 md:text-5xl">{s.stat}</p>
                <p className="mt-2 font-semibold text-white">{s.label}</p>
                <p className="mt-2 text-sm text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 flex flex-col items-center justify-center gap-4 text-center"
          >
            <p className="max-w-xl text-slate-400">
              Ready when you are—tell us your dates, your people, and how spicy you like your hopper stops. We’ll
              handle the choreography.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-300"
              >
                Start booking
              </Link>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default AboutUsPage;
