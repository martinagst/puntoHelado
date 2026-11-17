

import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  obtenerTamanios,
  actualizarTamanio,
} from "../../services/heladeria/tamanios";

export default function SeccionUsuarioPrecios() {
  const [precios, setPrecios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensajeEdicion, setMensajeEdicion] = useState("");

  const [tamanioEditando, setTamanioEditando] = useState(null);
  const [precioNuevo, setPrecioNuevo] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Comprobar si el usuario es administrador
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

  // Obtener los tamaños y sus precios
  useEffect(() => {
    const cargarPrecios = async () => {
      try {
        setCargando(true);
        const datos = await obtenerTamanios();
        setPrecios(datos);
      } catch (error) {
        console.error("Error al obtener los precios:", error);
        setError("No se pudieron cargar los precios.");
      } finally {
        setCargando(false);
      }
    };

    cargarPrecios();
  }, []);

  // Volver a cargar los precios desde el backend
  const recargarPrecios = async () => {
    const datos = await obtenerTamanios();
    setPrecios(datos);
  };

  // Comenzar a modificar un precio
  const modificarPrecio = (tamanio) => {
    setTamanioEditando(tamanio.id);
    setPrecioNuevo(String(tamanio.precio));
    setMensajeEdicion("");
  };

  // Cancelar la modificación
  const cancelarEdicion = () => {
    setTamanioEditando(null);
    setPrecioNuevo("");
  };

  // Guardar el nuevo precio
  const guardarPrecio = async (e, tamanio) => {
    e.preventDefault();
    setMensajeEdicion("");

    const nuevoPrecio = Number(precioNuevo);

    if (!precioNuevo.trim() || !Number.isFinite(nuevoPrecio) || nuevoPrecio <= 0) {
      setMensajeEdicion("Ingresá un precio válido mayor que cero.");
      return;
    }

    try {
      setGuardando(true);

      await actualizarTamanio(tamanio.id, {
        precio: nuevoPrecio,
      });

      await recargarPrecios();

      setTamanioEditando(null);
      setPrecioNuevo("");
      setMensajeEdicion("¡Precio actualizado correctamente!");
    } catch (error) {
      console.error("Error al actualizar el precio:", error);
      setMensajeEdicion(
        error.response?.data?.mensaje || "No se pudo actualizar el precio."
      );
    } finally {
      setGuardando(false);
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
            Nuestros precios
          </h1>

          <p className="mt-3 text-lg text-[#2B1055]/70">
            Consultá los precios de nuestros helados
          </p>
        </header>

        {cargando && (
          <p className="text-center font-semibold text-[#2B1055]">
            Cargando precios...
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
                className="rounded-3xl border border-[#2B1055]/10 bg-white/80 p-8 shadow-md" >
                <h2 className="mb-6 text-2xl font-bold text-[#2B1055]">
                  {envase === "Vasito" ? "Vasitos" : "Cucuruchos"}
                </h2>

                <div className="flex flex-col gap-4">
                  {precios
                    .filter(
                      (item) =>
                        item.envase.toLowerCase() === envase.toLowerCase() &&
                        (esAdmin || item.isActivo)
                            )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="rounded-xl border border-[#2B1055]/10 bg-white p-4 text-[#2B1055]" >
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-semibold">
                            {item.cantBochas}{" "}
                            {item.cantBochas === 1 ? "bocha" : "bochas"}
                          </span>

                          {tamanioEditando !== item.id && (
                            <span className="font-bold">
                              ${item.precio.toLocaleString("es-AR")}
                            </span>
                          )}
                        </div>

                        {esAdmin && tamanioEditando === item.id && (
                          <form
                            onSubmit={(e) => guardarPrecio(e, item)}
                            className="mt-4 space-y-3" >
                            <label className="block font-semibold">
                              Nuevo precio
                            </label>

                            <input
                              type="number"
                              min="1"
                              step="0.01"
                              value={precioNuevo}
                              onChange={(e) => setPrecioNuevo(e.target.value)}
                              required
                              className="w-full rounded-xl border border-[#2B1055]/20 p-3"
                              placeholder="Ingresá el nuevo precio"
                            />

                            <div className="flex flex-wrap gap-2">
                              <button
                                type="submit"
                                disabled={guardando}
                                className="rounded-lg bg-[#E03EB4] px-4 py-2 font-semibold text-white hover:bg-[#B92B91] disabled:opacity-50">
                                {guardando ? "Guardando..." : "Guardar"}
                              </button>

                              <button
                                type="button"
                                onClick={cancelarEdicion}
                                disabled={guardando}
                                className="rounded-lg bg-zinc-200 px-4 py-2 font-semibold text-zinc-700 hover:bg-zinc-300">
                                Cancelar
                              </button>
                            </div>
                          </form>
                        )}

                        {esAdmin && tamanioEditando !== item.id && (
                          <button
                            type="button"
                            onClick={() => modificarPrecio(item)}
                            className="mt-3 rounded-lg bg-[#C8F2C5] px-4 py-2 font-semibold text-[#245C2B] hover:bg-[#AEE8AA]">
                            Modificar
                          </button>
                        )}

                        {esAdmin && !item.isActivo && (
                          <p className="mt-2 text-sm font-semibold text-zinc-500">
                            No disponible
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              </section>
            ))}

          </div>
        )}

        {mensajeEdicion && (
          <p className="mt-5 text-center font-semibold text-[#2B1055]">
            {mensajeEdicion}
          </p>
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
