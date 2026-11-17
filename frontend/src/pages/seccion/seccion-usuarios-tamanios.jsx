import { useEffect, useState } from "react";
import { Link } from "wouter";
import { usePedidoStore } from "../../stores/pedidos";
import {
  obtenerTamanios,
  crearTamanio,
  actualizarTamanio,
  eliminarTamanio,
} from "../../services/heladeria/tamanios";

export default function SeccionUsuarioTamanios() {
  const seleccionado = usePedidoStore((state) => state.tamanio);
  const seleccionarTamanio = usePedidoStore(
    (state) => state.seleccionarTamanio);
  const [tamanios, setTamanios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Datos del formulario para crear un tamaño
  const [envaseNuevo, setEnvaseNuevo] = useState("Vasito");
  const [bochasNuevas, setBochasNuevas] = useState(1);
  const [precioNuevo, setPrecioNuevo] = useState("");
  const [mensajeEdicion, setMensajeEdicion] = useState("");
  const [guardando, setGuardando] = useState(false);
  const usuario = localStorage.getItem("usuarioAdmin");

const esAdmin = (() => {
  try {
    const datosUsuario = usuario ? JSON.parse(usuario) : null;

    return (
      datosUsuario?.roles?.some(
        (rol) => rol.nombre.toLowerCase() === "admin") ?? false);
  } catch {
    return false;
  }
})();
  // Obtener los tamaños desde el backend
  useEffect(() => {
    const cargarTamanios = async () => {
      try {
        setCargando(true);
        const datos = await obtenerTamanios();

        // Adaptar los nombres del backend a los que usa Zustand
        const tamaniosAdaptados = datos.map((tamanio) => ({
          ...tamanio,
          bochas: tamanio.cantBochas,
        }));

        setTamanios(tamaniosAdaptados);
      } catch (error) {
        console.error("Error al obtener los tamaños:", error);
        setError("No se pudieron cargar los tamaños.");
      } finally {
        setCargando(false);
      }
    };

    cargarTamanios();
  }, []);
  
  const tamaniosVisibles = esAdmin? tamanios: tamanios.filter((tamanio) => tamanio.isActivo);
     

      // Volver a cargar los tamaños desde el backend
  const recargarTamanios = async () => {
    const datos = await obtenerTamanios();

    const tamaniosAdaptados = datos.map((tamanio) => ({
      ...tamanio,
      bochas: tamanio.cantBochas,
    }));

    setTamanios(tamaniosAdaptados);
  };

  // Crear un tamaño nuevo
  const agregarTamanio = async (e) => {
    e.preventDefault();
    setMensajeEdicion("");
      const cantidadBochas = Number(bochasNuevas);

if (
  !Number.isInteger(cantidadBochas) ||
  cantidadBochas < 1 ||
  cantidadBochas > 4
) {
  setMensajeEdicion("La cantidad debe ser de 1 a 4 bochas.");
  return;
}
      const yaExiste = tamanios.some(
  (tamanio) =>
    tamanio.envase === envaseNuevo &&
    tamanio.bochas === Number(bochasNuevas)
);

if (yaExiste) {
  setMensajeEdicion(
    "Ese tamaño ya existe. Podés activarlo si está inactivo.");
  return;
}

    try {
      setGuardando(true);

      await crearTamanio({
        envase: envaseNuevo,
        cantBochas: cantidadBochas,
        precio: Number(precioNuevo),
        isActivo: true,
      });

      await recargarTamanios();

      setPrecioNuevo("");
      setBochasNuevas(1);
      setEnvaseNuevo("Vasito");
      setMensajeEdicion("¡Tamaño agregado correctamente!");
    } catch (error) {
      console.error("Error al agregar tamaño:", error);
      console.log("Respuesta del backend:", error.response?.data);
      setMensajeEdicion(
        error.response?.data?.mensaje || "No se pudo agregar el tamaño.");
    } finally {
      setGuardando(false);
    }
  };

  // Activar o desactivar un tamaño
  const cambiarEstadoTamanio = async (tamanio) => {
    setMensajeEdicion("");

    try {
      await actualizarTamanio(tamanio.id, {
        isActivo: !tamanio.isActivo,
      });

      await recargarTamanios();
      setMensajeEdicion("Estado del tamaño actualizado correctamente.");
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setMensajeEdicion("No se pudo cambiar el estado del tamaño.");
    }
  };

  // Eliminar un tamaño definitivamente
  const borrarTamanio = async (tamanio) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar ${tamanio.envase} de ${tamanio.bochas} bochas?`
    );

    if (!confirmar) return;

    setMensajeEdicion("");

    try {
      await eliminarTamanio(tamanio.id);
      await recargarTamanios();
      setMensajeEdicion("Tamaño eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar tamaño:", error);
      setMensajeEdicion("No se pudo eliminar el tamaño.");
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

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-4xl pt-12">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-[#2B1055]">
            Tamaños
          </h1>

          <p className="mt-3 text-lg text-[#2B1055]/70">
            Elegí el envase y la cantidad de bochas
          </p>
        </header>

        {cargando && (
          <p className="text-center font-semibold text-[#2B1055]">
            Cargando tamaños...
          </p>
        )}

        {error && (
          <p className="text-center font-semibold text-red-600">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {["Vasito", "Cucurucho"].map((envase) => (
              <section
                key={envase}
                className="rounded-3xl border border-[#2B1055]/10 bg-white/80 p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-[#2B1055]">
                  {envase === "Vasito" ? "Vasitos" : "Cucuruchos"}
                </h2>

                <div className="flex flex-col gap-3">
                  {tamaniosVisibles
                    .filter((tamanio) => tamanio.envase === envase)
                    .map((tamanio) => {
                      const estaSeleccionado =
                        seleccionado?.envase === tamanio.envase &&
                        seleccionado?.bochas === tamanio.bochas;

                      return (
                        <button
                          key={tamanio.id}
                          disabled={!tamanio.isActivo}
                          onClick={() => seleccionarTamanio(tamanio)}
                          className={`rounded-xl border p-4 text-left transition ${
                            !tamanio.isActivo? "cursor-not-allowed border-zinc-200 bg-zinc-100 text-zinc-400": estaSeleccionado? "border-[#245C2B] bg-[#C8F2C5] text-[#245C2B]": "border-[#2B1055]/10 bg-white text-[#2B1055] hover:bg-[#F3F0FF]" }`}>
                          <span className="font-semibold">
                            {tamanio.bochas}{" "}
                            {tamanio.bochas === 1 ? "bocha" : "bochas"}
                          </span>

                          <p className="mt-2 text-sm font-semibold">{!tamanio.isActivo? "No disponible": estaSeleccionado? "Elegido": "Seleccionar"}
                          </p>
                        </button>
                      );
                    })}
                </div>
              </section>
            ))}

          </div>
        )}

                {/* Panel exclusivo para administradores */}
        {esAdmin && (
          <section className="mt-10 rounded-3xl border border-[#E03EB4]/20 bg-white/90 p-8 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold text-[#2B1055]">
              Edición de tamaños
            </h2>

            {/* Formulario para agregar tamaños */}
            <form onSubmit={agregarTamanio} className="mb-8 space-y-4">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Agregar un tamaño
              </h3>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Envase
                </label>
                <select
                  value={envaseNuevo}
                  onChange={(e) => setEnvaseNuevo(e.target.value)}
                  className="w-full rounded-xl border border-[#2B1055]/20 p-3">
                  <option value="Vasito">Vasito</option>
                  <option value="Cucurucho">Cucurucho</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Cantidad de bochas
                </label>
                <input
                      type="number"
                      min="1"
                      max="4"
                      step="1"
                      value={bochasNuevas}
                      onChange={(e) => setBochasNuevas(e.target.value)}
                      required
                      className="w-full rounded-xl border border-[#2B1055]/20 p-3"
                      placeholder="Ingresá la cantidad de bochas (1 a 4)" />
               </div>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Precio inicial
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={precioNuevo}
                  onChange={(e) => setPrecioNuevo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#2B1055]/20 p-3"
                  placeholder="Ingresá el precio"
                />
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="w-full rounded-xl bg-[#E03EB4] p-3 font-bold text-white transition hover:bg-[#B92B91] disabled:opacity-50">
                {guardando ? "Guardando..." : "Agregar tamaño"}
              </button>
            </form>

            {/* Lista para activar, desactivar o eliminar */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Administrar tamaños existentes
              </h3>

              {tamanios.map((tamanio) => (
                <div
                  key={tamanio.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#2B1055]/10 bg-[#F3F0FF]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-[#2B1055]">
                      {tamanio.envase} - {tamanio.bochas}{" "}
                      {tamanio.bochas === 1 ? "bocha" : "bochas"}
                    </p>
                    <p className="text-sm text-[#2B1055]/70">
                      {tamanio.isActivo ? "Activo" : "Inactivo"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => cambiarEstadoTamanio(tamanio)}
                      className="rounded-lg bg-[#C8F2C5] px-4 py-2 font-semibold text-[#245C2B] hover:bg-[#AEE8AA]">
                      {tamanio.isActivo ? "Desactivar" : "Activar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => borrarTamanio(tamanio)}
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
