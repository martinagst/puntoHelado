import { useEffect } from "react";
import { crearUno, obtenerTodos } from "../services/product";
import { useState } from "react";
import { useLocation } from "wouter";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const productoSchema = z.object({
  nombre: z.string().min(1, "No puede estar vacio"),
  precio: z.coerce.number().min(1, "El precio debe ser positivo"),
});

export default function Products() {
  const [productos, setProductos] = useState([]);

  const [, navigate] = useLocation();

  useEffect(() => {
    obtenerTodos().then((data) => setProductos(data));
  }, []);

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(productoSchema),
  });

  const onSubmit = (data) => {
    const product = {
      ...data,
      ingredientes: [],
      categorias: [],
    };

    crearUno(product).then((res) => alert(res.mensaje));
  };

  return (
    <>
      <h1>Lista de productos disponibles ({productos.length}): </h1>

      <ul>
        {productos.map((pr) => (
          <li key={pr.id} onClick={() => navigate(`/products/${pr.id}`)}>
            {pr.nombre}
          </li>
        ))}
      </ul>

      <hr />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="nombre">Nombre: </label>
          <input type="text" id="nombre" {...register("nombre")} />
        </div>
        <div>
          <label htmlFor="precio">Precio: </label>
          <input type="number" id="precio" {...register("precio")} />
        </div>
        <button type="submit">Crear</button>
      </form>
    </>
  );
}
