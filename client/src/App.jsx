import { useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { useTourismData } from "./hooks/useTourismData";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import BookingPage from "./pages/BookingPage";
import AboutUsPage from "./pages/AboutUsPage";

function App() {
  const { vehicles, provinces, loading, error } = useTourismData();
  const year = useMemo(() => new Date().getFullYear(), []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="band-root min-h-screen text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage vehicles={vehicles} provinces={provinces} error={error} />} />
        <Route path="/destinations" element={<DestinationsPage provinces={provinces} error={error} />} />
        <Route path="/booking" element={<BookingPage vehicles={vehicles} provinces={provinces} />} />
        <Route path="/about-us" element={<AboutUsPage />} />
      </Routes>
      <footer className="band-footer py-8 text-center text-sm text-slate-400">
        <p className="font-medium text-slate-500">{year} Serendib Drive Lanka. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
