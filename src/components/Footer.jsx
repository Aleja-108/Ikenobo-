import React from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row text-center">
          <div className="col-12 col-md-4 mb-2">
            <p><FaWhatsapp /> +54 11 4123 5678</p>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <p><FaEnvelope /> contacto@ikenobo.ar</p>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <p><FaMapMarkerAlt /> Av. Alvear 864 - Buenos Aires</p>
          </div>
        </div>
      </div>
      <p className="footer-copy">&copy; 2025 - Ikenobo React</p>
    </footer>
  );
}

export default Footer;
