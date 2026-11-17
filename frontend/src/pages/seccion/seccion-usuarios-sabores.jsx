
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { usePedidoStore } from "../../stores/pedidos";
import {
  obtenerSabores,
  obtenerTiposHelado,
  crearSabor,
  actualizarSabor,
  eliminarSabor,
} from "../../services/heladeria/sabores";

export default function SeccionUsuarioSabores() {
  const tamanio = usePedidoStore((state) => state.tamanio);
  const seleccionados = usePedidoStore((state) => state.sabores);
  const seleccionarSabor = usePedidoStore(
    (state) => state.seleccionarSabor
  );

  const [sabores, setSabores] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [nombreNuevo, setNombreNuevo] = useState("");
  const [tipoNuevo, setTipoNuevo] = useState("");
  const [mensajeEdicion, setMensajeEdicion] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Comprobar si el usuario es administrador
  const usuario = localStorage.getItem("usuarioAdmin");

  const esAdmin = (() => {
    try {
      const datosUsuario = usuario ? JSON.parse(usuario) : null;

      return (
        datosUsuario?.roles?.some(
          (rol) => rol.nombre.toLowerCase() === "admin" ) ?? false
         );
    } catch {
      return false;
    }
  })();

  // Obtener sabores y tipos desde el backend
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const [datosSabores, datosTipos] = await Promise.all([
          obtenerSabores(),
          obtenerTiposHelado(),
        ]);

        // Asociar cada sabor con nombre de su tipo
        const saboresConTipo = datosSabores.map((sabor) => {
          const tipo = datosTipos.find(
            (item) => item.id === sabor.tipoHeladoId
          );

          return {
            ...sabor,
            tipo: tipo?.tipo ?? "Tipo desconocido",
          };
        });

        setSabores(saboresConTipo);
        setTipos(datosTipos);
      } catch (error) {
        console.error("Error al obtener los sabores:", error);
        setError("No se pudieron cargar los sabores.");
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  // El administrador ve todos; el cliente solo los activos
  const saboresVisibles = esAdmin
    ? sabores
    : sabores.filter((sabor) => sabor.isActivo);

  // Volver a cargar los sabores
  const recargarSabores = async () => {
    const datos = await obtenerSabores();

    const saboresConTipo = datos.map((sabor) => {
      const tipo = tipos.find(
        (item) => item.id === sabor.tipoHeladoId
      );

      return {
        ...sabor,
        tipo: tipo?.tipo ?? "Tipo desconocido",
      };
    });

    setSabores(saboresConTipo);
  };

  // Agregar un sabor nuevo
  const agregarSabor = async (e) => {
    e.preventDefault();
    setMensajeEdicion("");

    const nombre = nombreNuevo.trim();
    const tipoHeladoId = Number(tipoNuevo);

    if (nombre.length < 2) {
      setMensajeEdicion(
        "El nombre debe tener al menos 2 caracteres."
      );
      return;
    }

    if (!tipoHeladoId) {
      setMensajeEdicion("Tenés que seleccionar un tipo de helado.");
      return;
    }

    const yaExiste = sabores.some(
      (sabor) =>
        sabor.nombre.toLowerCase() === nombre.toLowerCase() &&
        sabor.tipoHeladoId === tipoHeladoId
    );

    if (yaExiste) {
      setMensajeEdicion(
        "Ese sabor ya existe para el tipo seleccionado."
      );
      return;
    }

    try {
      setGuardando(true);

      await crearSabor({
        nombre: nombre,
        isActivo: true,
        tipoHeladoId: tipoHeladoId,
      });

      await recargarSabores();

      setNombreNuevo("");
      setTipoNuevo("");
      setMensajeEdicion("¡Sabor agregado correctamente!");
    } catch (error) {
      console.error("Error al agregar sabor:", error);
      setMensajeEdicion(
        error.response?.data?.mensaje ||
          "No se pudo agregar el sabor."
      );
    } finally {
      setGuardando(false);
    }
  };

  // Activar o desactivar un sabor
  const cambiarEstadoSabor = async (sabor) => {
    setMensajeEdicion("");

    try {
      await actualizarSabor(sabor.id, {
        isActivo: !sabor.isActivo,
      });

      await recargarSabores();
      setMensajeEdicion(
        "Estado del sabor actualizado correctamente."
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      setMensajeEdicion(
        "No se pudo cambiar el estado del sabor."
      );
    }
  };

  // Eliminar un sabor definitivamente
  const borrarSabor = async (sabor) => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar el sabor ${sabor.nombre}?`
    );

    if (!confirmar) return;

    setMensajeEdicion("");

    try {
      await eliminarSabor(sabor.id);
      await recargarSabores();

      setMensajeEdicion("Sabor eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar sabor:", error);
      setMensajeEdicion("No se pudo eliminar el sabor.");
    }
  };

  const limiteAlcanzado =
    seleccionados.length >= (tamanio?.bochas ?? 0);

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
            Sabores
          </h1>

          <p className="mt-3 text-lg text-[#2B1055]/70">
            Elegí tus sabores favoritos
          </p>

          <p className="mt-2 text-sm text-[#2B1055]/60">
            {tamanio? `Podés elegir hasta ${tamanio.bochas} sabores. Seleccionaste ${seleccionados.length}.`: "Primero tenés que elegir un tamaño."}
          </p>
        </header>

        {cargando && (
          <p className="text-center font-semibold text-[#2B1055]">
            Cargando sabores...
          </p>
        )}

        {error && (
          <p className="text-center font-semibold text-red-600">
            {error}
          </p>
        )}

        {!cargando && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            {tipos.map((tipo) => (
              <section
                key={tipo.id}
                className="rounded-3xl border border-[#2B1055]/10 bg-white/80 p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold text-[#2B1055]">
                  {tipo.tipo}
                </h2>

                <div className="flex flex-col gap-3">

                  {saboresVisibles
                    .filter(
                      (sabor) =>
                        sabor.tipoHeladoId === tipo.id
                    )
                    .map((sabor) => {
                      const estaSeleccionado = seleccionados.some(
                        (item) =>
                          item.id === sabor.id ||
                          (item.nombre === sabor.nombre &&
                            item.tipo === sabor.tipo)
                      );

                      const deshabilitado =
                        !sabor.isActivo ||
                        (!estaSeleccionado && limiteAlcanzado);

                      return (
                        <button
                          key={sabor.id}
                          onClick={() => seleccionarSabor(sabor)}
                          disabled={deshabilitado}
                          className={`rounded-xl border p-4 text-left transition ${
                            !sabor.isActivo? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400": estaSeleccionado? "border-[#245C2B] bg-[#C8F2C5] text-[#245C2B]": limiteAlcanzado? "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400": "border-[#2B1055]/10 bg-white text-[#2B1055] hover:bg-[#F3F0FF]"}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">
                              {sabor.nombre}
                            </span>

                            <span className="font-semibold">
                              {!sabor.isActivo
                                ? "No disponible"
                                : estaSeleccionado
                                  ? "✓ Elegido"
                                  : "Seleccionar"}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                </div>
              </section>
            ))}

          </div>
        )}

        {/* Panel para administradores */}
        {esAdmin && (
          <section className="mt-10 rounded-3xl border border-[#E03EB4]/20 bg-white/90 p-8 shadow-lg">

            <h2 className="mb-6 text-center text-2xl font-bold text-[#2B1055]">
              Edición de sabores
            </h2>

            {/* Formulario para agregar sabores */}
            <form
              onSubmit={agregarSabor}
              className="mb-8 space-y-4">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Agregar un sabor
              </h3>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Nombre del sabor
                </label>

                <input
                  type="text"
                  minLength="2"
                  value={nombreNuevo}
                  onChange={(e) => setNombreNuevo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#2B1055]/20 p-3"
                  placeholder="Ingresá el nombre del sabor"
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-[#2B1055]">
                  Tipo de helado
                </label>

                <select
                  value={tipoNuevo}
                  onChange={(e) => setTipoNuevo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#2B1055]/20 bg-white p-3">
                  <option value="">
                    Seleccioná un tipo
                  </option>

                  {tipos.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.tipo}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={guardando}
                className="w-full rounded-xl bg-[#E03EB4] p-3 font-bold text-white transition hover:bg-[#B92B91] disabled:opacity-50">
                {guardando ? "Guardando..." : "Agregar sabor"}
              </button>
            </form>

            {/* Lista para activar, desactivar o eliminar */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-[#2B1055]">
                Administrar sabores existentes
              </h3>

              {sabores.map((sabor) => (
                <div
                  key={sabor.id}
                  className="flex flex-col gap-3 rounded-xl border border-[#2B1055]/10 bg-[#F3F0FF]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-[#2B1055]">
                      {sabor.nombre}
                    </p>

                    <p className="text-sm text-[#2B1055]/70">
                      {sabor.tipo} · {sabor.isActivo ? "Activo" : "Inactivo"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => cambiarEstadoSabor(sabor)}
                      className="rounded-lg bg-[#C8F2C5] px-4 py-2 font-semibold text-[#245C2B] hover:bg-[#AEE8AA]">
                      {sabor.isActivo ? "Desactivar" : "Activar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => borrarSabor(sabor)}
                      className="rounded-lg bg-red-100 px-4 py-2 font-semibold text-red-700 hover:bg-red-200" >
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
