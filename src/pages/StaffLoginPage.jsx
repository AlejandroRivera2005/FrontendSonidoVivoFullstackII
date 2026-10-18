import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useTituloPagina } from '../hooks/useTituloPagina';

const staff_email = "admin@sonidovivo.cl";
const staff_password = "staff123";

function StaffLoginPage() {
  useTituloPagina('Acceso Staff');
  const navigate = useNavigate();

  const handleStaffLogin = (datos) => {
    const emailCorrecto = datos.email.trim().toLowerCase() === staff_email;
    const passwordCorrecta = datos.password === staff_password;

    if (emailCorrecto && passwordCorrecta) {
      toast.success(`Acceso de personal concedido para: ${datos.email}`);
      navigate("/admin");
    } else {
      toast.error("Credenciales incorrectas.");
    }
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