import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { useSesion } from "../../context/SesionContext";

function ClienteLayoutTemplate(props) {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useSesion();

  const handleCerrarSesion = () => {
    cerrarSesion();
    toast.info("Sesión cerrada.");
    navigate("/");
  };

  const esAdmin = usuario?.rol === "admin";
  const itemsVisibles = (props.menuItems || []).filter((item) => {
    if (item.soloInvitado && usuario) return false;
    if (item.soloUsuario && !usuario) return false;
    if (item.soloStaffInvitado && esAdmin) return false;
    return true;
  });

  const items = [
    ...itemsVisibles,
    ...(esAdmin ? [{ label: "Panel de administración", path: "/admin", variant: "warning", className: "nav-admin-access" }] : []),
    ...(usuario ? [{
      label: `Cerrar sesión (${usuario.nombre?.split(" ")[0] || "Usuario"})`,
      variant: "text",
      onClick: handleCerrarSesion,
    }] : []),
  ];

  return (
    <>
      <Navbar brandName="Sonido Vivo" menuItems={items} />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ClienteLayoutTemplate;
