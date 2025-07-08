import "../styles/Carrito.css";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { CarritoContext } from "../contexts/CarritoContext.jsx";

export default function Carrito() {
  const { user } = useAuthContext();
  const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

  const total = productosCarrito.reduce(
    (subTotal, producto) => subTotal + Number(producto.price) * producto.cantidad,
    0
  );

  function funcionDisparadora(id) {
    borrarProductoCarrito(id);
  }

  function funcionDisparadora2() {
    vaciarCarrito();
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mt-4 carrito-container">
      <h3 className="mb-4 text-center">Carrito de compras</h3>

      {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => {
          const precioUnitario = Number(producto.price) || 0;
          const subtotal = precioUnitario * producto.cantidad;

          return (
            <div className="card mb-3 carrito-card">
              <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={producto.imagen}
                    alt={producto.name}
                    className="img-fluid carrito-image"
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <h5 className="card-title">{producto.name}</h5>
                    <p className="card-text descripcion-carrito">
                      {producto.description}
                    </p>
                    <div className="row mb-2">
                      <div className="col-6">
                        <strong>Cantidad:</strong> {producto.cantidad}
                      </div>
                      <div className="col-6">
                        <strong>Precio unitario:</strong> {precioUnitario.toFixed(2)} $
                      </div>
                    </div>
                    <div className="mb-3 text-end">
                      <strong>Subtotal:</strong> {subtotal.toFixed(2)} $
                    </div>
                    <div className="text-end">
                      <button
                        className="btn btn-danger eliminar-producto-btn"
                        onClick={() => funcionDisparadora(producto.id)}
                      >
                        Eliminar producto
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">Carrito vacío</p>
      )}

      {total > 0 && (
        <>
          <div className="mt-4 text-end">
            <h5>Total del carrito: {total.toFixed(2)} $</h5>
          </div>
          <div className="mt-3 text-end">
            <button
              className="btn btn-danger vaciar-carrito-btn"
              onClick={funcionDisparadora2}
            >
              Vaciar Carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

