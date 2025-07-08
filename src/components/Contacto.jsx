import "../styles/Contacto.css";
import Footer from "./Footer";

function Contacto() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5">
        <form
          className="p-4 border rounded shadow"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <h2 className="mb-4 text-center">Contacto</h2>
          <p className="mb-4 text-center">
            Podés contactarnos completando el siguiente formulario o a través de nuestros
            canales directos:
          </p>

          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            placeholder="Tu nombre"
            className="form-control mb-3"
            required
          />

          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="tu@email.com"
            className="form-control mb-3"
            required
          />

          <label htmlFor="mensaje" className="form-label">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            placeholder="Escribí tu mensaje aquí..."
            rows="5"
            className="form-control mb-4"
            required
          ></textarea>

          <button type="submit" className="btn btn-actualizar w-100">
            Enviar
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default Contacto;
