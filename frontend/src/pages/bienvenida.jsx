
import { useState } from "react";
import { useLocation } from "wouter";
import { iniciarSesion, registrarUsuario } from "../services/auth";

export default function Bienvenida() {
  const [, setLocation] = useLocation();

  
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");

  
  const [nombreRegistro, setNombreRegistro] = useState("");
  const [claveRegistro, setClaveRegistro] = useState("");

  
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [mensajeRegistro, setMensajeRegistro] = useState("");

 
  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeRegistro("");

    if (!usuario.trim() || !clave.trim()) {
      setError("Completá tu usuario y contraseña.");
      return;
    }

    try {
      setCargando(true);

      const respuesta = await iniciarSesion({
        usuario: usuario.trim(),
        clave: clave,
      });

      const datos = respuesta.datos;
      const usuarioLogueado = datos.usuario;

      const roles = usuarioLogueado.roles || [];

      const esAdmin = roles.some(
        (rol) => rol.nombre.toLowerCase() === "admin"
      );

      const esUsuario = roles.some(
        (rol) =>
          rol.nombre.toLowerCase() === "user" ||
          rol.nombre.toLowerCase() === "usuario"
      );

      if (esAdmin) {
        setError(
          "Para ingresar como administrador, utilizá el acceso de administración."
        );
        return;
      }

      if (!esUsuario) {
        setError("Tu cuenta no tiene permisos para ingresar.");
        return;
      }

      localStorage.removeItem("usuarioAdmin");
      localStorage.setItem("token", datos.token);
      localStorage.setItem(
        "usuarioCliente",
        JSON.stringify(usuarioLogueado)
      );

      setLocation("/usuarios");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError(
        error.response?.data?.mensaje ||
        "No se pudo iniciar sesión. Revisá tus credenciales."
      );
    } finally {
      setCargando(false);
    }
  };

  
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeRegistro("");

    if (!nombreRegistro.trim() || !claveRegistro.trim()) {
      setError("Completá todos los campos.");
      return;
    }

    try {
      setCargando(true);

      await registrarUsuario({
        nombreUsuario: nombreRegistro.trim(),
        clave: claveRegistro,
      });

      setUsuario(nombreRegistro.trim());
      setClave("");
      setNombreRegistro("");
      setClaveRegistro("");

      setMostrarRegistro(false);
      setMensajeRegistro("¡Te registraste correctamente! Ahora iniciá sesión.");

    } catch (error) {
      console.error("Error al registrar usuario:", error);

      setError(
        error.response?.data?.mensaje ||
        "No se pudo completar el registro. Intentá nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] flex items-center justify-center p-6">

     
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#E03EB4]/50 blur-2xl" />
      <div className="absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-[#34E5FF]/50 blur-2xl" />
      <div className="absolute top-1/4 left-[45%] w-24 h-24 rounded-full bg-[#F8F272] opacity-80" />
      <div className="absolute bottom-20 left-[8%] w-16 h-16 rounded-full bg-[#FF7E6B] opacity-70" />
      <div className="absolute top-16 right-[30%] w-12 h-12 rounded-full bg-[#B47AEA] opacity-70" />

      <section className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 items-center gap-12">

       
        <div className="flex flex-col items-start gap-5">

          <h1 className="text-6xl md:text-8xl font-black text-[#2B1055] leading-none">
            JScream
          </h1>

          <p className="text-2xl md:text-3xl font-semibold text-[#2B1055]">
            ¡Bienvenido a nuestro mundo de helados!
          </p>

          <p className="text-lg text-[#2B1055]/70">
            Elegí tus sabores favoritos y creá tu combinación ideal.
          </p>

        
          <form
            onSubmit={manejarInicioSesion}
            className="w-full max-w-md flex flex-col gap-4 mt-3"
          >

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[#2B1055]">
                Nombre de usuario
              </label>

              <input
                type="text"
                placeholder="Ingresá tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full rounded-xl border-2 border-[#B47AEA]/40 bg-white/80 px-4 py-3 outline-none focus:border-[#E03EB4]"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[#2B1055]">
                Contraseña
              </label>

              <input
                type="password"
                placeholder="Ingresá tu contraseña"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="w-full rounded-xl border-2 border-[#B47AEA]/40 bg-white/80 px-4 py-3 outline-none focus:border-[#E03EB4]"
                required
              />
            </div>

            {error && !mostrarRegistro && (
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            )}

            {mensajeRegistro && (
              <p className="text-sm text-green-700 text-center font-semibold">
                {mensajeRegistro}
              </p>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="bg-[#F8F272] text-[#2B1055] border-2 border-[#2B1055] px-10 py-4 rounded-full font-bold text-lg shadow-[4px_4px_0_#2B1055] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#2B1055] transition-all disabled:opacity-50"
            >
              {cargando ? "Ingresando..." : "Entrar"}
            </button>

          </form>

          <p className="text-[#2B1055]/80">
            ¿No tenés cuenta?{" "}
            <button
              type="button"
              onClick={() => {
                setError("");
                setMensajeRegistro("");
                setMostrarRegistro(true);
              }}
              className="font-bold text-[#E03EB4] hover:underline"
            >
              Registrate
            </button>
          </p>

        </div>

        
        <div className="relative flex items-center justify-center">
          <div className="absolute w-72 h-72 md:w-[420px] md:h-[420px] rounded-full bg-[#B47AEA]/40" />

          <img
            src="/Cono de helado kawaii con cereza.png"
            alt="Helado de JScream"
            className="relative w-72 md:w-[440px] max-h-[80vh] object-contain drop-shadow-2xl"
          />
        </div>

      </section>

      
      {mostrarRegistro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2B1055]/50 backdrop-blur-sm p-4">

          <div className="relative w-full max-w-md rounded-3xl border-2 border-[#B47AEA]/40 bg-white p-8 shadow-2xl">

            
            <button
              type="button"
              onClick={() => {
                setMostrarRegistro(false);
                setError("");
              }}
              className="absolute left-5 top-5 text-2xl font-bold text-[#2B1055] hover:text-[#E03EB4]"
              aria-label="Volver al inicio de sesión"
            >
              ←
            </button>

            <div className="mb-6 mt-6 text-center">
              <h2 className="text-3xl font-black text-[#2B1055]">
                Crear cuenta
              </h2>

              <p className="mt-2 text-[#2B1055]/60">
                ¡Sumate al mundo JScream!
              </p>
            </div>

            <form
              onSubmit={manejarRegistro}
              className="flex flex-col gap-5"
            >

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#2B1055]">
                  Nombre de usuario
                </label>

                <input
                  type="text"
                  placeholder="Elegí tu nombre de usuario"
                  value={nombreRegistro}
                  onChange={(e) => setNombreRegistro(e.target.value)}
                  minLength={2}
                  required
                  className="w-full rounded-xl border-2 border-[#B47AEA]/40 bg-[#FFF3FB]/50 px-4 py-3 outline-none focus:border-[#E03EB4]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[#2B1055]">
                  Contraseña
                </label>

                <input
                  type="password"
                  placeholder="Elegí tu contraseña"
                  value={claveRegistro}
                  onChange={(e) => setClaveRegistro(e.target.value)}
                  minLength={4}
                  required
                  className="w-full rounded-xl border-2 border-[#B47AEA]/40 bg-[#FFF3FB]/50 px-4 py-3 outline-none focus:border-[#E03EB4]"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={cargando}
                className="w-full rounded-xl bg-[#E03EB4] py-3 font-bold text-white shadow-md transition hover:bg-[#C92B9D] disabled:opacity-50"
              >
                {cargando ? "Registrando..." : "Registrar"}
              </button>

            </form>

            <button
              type="button"
              onClick={() => {
                setMostrarRegistro(false);
                setError("");
              }}
              className="mt-5 w-full text-center font-semibold text-[#7B3FC6] hover:underline"
            >
              ← Volver al inicio de sesión
            </button>

          </div>
        </div>
      )}

      {/*Acceso de admin*/}
      <button
        type="button"
        onClick={() => setLocation("/login-admin")}
        className="absolute bottom-4 right-5 z-20 text-sm font-semibold text-[#2B1055]/50 hover:text-[#E03EB4]"
      >
        Administración
      </button>

    </div>
  );
}
