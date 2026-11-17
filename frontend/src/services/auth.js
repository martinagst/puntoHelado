
import axios from "axios";

const heladeria = axios.create({
  baseURL: "http://localhost:5200/api",
});

export const iniciarSesion = async (credenciales) => {
  const res = await heladeria.post("/Auth/login", credenciales);
  return res.data;
};

export const registrarUsuario = async (datos) => {
  const res = await heladeria.post("/Auth/register", datos);
  return res.data;
};
