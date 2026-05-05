import { useEffect, useState } from "react";
import axios from "axios";

export function useTourismData() {
  const [vehicles, setVehicles] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [vehiclesRes, provincesRes] = await Promise.all([
          axios.get("/api/vehicles"),
          axios.get("/api/provinces")
        ]);
        setVehicles(vehiclesRes.data);
        setProvinces(provincesRes.data);
      } catch {
        setError("Unable to load travel data. Please check if the backend server is running.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { vehicles, provinces, loading, error };
}
