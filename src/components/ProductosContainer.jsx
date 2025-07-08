import { useState, useEffect } from "react";
import "../styles/Productos.css";
import Card from "./Card";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext"
import Footer from './Footer';
import { HelmetProvider } from 'react-helmet-async';
import { FaSearch } from "react-icons/fa";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


function ProductosContainer({} ){
    //const { id } = useParams();
    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();
    ////
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);
    // Calcular el índice de los productos a mostrar en la página actual
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    //
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")


    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los productos');
            setCargando(false);
        })
    }, []);}

    useEffect(() => {
        filtrarProductos(filtro)
    },[filtro])//filtro

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{

        return(
            
            <>
                <div className="productos-container">
                <HelmetProvider>
                    <title>Productos | Ikenobo</title>
                    <meta name="description" content="Explorá la variedad y distinción de productos" />
                </HelmetProvider>
                    <div className="input-group mb-3 mt-3">
                    <span className="input-group-text">
                        <FaSearch />
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar productos..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                <Row xs={1} md={2} lg={4} className="g-4 w-100">
                    {productosActuales.length > 0 ? productosActuales.map((producto) => (
                        <Col key={producto.id}>
                        <Card producto={producto} />
                        </Col>
                    )) : <p>No hay productos</p>}
                    </Row>

                    <div className="w-100 d-flex justify-content-center my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => cambiarPagina(index + 1)}
                        >
                        {index + 1}
                        </button>
                    ))}
                    </div>
                </div>
                <Footer />
            </>               
        )
    
    }
}

export default ProductosContainer