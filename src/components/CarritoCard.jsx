import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-producto" style={{color:"black"}}>{producto.name}</h3>
            {<p className="descripcion-carrito" style={{color:"grey"}}>{producto.description}</p>}
            <img className="carrito-image" src={producto.imagen}></img>
            <span style={{color:"black"}}>{producto.cantidad}</span>
            <div>
                <p style={{color:"black"}}>Precio unitario</p>
                <span style={{color:"black"}}>{producto.price} $</span>
            </div>
            <div>
                <p style={{color:"black"}}>Precio total</p>
                <span style={{color:"black"}}>{(producto.cantidad * producto.price).toFixed(2) } $</span>
            </div>
            <button className="carrito-boton" onClick={borrarDelCarrito}>X</button>      
            
        </div>
    )
}

export default CarritoCard