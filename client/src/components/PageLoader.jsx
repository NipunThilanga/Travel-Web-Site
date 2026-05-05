import { motion } from "framer-motion";

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
        className="h-14 w-14 rounded-full border-4 border-teal-300 border-t-transparent"
      />
    </div>
  );
}

export default PageLoader;
