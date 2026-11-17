
import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="relative z-20 border-b border-[#2B1055]/10 bg-white/70 px-8 py-4 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#2B1055] hover:text-[#E03EB4] transition"
        >
          JScream
        </Link>

        <Link
          href="/"
          className="rounded-full px-5 py-2 font-semibold text-[#2B1055] transition hover:bg-[#E03EB4]/10 hover:text-[#E03EB4]"
        >
          Inicio
        </Link>

      </div>
    </nav>
  );
}
