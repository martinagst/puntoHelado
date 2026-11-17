
import axios from "axios";

const heladeria = axios.create({
  baseURL: "http://localhost:5200/api",
});

// obtener token del admin
const obtenerAutorizacion = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// obtener salsas
export const obtenerSalsas = async () => {
  const respuesta = await heladeria.get("/Salsas");
  return respuesta.data.datos;
};

// actualizar una salsa
export const actualizarSalsa = async (id, datos) => {
  const respuesta = await heladeria.put(
    `/Salsas/${id}`,
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};

// elimliminar una salsa
export const eliminarSalsa = async (id) => {
  const respuesta = await heladeria.delete(
    `/Salsas/${id}`,
    obtenerAutorizacion()
  );
  return respuesta.data;
};

// crear una salsa
export const crearSalsa = async (datos) => {
  const respuesta = await heladeria.post(
    "/Salsas",
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};
