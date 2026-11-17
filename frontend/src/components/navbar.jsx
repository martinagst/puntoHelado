
import { Link, useLocation } from "wouter";
import { useState } from "react";

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const haySesion = Boolean(
  localStorage.getItem("token") &&
  (
    localStorage.getItem("usuarioAdmin") ||
    localStorage.getItem("usuarioCliente")
  )
);
  
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioAdmin");
    localStorage.removeItem("usuarioCliente");

    setMostrarConfirmacion(false);
    setLocation("/");
  };

  return (
    <>
      <nav className="relative z-20 border-b border-[#2B1055]/10 bg-white/70 px-8 py-4 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-[#2B1055] hover:text-[#E03EB4] transition">
            JScream
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="rounded-full px-5 py-2 font-semibold text-[#2B1055] transition hover:bg-[#E03EB4]/10 hover:text-[#E03EB4]">
              Inicio
            </Link>

            {haySesion && location !== "/login-admin" && (
              <button
                onClick={() => setMostrarConfirmacion(true)}
                className="rounded-full px-5 py-2 font-semibold text-[#2B1055] transition hover:bg-[#E03EB4]/10 hover:text-[#E03EB4]">
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </nav>

      {mostrarConfirmacion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">

            <h2 className="text-2xl font-black text-[#2B1055]">
              ¿Estás seguro?
            </h2>

            <p className="mt-3 text-[#2B1055]/70">
              ¿Querés cerrar tu sesión?
            </p>

            <div className="mt-7 flex justify-center gap-3">
              <button
                onClick={() => setMostrarConfirmacion(false)}
                className="rounded-full bg-gray-100 px-5 py-2 font-semibold text-[#2B1055] transition hover:bg-gray-200">
                Cancelar
              </button>

              <button
                onClick={cerrarSesion}
                className="rounded-full bg-[#E03EB4] px-5 py-2 font-semibold text-white transition hover:bg-[#C92B9D]">
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
