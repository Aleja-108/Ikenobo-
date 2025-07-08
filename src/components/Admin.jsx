import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Admin() {
  const { admin, logout } = useAuthContext();

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="d-flex justify-content-center mt-5">
      <button
        className="btn btn-dark"
        onClick={() => {
          logout();
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
