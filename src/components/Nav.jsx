import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaSearch, FaUser, FaShoppingCart, FaUserShield } from "react-icons/fa";
import { BsFileDiffFill } from 'react-icons/bs';
import "../styles/Nav.css";
import { useAuthContext } from "../contexts/AuthContext";
import { CarritoContext, CarritoProvider } from "../contexts/CarritoContext.jsx";

import { useContext } from "react";

function Nav({}) {  
  const {productosCarrito} = useContext(CarritoContext)
  const {user, admin} = useAuthContext();
  return (  
        <>
    {/* redes vacías -  buscador, login y admin en íconos  */}
    <div className="top-icons-bar">
      <div className="social-icons">
        <a href="#"><FaInstagram /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaFacebook /></a>
      </div>
      <div className="action-icons">
        
        <Link to="/login"><FaUser /></Link>
        <Link to="/carrito" className="carrito-icon">
          <FaShoppingCart />
          {productosCarrito.length > 0 && (
            <span className="carrito-count">{productosCarrito.length }</span>
          )}
        </Link>
        {admin ? <Link to="/admin"><FaUserShield /></Link>: <></>}
        {admin ?<Link to="/admin/agregarProductos"><BsFileDiffFill/> </Link>: <></>}
      </div>
    </div>

      {/* saqué el login y admin*/}
    <nav className="main-nav">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li></li>
      </ul>
    </nav>
  </>  
  );  
}  


export default Nav; 