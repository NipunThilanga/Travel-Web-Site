import HeroSection from "../components/HeroSection";
import VehiclesSection from "../components/VehiclesSection";
import ProvincesSection from "../components/ProvincesSection";
import ContactSection from "../components/ContactSection";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage({ vehicles, provinces, error }) {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    if (!id) return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash]);

  return (
    <>
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
          <ProvincesSection provinces={provinces} preview previewCount={6} />
          <div className="section-divider-teal" aria-hidden />
        </>
      )}
      <ContactSection />
    </>
  );
}

export default HomePage;

