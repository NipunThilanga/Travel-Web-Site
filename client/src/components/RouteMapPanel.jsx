const googleDirectionsUrl = (oLat, oLng, dLat, dLng) =>
  `https://www.google.com/maps/dir/?api=1&origin=${oLat},${oLng}&destination=${dLat},${dLng}&travelmode=driving`;

function osmEmbedSrc(origin, destination) {
  const pad = 0.18;
  const minLat = Math.min(origin.lat, destination.lat) - pad;
  const maxLat = Math.max(origin.lat, destination.lat) + pad;
  const minLng = Math.min(origin.lng, destination.lng) - pad;
  const maxLng = Math.max(origin.lng, destination.lng) + pad;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik`;
}

function RouteMapPanel({ routeEstimate, loading, error }) {
  const mapsKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const origin = routeEstimate?.origin;
  const dest = routeEstimate?.destination;

  if (loading) {
    return (
      <div className="flex h-[min(420px,55vh)] items-center justify-center rounded-2xl border border-emerald-500/20 bg-slate-950/50 text-sm text-slate-400">
        Calculating route…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/25 p-4 text-sm text-rose-100">
        {error}
      </div>
    );
  }

  if (!origin || !dest) {
    return (
      <div className="flex h-[min(420px,55vh)] items-center justify-center rounded-2xl border border-slate-600/30 bg-slate-950/40 p-4 text-center text-sm text-slate-500">
        Select pickup and destination to preview the route on the map.
      </div>
    );
  }

  const openGoogle = googleDirectionsUrl(origin.lat, origin.lng, dest.lat, dest.lng);

  return (
    <div className="flex flex-col gap-3">
      {routeEstimate?.method === "estimate" && (
        <p className="text-xs text-amber-200/90">
          Distance is an estimate (no Google server key, or API unavailable). Add{" "}
          <code className="rounded bg-slate-900/80 px-1.5 py-0.5 text-[0.7rem]">GOOGLE_MAPS_API_KEY</code> on the
          server for driving distance, and{" "}
          <code className="rounded bg-slate-900/80 px-1.5 py-0.5 text-[0.7rem]">VITE_GOOGLE_MAPS_API_KEY</code> in
          the client for the Google map embed.
        </p>
      )}

      <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-slate-950/50 shadow-lg shadow-emerald-950/20">
        {mapsKey ? (
          <iframe
            title="Route preview"
            className="h-[min(420px,55vh)] w-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/directions?key=${encodeURIComponent(
              mapsKey
            )}&origin=${origin.lat},${origin.lng}&destination=${dest.lat},${dest.lng}&mode=driving`}
          />
        ) : (
          <iframe
            title="Map overview"
            className="h-[min(420px,55vh)] w-full"
            style={{ border: 0 }}
            loading="lazy"
            src={osmEmbedSrc(origin, dest)}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={openGoogle}
          target="_blank"
          rel="noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-400/90 px-4 py-2.5 text-center text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
        >
          Open in Google Maps
        </a>
        {!mapsKey && (
          <p className="w-full text-[11px] text-slate-500">
            Showing OpenStreetMap overview. Add VITE_GOOGLE_MAPS_API_KEY for embedded Google directions (same Cloud
            project key must enable Maps Embed API).
          </p>
        )}
      </div>
    </div>
  );
}

export default RouteMapPanel;
