import { Link } from "wouter";
import Circulo from "../components/circulo";
import { useState } from "react";


const secciones = [
  {
    nombre: "Tamanios",
    descripcion: "Elegí entre vasitos y cucuruchos",
    ruta: "/usuarios/tamanios",
    color: "bg-[#E03EB4]/15",
    
  },
  {
    nombre: "Sabores",
    descripcion: "Descubrí nuestros sabores",
    ruta: "/usuarios/sabores",
    color: "bg-[#B47AEA]/20",
    
  },
  {
    nombre: "Salsas",
    descripcion: "Agregá algo dulce a tu helado",
    ruta: "/usuarios/salsas",
    color: "bg-[#FF7E6B]/20",
    
  },
  {
    nombre: "Precios",
    descripcion: "Consultá nuestros precios",
    ruta: "/usuarios/precios",
    color: "bg-[#34E5FF]/20",
  },
];

export default function Usuario() {
  const [esAdmin] = useState(() => {
  const usuario = localStorage.getItem("usuarioAdmin");

  if (!usuario) return false;

  try {
    const datos = JSON.parse(usuario);
    return datos.roles?.some((rol) => rol.nombre.toLowerCase() === "admin") ?? false;
  } catch {
    return false;
  }
});
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] p-6">

      {/* Fondo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E03EB4]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#34E5FF]/20 blur-3xl" />
      <div className="absolute top-1/4 left-[45%] w-32 h-32 rounded-full bg-[#F8F272]/20 blur-2xl" />
      <div className="absolute bottom-20 left-[8%] w-24 h-24 rounded-full bg-[#FF7E6B]/20 blur-2xl" />
      <div className="absolute top-16 right-[30%] w-20 h-20 rounded-full bg-[#B47AEA]/20 blur-2xl" />

      {/* Contenido */}
      <main className="relative z-10 mx-auto max-w-4xl pt-12">

        <header className="mb-10 text-center">
          <h1 className="text-5xl font-black text-[#2B1055]">
            JScream
          </h1>
          <p className="mt-3 text-lg text-[#2B1055]/70">
            ¡Elegí lo que más te guste!
          </p>
        </header>
              
                {esAdmin && (
                  <div className="mb-6 rounded-2xl border border-[#B47AEA]/30 bg-white/80 p-4 text-center shadow-md">
                    <p className="font-bold text-[#2B1055]">
                        Modo administración
                     </p>

                      <p className="mt-1 text-sm text-[#2B1055]/70">
                       Iniciaste sesión como administrador.
                     </p>

    <Link
      href="/login-admin"
      className="mt-3 inline-block font-semibold text-[#E03EB4] transition hover:text-[#C92B9D] hover:underline">
      ← Volver a administración
    </Link>
  </div>
)}

        {/* Tarjetas secciones */}
        <nav className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {secciones.map((seccion) => (
            <Link
              key={seccion.ruta}
              href={seccion.ruta}
             className="group flex flex-col justify-center rounded-3xl border border-[#2B1055]/10 bg-white/80 p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E03EB4] hover:shadow-xl">
           <h2 className="text-xl font-bold text-[#2B1055]">
              {seccion.nombre}
            </h2>

        <p className="mt-2 text-sm text-[#2B1055]/60">
     {seccion.descripcion}
      </p>

          <span className="mt-4 font-semibold text-[#E03EB4]">
             Explorar →
           </span>
            </Link>
          ))}
        </nav>

        {/* Pedido */}
        <div className="mt-6">
          <Link
            href="/usuarios/pedido"
            className="flex items-center justify-between gap-4 rounded-3xl border border-[#2B1055]/10 bg-[#F8F272]/70 p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div>
              <h2 className="text-xl font-bold text-[#2B1055]">
                Mi pedido
              </h2>
              <p className="mt-1 text-sm text-[#2B1055]/70">
                Revisá y modificá lo que elegiste
              </p>
            </div>
            <span className="text-4xl">🛒</span>
          </Link>
        </div>
      </main>
      <Circulo />
    </div>
  );
}