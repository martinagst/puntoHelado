import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { obtenerUnoPorId } from "../services/product";

export default function Product() {
  const { id } = useParams();
  const [prod, setProd] = useState({});

  useEffect(() => {
    obtenerUnoPorId(id).then((res) => setProd(res.datos));
  }, [id]);

  return (
    <>
      <h1>Detalle:</h1>
      <h2>
        Nombre: {prod.nombre} - ${prod.precio}
      </h2>
      <ul>
        <h3>Ingredientes: </h3>
        {prod?.ingredientes?.map((ing, i) => (
          <li key={i + ing}>{ing}</li>
        ))}
      </ul>
    </>
  );
}
