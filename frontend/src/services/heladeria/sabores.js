
import axios from "axios";

const heladeria = axios.create({
  baseURL: "http://localhost:5200/api",
});


const obtenerAutorizacion = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});


export const obtenerSabores = async () => {
  const respuesta = await heladeria.get("/Sabores");
  return respuesta.data.datos;
};


export const obtenerTiposHelado = async () => {
  const respuesta = await heladeria.get("/TiposHelado");
  return respuesta.data.datos;
};


export const actualizarSabor = async (id, datos) => {
  const respuesta = await heladeria.put(
    `/Sabores/${id}`,
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};


export const eliminarSabor = async (id) => {
  const respuesta = await heladeria.delete(
    `/Sabores/${id}`,
    obtenerAutorizacion()
  );
  return respuesta.data;
};


export const crearSabor = async (datos) => {
  const respuesta = await heladeria.post(
    "/Sabores",
    datos,
    obtenerAutorizacion()
  );
  return respuesta.data;
};
