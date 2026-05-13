import { Link } from "react-router-dom";

const links = [
  { to: "/#vehicles", label: "Vehicles" },
  { to: "/booking", label: "Booking" },
  { to: "/#destinations", label: "Destinations" },
  { to: "/#contact", label: "Contact" }
];

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-teal-500/15 bg-slate-950/75 shadow-sm shadow-black/20 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link
          to="/"
          className="bg-gradient-to-r from-teal-200 to-cyan-200 bg-clip-text text-lg font-semibold tracking-wide text-transparent"
        >
          Serendib Drive Lanka
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-slate-200 md:flex">
          {links.map((item) => (
            <li key={item.to}>
              <Link className="transition hover:text-teal-300" to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/booking"
          className="rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:from-teal-300 hover:to-emerald-300"
        >
          Book Now
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
