import { useMemo } from "react";
import { useTourismData } from "./hooks/useTourismData";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VehiclesSection from "./components/VehiclesSection";
import ProvincesSection from "./components/ProvincesSection";
import ContactSection from "./components/ContactSection";
import PageLoader from "./components/PageLoader";

function App() {
  const { vehicles, provinces, loading, error } = useTourismData();
  const year = useMemo(() => new Date().getFullYear(), []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="band-root min-h-screen text-slate-100">
      <Navbar />
      <HeroSection />
      {error ? (
        <div className="band-fleet">
          <div className="band-inner mx-auto max-w-6xl px-4 py-12">
            <p className="rounded-xl border border-rose-500/50 bg-rose-950/50 p-4 text-rose-100 shadow-lg shadow-rose-950/40">
              {error}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="section-divider-teal" aria-hidden />
          <VehiclesSection vehicles={vehicles} />
          <div className="section-divider-cyan" aria-hidden />
          <ProvincesSection provinces={provinces} />
          <div className="section-divider-teal" aria-hidden />
        </>
      )}
      <ContactSection />
      <footer className="band-footer py-8 text-center text-sm text-slate-400">
        <p className="font-medium text-slate-500">{year} Serendib Drive Lanka. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
