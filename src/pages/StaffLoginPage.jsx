
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useTituloPagina } from "../hooks/useTituloPagina";

const admin_email = "admin@sonidovivo.cl";
const admin_contrasena = "staff123";

function StaffLoginPage() {
  useTituloPagina("Acceso Staff");

  const navigate = useNavigate();

  const handleStaffLogin = (datos) => {
    const email = datos.email.trim().toLowerCase();
    const password = datos.password;

    if (
      email === admin_email &&
      password === admin_contrasena
    ) {
      toast.success("Bienvenido al panel de administración.");
      navigate("/admin");
      return;
    }

    toast.error("Correo electrónico o contraseña incorrectos.");
  };

  return (
    <FormPageTemplate
      titulo="Acceso Staff"
      descripcion="Portal de inicio de sesión exclusivo para el equipo de trabajo y administración."
    >
      <LoginForm onSubmit={handleStaffLogin} />
    </FormPageTemplate>
  );
}

export default StaffLoginPage;
