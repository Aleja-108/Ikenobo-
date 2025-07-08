import { useState } from "react"
import "../styles/Productos.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { Link } from "react-router-dom";

function Card({producto }){
    {/*function navegar(){
        const ruta= "/productos/" + producto.id
        return <Navigate to={ruta} replace />
       } */}
        
 

    return(
        <div className="producto-card">
            <Link to={"/productos/"+ producto.id}><img className="producto-image" src={producto.imagen}></img></Link>

            <h2 className="producto-nombre">{producto.name}</h2>

            <div className="producto-precio">
                <span>{producto.price} $</span>
            </div>

            <Link to={"/productos/" + producto.id}>
                <button className="producto-button">Ver detalle</button>
            </Link>
        </div>
    )
}

export default Card