import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { dispararSweetBasico } from "../assets/SweetAlert";
import "../styles/Login.css";

function FormularioEdicion() {
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();
  const { id } = useParams();
  const [producto, setProducto] = useState(productoEncontrado || {});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProducto(id)
      .then(() => {
        setCargando(false);
      })
      .catch((error) => {
        if (error === "Producto no encontrado") {
          setError("Producto no encontrado");
        }
        if (error === "Hubo un error al obtener el producto") {
          setError("Hubo un error al obtener el producto");
        }
        setCargando(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const validarFormulario = () => {
    if (!producto.name?.trim()) {
      return "El nombre es obligatorio";
    }
    if (!producto.price || producto.price <= 0) {
      return "El valor debe ser mayor a 0";
    }
    if (!producto.description?.trim() || producto.description.length < 10) {
      return "La descripción debe tener al menos 10 caracteres";
    }
    if (!producto.imagen?.trim()) {
      return "La url de la imagen no debe estar vacía";
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
      editarProducto(producto)
        .then((prod) => {
          alert("Producto actualizado correctamente");
        })
        .catch((error) => {
          alert("Problema al actualizar el producto" + error.message);
        });
    } else {
      dispararSweetBasico(
        "Error en la carga del producto",
        validarForm,
        "error",
        "Cerrar"
      );
    }
  };

  const handleVolver = () => {
    navigate(-1);
  };

  const handleCancelar = () => {
    navigate("/productos");
  };

  if (cargando) {
    return <p className="text-center mt-5">Cargando...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-danger">{error}</p>;
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded shadow"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-4 text-center">Editar Producto</h2>

        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            name="name"
            value={producto.name || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen URL:</label>
          <input
            type="text"
            name="imagen"
            value={producto.imagen || ""}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            name="price"
            value={producto.price || ""}
            onChange={handleChange}
            className="form-control"
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="description"
            value={producto.description || ""}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-actualizar w-100 mb-3">
          Actualizar Producto
        </button>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-secondary w-50 btn-sm"
            onClick={handleVolver}
          >
            Volver
          </button>
          <button
            type="button"
            className="btn btn-light w-50 btn-sm"
            onClick={handleCancelar}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioEdicion;
