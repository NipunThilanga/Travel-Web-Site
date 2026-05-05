import { MessageCircle, Mail, Phone, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 24 },
  },
};

const groupVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

function ContactSection() {
  return (
    <section id="contact" className="band-contact py-20">
      <div className="band-inner mx-auto max-w-6xl px-4">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.25em] text-fuchsia-200/90"
        >
          Concierge
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="mt-3 bg-gradient-to-r from-amber-100 via-fuchsia-100 to-cyan-100 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
        >
          Need a custom itinerary?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="mt-2 max-w-2xl text-slate-400"
        >
          Reach us by mail, phone, or WhatsApp for bespoke routes and group travel.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-8 overflow-hidden rounded-3xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-950/25 via-slate-950/55 to-cyan-950/25 p-8 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-sm"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/18 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, 10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl"
            animate={{ x: [0, -15, 0], y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <p className="relative z-10 max-w-2xl text-slate-300">
            Talk to our travel team for airport transfers, multi-day tours, and chauffeur-guided journeys.
          </p>

          <motion.div
            variants={groupVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 mt-6 grid gap-4 md:grid-cols-3"
          >
            <motion.a
              variants={cardVariants}
              href="mailto:bookings@serendibdrive.lk"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl border border-fuchsia-400/20 bg-fuchsia-950/20 p-4 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-950/35 hover:shadow-lg hover:shadow-fuchsia-500/20"
            >
              <Mail className="mb-2 text-fuchsia-200" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-100">bookings@serendibdrive.lk</span>
                <ArrowUpRight className="h-4 w-4 text-fuchsia-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
            <motion.a
              variants={cardVariants}
              href="tel:+94770000000"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl border border-amber-400/20 bg-amber-950/20 p-4 transition hover:border-amber-300/50 hover:bg-amber-950/35 hover:shadow-lg hover:shadow-amber-500/20"
            >
              <Phone className="mb-2 text-amber-300" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-100">+94 77 000 0000</span>
                <ArrowUpRight className="h-4 w-4 text-amber-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
            <motion.a
              variants={cardVariants}
              href="https://wa.me/94770000000"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl border border-cyan-400/20 bg-cyan-950/20 p-4 transition hover:border-cyan-300/50 hover:bg-cyan-950/35 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              <MessageCircle className="mb-2 text-cyan-200" />
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-100">WhatsApp Quick Chat</span>
                <ArrowUpRight className="h-4 w-4 text-cyan-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ContactSection;
