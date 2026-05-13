import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function HomeAboutPreview() {
  return (
    <section id="about-preview" className="relative z-10 border-y border-teal-500/10 bg-slate-950/80 py-14 md:py-20">
      <div className="band-inner mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-teal-500/15 bg-gradient-to-br from-slate-900/90 via-slate-950 to-emerald-950/20 p-8 shadow-xl shadow-teal-950/20 md:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-teal-500/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-teal-300/90">
                <Sparkles className="h-3.5 w-3.5" />
                Who we are
              </p>
              <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">Island roads, human pace</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400 md:text-base">
                Serendib Drive Lanka pairs curated vehicles with chauffeurs who know when to take the scenic bypass—and
                when to get you to the airport on time. Fair quotes, WhatsApp clarity, and routes that respect both
                monsoon skies and your bucket list.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-center md:items-end">
              <Link
                to="/about-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-950/25 transition hover:from-teal-300 hover:to-emerald-300 sm:w-auto md:min-w-[14rem]"
              >
                About us
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <p className="max-w-xs text-center text-xs text-slate-500 sm:max-w-none md:text-right">
                Our story, values, and the small team behind every kilometer.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeAboutPreview;
