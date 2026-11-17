
import { Link } from "wouter";
import { usePedidoStore } from "../../stores/pedidos";

export default function SeccionUsuarioPedidos() {
  const tamanio = usePedidoStore((state) => state.tamanio);
  const sabores = usePedidoStore((state) => state.sabores);
 const salsa = usePedidoStore((state) => state.salsa);
 

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] p-6">

    
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E03EB4]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#34E5FF]/20 blur-3xl" />
      <div className="absolute top-1/4 left-[45%] w-32 h-32 rounded-full bg-[#F8F272]/20 blur-2xl" />
      <div className="absolute bottom-20 left-[8%] w-24 h-24 rounded-full bg-[#FF7E6B]/20 blur-2xl" />
      <div className="absolute top-16 right-[30%] w-20 h-20 rounded-full bg-[#B47AEA]/20 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl pt-12">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-[#2B1055]">
            Mi pedido
          </h1>
          <p className="mt-3 text-lg text-[#2B1055]/70">
            Revisá lo que elegiste
          </p>
        </header>

        <section className="rounded-3xl border border-[#2B1055]/10 bg-white/80 p-8 shadow-md">{tamanio ? (
  <>
    {/* Tamaño */}
    <div>
      <h2 className="text-2xl font-bold text-[#2B1055]">
        {tamanio.envase}
      </h2>

      <p className="mt-2 text-[#2B1055]/70">
        {tamanio.bochas} {tamanio.bochas === 1 ? "bocha" : "bochas"}
      </p>

      <p className="mt-2 text-xl font-bold text-[#E03EB4]">
        ${tamanio.precio.toLocaleString("es-AR")}
      </p>

      <Link
        href="/usuarios/tamanios"
        className="mt-4 inline-block font-semibold text-[#E03EB4] hover:underline">
        Modificar tamaño
      </Link>
    </div>

    {/* Sabores */}
    <div className="mt-8 border-t border-[#2B1055]/10 pt-6">
      <h2 className="text-xl font-bold text-[#2B1055]">
        Sabores
      </h2>

      {sabores.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {sabores.map((sabor, index) => (
            <li key={index} className="text-[#2B1055]/80">
              {sabor.nombre} – {sabor.tipo}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-[#2B1055]/60">
          Todavía no elegiste sabores.
        </p>
      )}

      <Link
        href="/usuarios/sabores"
        className="mt-4 inline-block font-semibold text-[#E03EB4] hover:underline">
        Modificar sabores
      </Link>
    </div>
  
  {/* Salsa */}
<div className="mt-8 border-t border-[#2B1055]/10 pt-6">
  <h2 className="text-xl font-bold text-[#2B1055]">
    Salsa
  </h2>

  {salsa ? (
    <p className="mt-3 text-[#2B1055]/80">
      {salsa.gusto}
    </p>
  ) : (
    <p className="mt-2 text-[#2B1055]/60">
      Todavía no elegiste una salsa.
    </p>
  )}

  <Link
    href="/usuarios/salsas"
    className="mt-4 inline-block font-semibold text-[#E03EB4] hover:underline"
  >
    Modificar salsa
  </Link>
</div>
</>
) : (
  <p className="text-center text-[#2B1055]/70">
    Todavía no elegiste un tamaño.
  </p>
)}
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/usuarios"
            className="font-semibold text-[#E03EB4] hover:underline">
            ← Volver al menú
          </Link>
        </div>

      </div>
    </main>
  );
}

