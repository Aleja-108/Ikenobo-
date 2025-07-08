import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
//import { dispararSweetBasico } from '../assets/SweetAlert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Login.css";

function LoginBootstrap() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
    } else {
      toast.error('Credenciales incorrectas');
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password).then((user) => {
      console.log("Usuario creado:", user);
      login(usuario);
      toast.error("Logueo exitoso");
    }).catch((error) => {
      if (error.code === "auth/invalid-credential") {
        toast.error("Credenciales incorrectas");
      }
      if (error.code === "auth/weak-password") {
        toast.error("Contraseña débil: mínimo 6 caracteres");
      }
      console.error(error.message);
    });
  }

  const handleSubmit2 = (e) => {
    logout();
  };

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password).then((user) => {
      login(usuario);
      toast.error("Logueo exitoso");
    }).catch((error) => {
      if (error.code === "auth/invalid-credential") {
        toast.error("Credenciales incorrectas");
      }
    });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  if (user || admin) {
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit2}>
        <button type="submit" className="btn btn-dark">Cerrar sesión</button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

  if (!user && show) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <form onSubmit={iniciarSesionEmailPass} className="p-4 border rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h3 className="mb-4 text-center">Iniciar sesión con Email y pass</h3>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              type="email"
              className="form-control custom-input"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control custom-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-2">Ingresar</button>
          <button
            className="btn btn-secondary w-100"
            onClick={handleShow}
          >
            Registrate
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

  if (!user && !show) {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center mt-5'>
        <form onSubmit={registrarUsuario} className="p-4 border rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="mb-4 text-center">Registrarse</h2>
          <div className="mb-3">
            <label className="form-label">Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="form-control custom-input"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control custom-input"
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-2">Registrarse</button>
          <button
            className="btn btn-secondary w-100"
            onClick={handleShow}
          >
            Iniciar Sesión
          </button>
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    );
  }

}

export default LoginBootstrap;
