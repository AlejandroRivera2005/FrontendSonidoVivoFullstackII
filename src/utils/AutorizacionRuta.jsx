import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSesion } from "../context/SesionContext";

export default function AutorizacionRuta({ admin = false }) {
  const { usuario, verificando } = useSesion();
  const location = useLocation();

  if (verificando) {
    return <p className="p-4">Verificando sesión...</p>;
  }

  if (!usuario) {
    return (
      <Navigate
        to={admin ? "/staff-login" : "/login"}
        state={{ desde: location.pathname }}
        replace
      />
    );
  }

  if (admin && usuario.rol !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
