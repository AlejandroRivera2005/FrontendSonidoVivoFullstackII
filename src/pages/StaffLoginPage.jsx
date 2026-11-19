import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useSesion } from "../context/SesionContext";
import { obtenerMensajeError } from "../service/api";
import { useTituloPagina } from '../hooks/useTituloPagina';

function StaffLoginPage() {
  useTituloPagina('Acceso Staff');
  const navigate = useNavigate();
  const { iniciarSesion } = useSesion();

  const handleStaffLogin = async (datos) => {
    try {
      await iniciarSesion(datos.email, datos.password);
      toast.success('Sesión iniciada.');
      navigate('/admin');
    } catch (error) {
      toast.error(obtenerMensajeError(error));
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