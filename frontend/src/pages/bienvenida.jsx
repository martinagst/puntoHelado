
import { useLocation } from "wouter";

export default function Bienvenida() {
  const [, setLocation] = useLocation();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] flex items-center justify-center p-6">

       {/*fondo*/ }
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#E03EB4]/50 blur-2xl" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#34E5FF]/50 blur-2xl" />
      <div className="absolute top-1/4 left-[45%] w-24 h-24 rounded-full bg-[#F8F272] opacity-80" />
      <div className="absolute bottom-20 left-[8%] w-16 h-16 rounded-full bg-[#FF7E6B] opacity-70" />
      <div className="absolute top-16 right-[30%] w-12 h-12 rounded-full bg-[#B47AEA] opacity-70" />

      <section className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/*bienvenidos*/ }
        <div className="flex flex-col items-start gap-6">
          <h1 className="text-6xl md:text-8xl font-black text-[#2B1055] leading-none">
            JScream
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-[#2B1055]">
            ¡Bienvenido a nuestro mundo de helados!
          </p>
          <p className="text-lg text-[#2B1055]/70">
            Elegí tus sabores favoritos y creá tu combinación ideal.
          </p>
          <button
            onClick={() => setLocation("/usuarios")}
            className="bg-[#F8F272] text-[#2B1055] border-2 border-[#2B1055] px-10 py-4 rounded-full font-bold text-lg shadow-[4px_4px_0_#2B1055] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2B1055] transition-all">
            Entrar
          </button>
        </div>

        {/*el heladito*/ }
        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-[#B47AEA]/40" />
          <img
            src="/Cono de helado kawaii con cereza.png"
            alt="Helado de JScream"
            className="relative w-72 md:w-[440px] max-h-[80vh] object-contain drop-shadow-2xl"
          />
        </div>

      </section>
    </div>
  );
}