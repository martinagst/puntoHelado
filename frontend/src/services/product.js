import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:5007/api",
});

const heladeria = axios.create({
  baseURL: "http://localhost:5200/api",
});

export const obtenerSalsas = async () => {
  const res = await heladeria.get("/Salsas");
  return res.data;
};

export const obtenerTodos = async () => {
  const res = await base.get("/Productos");
  return res.data;
};
export const obtenerUnoPorId = async (id) => {
  const res = await base.get(`/Productos/${id}`);
  return res.data;
};

export const crearUno = async (producto) => {
  const res = await base.post("/Productos", producto);
  return res.data;
};

export const iniciarSesion = async (credenciales) => {
  const res = await heladeria.post("/Auth/login", credenciales);
  return res.data;
};

