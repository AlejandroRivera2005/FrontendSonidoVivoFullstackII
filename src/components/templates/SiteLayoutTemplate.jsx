import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { useSesion } from "../../context/SesionContext";

const menuTienda = [
  { label: "Catálogo", path: "/catalogo" },
  { label: "Blogs", path: "/blogs" },
  { label: "Mis pedidos", path: "/mis-pedidos", acceso: "usuario" },
  { label: "Iniciar sesión", path: "/login", acceso: "invitado" },
  { label: "Registrarse", path: "/registro", acceso: "invitado" },
  { label: "STAFF", path: "/staff-login", acceso: "invitado" },
  { label: "Panel de administración", path: "/admin", acceso: "admin", destacado: true },
];

const menuAdmin = [
  { label: "Productos", path: "/admin" },
  { label: "Pedidos", path: "/pedidos" },
  { label: "Usuarios", path: "/usuarios" },
  { label: "Mensajes", path: "/contactos" },
  { label: "Ver tienda", path: "/", destacado: true },
];

function SiteLayoutTemplate(props) {
  const navigate = useNavigate();
  const sesion = useSesion();
  const usuario = sesion.usuario;
  const esAdmin = usuario?.rol === "admin";

  function cerrarSesion() {
    sesion.cerrarSesion();
    toast.info("Sesión cerrada.");
    navigate("/", { replace: true });
  }

  const items = (props.admin ? menuAdmin : menuTienda).filter((item) => {
    if (item.acceso === "invitado") return !usuario && !sesion.verificando;
    if (item.acceso === "usuario") return Boolean(usuario);
    if (item.acceso === "admin") return esAdmin;
    return true;
  });

  if (usuario) {
    items.push({ label: "Cerrar sesión", onClick: cerrarSesion });
  }

  return (
    <>
      <Navbar
        admin={props.admin}
        menuItems={items}
        nombreUsuario={usuario?.nombre}
      />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer admin={props.admin} />
    </>
  );
}

export default SiteLayoutTemplate;