
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { usePedidoStore } from "../../stores/pedidos";
import {
  obtenerSalsas,
  crearSalsa,
  actualizarSalsa,
  eliminarSalsa,
} from "../../services/heladeria/salsas";

export default function SeccionUsuarioSalsas() {
  const salsaSeleccionada = usePedidoStore((state) => state.salsa);
  const seleccionarSalsa = usePedidoStore((state) => state.seleccionarSalsa);

  const [salsas, setSalsas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [gustoNuevo, setGustoNuevo] = useState("");
  const [mensajeEdicion, setMensajeEdicion] = useState("");
  const [guardando, setGuardando] = useState(false);

  const usuario = localStorage.getItem("usuarioAdmin");

  const esAdmin = (() => {
    try {
      const datosUsuario = usuario ? JSON.parse(usuario) : null;

      return (
        datosUsuario?.roles?.some(
          (rol) => rol.nombre.toLowerCase() === "admin"
        ) ?? false
      );
    } catch {
      return false;
    }
  })();

  // Obtener las salsas desde el backend
  useEffect(() => {
    const cargarSalsas = async () => {
      try {
        setCargando(true);
        const datos = await obtenerSalsas();
        setSalsas(datos);
      } catch (error) {
        console.error("Error al obtener las salsas:", error);
        setError("No se pudieron cargar las salsas.");
      } finally {
        setCargando(false);
      }
    };

    cargarSalsas();
  }, []);
  const salsasVisibles = esAdmin
    ? salsas
    : salsas.filter((salsa) => salsa.isActivo);

  // Volver a cargar las salsas desde el backend
  const recargarSalsas = async () => {
    const datos = await obtenerSalsas();
    setSalsas(datos);
  };

  // Crear una salsa nueva
  const agregarSalsa = async (e) => {
    e.preventDefault();
    setMensajeEdicion("");

    const gusto = gustoNuevo.trim();

    if (gusto.length < 2) {
      setMensajeEdicion("El gusto debe tener al menos 2 caracteres.");
      return;
    }

    const yaExiste = salsas.some(
      (salsa) => salsa.gusto.toLowerCase() === gusto.toLowerCase()
    );

    if (yaExiste) {
      setMensajeEdicion("Esa salsa ya existe.");
      return;
    }

    try {
      setGuardando(true);

      await crearSalsa({
        gusto: gusto,
        isActivo: true,
      });

      await recargarSalsas();

      setGustoNuevo("");
      setMensajeEdicion("¡Salsa agregada correctamente!");
    } catch (error) {
      console.error("Error al agregar salsa:", error);
      setMensajeEdicion(
        error.response?.data?.mensaje || "No se pudo agregar la salsa."
      );
    } finally {
      setGuardando(false);
    }
  };

  // Activar o desactivar una salsa
  const cambiarEstadoSalsa = async (salsa) => {
    setMensajeEdicion("");

    try {
      await actualizarSalsa(salsa.id, {
        isActivo: !salsa.isActivo,
      });

      await recargarSalsas();
      setMensajeEdicion("Estado de la salsa actualizado correctamente.");
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setMensajeEdicion("No se pudo cambiar el estado de la salsa.");
    }
  };

  // Eliminar una salsa definitivamente
  const borrarSalsa = async (salsa) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar la salsa ${salsa.gusto}?`
    );

    if (!confirmar) return;
    setMensajeEdicion("");

    try {
      await eliminarSalsa(salsa.id);
      await recargarSalsas();
      setMensajeEdicion("Salsa eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar salsa:", error);
      setMensajeEdicion("No se pudo eliminar la salsa.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] p-6">

      {/* Fondo */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E03EB4]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#34E5FF]/20 blur-3xl" />
      <div className="absolute top-1/4 left-[45%] w-32 h-32 rounded-full bg-[#F8F272]/20 blur-2xl" />
      <div className="absolute bottom-20 left-[8%] w-24 h-24 rounded-full bg-[#FF7E6B]/20 blur-2xl" />
      <div className="absolute top-16 right-[30%] w-20 h-20 rounded-full bg-[#B47AEA]/20 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-4xl pt-12">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-[#2B1055]">
            Salsas
          </h1>
          <p className="mt-3 text-lg text-[#2B1055]/70">
            Elegí tu salsa favorita
          </p>
        </header>

        {cargando && (
          <p className="text-center font-semibold text-[#2B1055]">
            Cargando salsas...
          </p>
        )}

        {error && (
          <p className="text-center font-semibold text-red-600">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <section className="grid gap-4 sm:grid-cols-2">
            {salsasVisibles.map((salsa) => {
              const estaSeleccionada =
                salsaSeleccionada?.gusto === salsa.gusto;

              return (
                <button
                  key={salsa.id}
                  disabled={!salsa.isActivo}
                  onClick={() => seleccionarSalsa(salsa)}
                  className={`rounded-2xl border p-6 text-left transition ${!salsa.isActivo? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400": estaSeleccionada? "border-[#245C2B] bg-[#C8F2C5] text-[#245C2B]": "border-[#2B1055]/10 bg-white text-[#2B1055] hover:bg-[#F3F0FF]"}`}>
                  <h2 className="text-xl font-bold">
                    {salsa.gusto}
                  </h2>

                  <p className="mt-2 text-sm">
                    {!salsa.isActivo ? "No disponible": estaSeleccionada? "✓ Elegida": "Seleccionar"}
                  </p>
                </button>
              );
            })}
          </section>
        )}

        {/* Panel para administradores */}
        {esAdmin && (
          <section className="mt-10 rounded-3xl border border-[#E03EB4]/20 bg-white/90 p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#2B1055]">
              Edición de salsas
            </h2>

            {/* Formulario agregar salsas */}
            <form onSubmit={agregarSalsa} className="mb-8 space-y-4">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Agregar una salsa
              </h3>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Nombre de la salsa
                </label>
                <input
                  type="text"
                  minLength="2"
                  value={gustoNuevo}
                  onChange={(e) => setGustoNuevo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#2B1055]/20 p-3"
                  placeholder="Ingresá el nombre de la salsa"
                />
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="w-full rounded-xl bg-[#E03EB4] p-3 font-bold text-white transition hover:bg-[#B92B91] disabled:opacity-50">
                {guardando ? "Guardando..." : "Agregar salsa"}
              </button>
            </form>

            {/* Lista para activar, desactivar o eliminar */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Administrar salsas existentes
              </h3>

              {salsas.map((salsa) => (
                <div
                  key={salsa.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#2B1055]/10 bg-[#F3F0FF]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-[#2B1055]">
                      {salsa.gusto}
                    </p>
                    <p className="text-sm text-[#2B1055]/70">
                      {salsa.isActivo ? "Activa" : "Inactiva"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => cambiarEstadoSalsa(salsa)}
                      className="rounded-lg bg-[#C8F2C5] px-4 py-2 font-semibold text-[#245C2B] hover:bg-[#AEE8AA]">
                      {salsa.isActivo ? "Desactivar" : "Activar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => borrarSalsa(salsa)}
                      className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {mensajeEdicion && (
              <p className="mt-5 text-center font-semibold text-[#2B1055]">
                {mensajeEdicion}
              </p>
            )}
          </section>
        )}

        <div className="mt-10 flex justify-center gap-6">
          <Link
            href="/usuarios"
            className="font-semibold text-[#E03EB4] hover:underline">
            ← Volver al menú
          </Link>

          <Link
            href="/usuarios/pedido"
            className="font-semibold text-[#E03EB4] hover:underline">
            Ver mi pedido →
          </Link>
        </div>

      </div>
    </main>
  );
}
