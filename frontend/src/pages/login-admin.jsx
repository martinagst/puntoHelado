
import { useState } from "react";
import { Link, useLocation } from "wouter";
import Input from "../components/ui/input";
import { iniciarSesion } from "../services/auth";

export default function LoginAdmin() {
  const [, setLocation] = useLocation();

  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const haySesion = Boolean(localStorage.getItem("token"));

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError("");

    if (!usuario.trim() || !clave.trim()) {
      setError("Completá el usuario y la contraseña.");
      return;
    }

    try {
      setCargando(true);
      const respuesta = await iniciarSesion({
        usuario: usuario,
        clave: clave,
      });

      const datos = respuesta.datos;
      const usuarioLogueado = datos.usuario;

      
      const esAdmin = usuarioLogueado.roles.some(
        (rol) => rol.nombre.toLowerCase() === "admin");

      if (!esAdmin) {
        setError("No tenés permisos para ingresar a la administración.");
        return;
      }

      localStorage.setItem("token", datos.token);
      localStorage.setItem(
        "usuarioAdmin",
        JSON.stringify(usuarioLogueado));

      setLocation("/usuarios");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);

      setError(
        error.response?.data?.mensaje ||
        "No se pudo iniciar sesión. Revisá tus credenciales.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF3FB] via-[#F3F0FF] to-[#E6FBFF] p-6">
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#E03EB4]/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#34E5FF]/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#2B1055]/10 bg-white/85 p-8 shadow-xl backdrop-blur-md">

        <header className="mb-8 text-center">
          <h1 className="text-4xl font-black text-[#2B1055]">
            JScream
          </h1>

          <p className="mt-2 text-lg font-semibold text-[#2B1055]/70">
            Administración
          </p>

          <p className="mt-1 text-sm text-[#2B1055]/50">
            Ingresá tus credenciales para continuar
          </p>
        </header>

        <form onSubmit={manejarEnvio} className="flex flex-col gap-5">

          <Input
            label="Usuario"
            type="text"
            placeholder="Ingresá tu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="Ingresá tu contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-600 text-center"> {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-3 rounded-xl bg-[#E03EB4] py-3 font-bold text-white shadow-md transition hover:bg-[#C92B9D] hover:shadow-lg disabled:opacity-50">
            {cargando ? "Ingresando..." : "Ingresar"}
          </button>

        </form>

        <div className="mt-6 flex flex-col items-center gap-4">

  {haySesion && (
    <button
      type="button"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuarioAdmin");
        setLocation("/");
      }}
      className="w-full rounded-xl border border-[#E03EB4] py-3 font-bold text-[#E03EB4] transition hover:bg-[#E03EB4] hover:text-white">
      Cerrar sesión
    </button>
  )}

  <Link
    href="/"
    className="text-sm font-semibold text-[#2B1055]/60 transition hover:text-[#E03EB4]">
    ← Volver a JScream
  </Link>

</div>
      </div>
    </div>
  );
}
