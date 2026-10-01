import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";

function StaffLoginPage() {
  const handleStaffLogin = (datos) => {
    toast.success(`Acceso de personal concedido para: ${datos.email}`);
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