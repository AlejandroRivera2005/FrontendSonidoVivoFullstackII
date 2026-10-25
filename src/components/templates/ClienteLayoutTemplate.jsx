import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { useSesion } from "../../context/SesionContext";

function ClienteLayoutTemplate({ menuItems }) {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useSesion();

  const handleCerrarSesion = () => {
    cerrarSesion();
    toast.info("Sesión cerrada.");
    navigate("/");
  };

  const itemsVisibles = menuItems.filter((item) =>
    usuario ? !item.soloInvitado : !item.soloUsuario
  );

  const items = usuario
    ? [
        ...itemsVisibles,
        {
          label: `Cerrar sesión (${usuario.nombre.split(" ")[0]})`,
          variant: "text",
          onClick: handleCerrarSesion,
        },
      ]
    : itemsVisibles;

  return (
    <>
      <Navbar brandName="Sonido Vivo" menuItems={items} />
      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ClienteLayoutTemplate;