import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";

function LoginPage() {
  const handleLogin = (datos) => {
    toast.success(`Bienvenido/a de nuevo (${datos.email})`);
  };

  return (
    <FormPageTemplate
      titulo="Iniciar Sesión"
      descripcion="Ingresa tus credenciales para acceder a tu cuenta y gestionar tus compras."
    >
      <LoginForm onSubmit={handleLogin} />
    </FormPageTemplate>
  );
}

export default LoginPage;