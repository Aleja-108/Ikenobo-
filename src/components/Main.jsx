import React from 'react';  
import '../index.css'
import App from '../App.jsx';
import '../styles/Main.css';
import CarruselDestacados from '../components/CarruselDestacados';

function Main() {  
    return (  
        <main className="main-container">
      <video
        src="/videos/ikebana01.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="main-video"
      ></video>

      <h2>Productos Destacados</h2>
      <CarruselDestacados />
      
    </main>  
    );  
}  
export default Main;  