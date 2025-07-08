import { useContext, useEffect, useState } from "react"; 
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle() {
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto, eliminarProducto } = useProductosContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        if (error === "Producto no encontrado") setError("Producto no encontrado");
        else if (error === "Hubo un error al obtener el producto") setError("Hubo un error al obtener el producto");
        setCargando(false);
      });
  }, [id]);

  const funcionCarrito = () => {
    if (cantidad < 1) return;
    dispararSweetBasico("Producto Agregado", "El producto fue agregado con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  };

  const dispararEliminar = () => {
    eliminarProducto(id)
      .then(() => {
        navigate("/productos");
      })
      .catch((error) => {
        dispararSweetBasico("Hubo un problema al eliminar el producto", error, "error", "Cerrar");
      });
  };

  const sumarContador = () => setCantidad(cantidad + 1);
  const restarContador = () => { if (cantidad > 1) setCantidad(cantidad - 1); };

  const handleVolver = () => {
    navigate(-1);
  };

  if (cargando) return <p className="text-center mt-5">Cargando producto...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={productoEncontrado.imagen}
        alt={productoEncontrado.name}
      />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} $</p>

        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>

        {admin ? (
          <>
            <Link to={`/admin/editarProducto/${id}`}>
              <button className="btn btn-actualizar w-50 mb-2 mx-auto d-block">
                Editar producto
              </button>
            </Link>
            <button
              className="btn btn-danger w-50 mb-2 mx-auto d-block"
              onClick={dispararEliminar}
            >
              Eliminar Producto
            </button>
          </>
        ) : (
          <button
            className="btn btn-actualizar w-50 mb-2 mx-auto d-block"
            onClick={funcionCarrito}
          >
            Agregar al carrito
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary w-50 mx-auto d-block"
          onClick={handleVolver}
        >
          Volver
        </button>
      </div>
    </div>
  );
}

export default ProductoDetalle;
