
import axios from "axios";

const heladeria = axios.create({
  baseURL: "http://localhost:5200/api",
});

// Obtener token del admin
const obtenerAutorizacion = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Obtener tamaños
export const obtenerTamanios = async () => {
  const respuesta = await heladeria.get("/Tamanios");
  return respuesta.data.datos;
};

// Actualizar un tamaño
export const actualizarTamanio = async (id, datos) => {
  const respuesta = await heladeria.put(
    `/Tamanios/${id}`,
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};

// Eliminar  tamaño
export const eliminarTamanio = async (id) => {
  const respuesta = await heladeria.delete(
    `/Tamanios/${id}`,
    obtenerAutorizacion()
  );
  return respuesta.data;
};

// Crear un tamaño
export const crearTamanio = async (datos) => {
  const respuesta = await heladeria.post(
    "/Tamanios",
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};