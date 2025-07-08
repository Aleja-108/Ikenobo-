import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/CarruselDestacados.css";

export default function CarruselDestacados() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://68100dc827f2fdac24102255.mockapi.io/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="carrusel-imagenes">
      {productos.map(producto => (
        <Link key={producto.id} to={`/productos/${producto.id}`}>
          <img
            src={producto.imagen}
            alt={`Producto ${producto.id}`}
            className="imagen-carrusel"
          />
        </Link>
      ))}
    </div>
  );
}