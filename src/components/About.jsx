import React, { useEffect, useState } from 'react';
import '../styles/About.css';
import Header from './Header';
import Footer from './Footer';
import { Carousel } from 'react-bootstrap';

function About() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://68100dc827f2fdac24102255.mockapi.io/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  }, []);

  
  const imagenesCarrusel = productos.map(producto => producto.imagen);

  return (
    <>
      
      <main className="about-container">
        <div className="about-carousel-container">
          <Carousel controls={false} indicators={true} interval={2000}>
            {imagenesCarrusel.map((imgSrc, index) => (
              <Carousel.Item>
                <img
                  className="d-block w-100 about-carousel-image"
                  src={imgSrc}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <section className="about-content">
          <h1>Sobre Nosotros</h1>
          <p>
            En Ikenobo, nos dedicamos al arte milenario del ikebana, la tradición japonesa de
            arreglos florales. Nuestro objetivo es transmitir armonía, belleza y equilibrio en cada una de nuestras creaciones. 
          </p>
          <p>
            Cada ikebana representa una conexión con la naturaleza y una expresión artística única.
            En nuestra tienda encontrarás arreglos personalizados, talleres y materiales para explorar esta disciplina fascinante.
          </p>
          <p>
            Como cada arreglo es artesanal, no habrá dos composiciones exactamente iguales. La disposición floral varía según la estación, aunque algunas flores pueden ser importadas fuera de temporada para mantener la esencia del diseño y la jerarquía que nos caracteriza.
          </p>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default About;