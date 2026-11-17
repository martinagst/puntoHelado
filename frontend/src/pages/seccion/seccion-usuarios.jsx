
import { Link, useRoute } from "wouter";

export default function SeccionUsuario() {
  const [match, params] = useRoute("/usuarios/:seccion");

  const secciones = {
    tamanios: "Tamaños de vasos",
    sabores: "Sabores de helado",
    salsas: "Salsas",
    precios: "Precios",
    pedido: "Seleccionar pedido",
  };

  const nombre = match ? secciones[params.seccion] : null;

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <div className="mx-auto max-w-2xl rounded-xl border border-orange-200 bg-white p-6">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E03EB4]/20 blur-3xl" />


        <h1 className="mb-4 text-2xl font-bold text-orange-950">
          {nombre || "Sección no encontrada"}
        </h1>

        <p className="mb-6 text-zinc-600">
          Próximamente encontrarás aquí la información de esta sección.
        </p>

        <Link
          href="/usuarios"
          className="font-semibold text-orange-800 hover:underline">
          ← Volver al menú
        </Link>
      </div>
    </main>
  );
}
