import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import LoginForm from "../components/organisms/LoginForm";
import { useSesion } from "../context/SesionContext";
import { obtenerMensajeError } from "../service/api";
import { useTituloPagina } from '../hooks/useTituloPagina';

function LoginPage() {
  useTituloPagina('Iniciar Sesión');
  const navigate = useNavigate();
  const location = useLocation();
  const sesionCtx = useSesion();

  const handleLogin = async (datos) => {
    try {
      const usuario = await sesionCtx.iniciarSesion(datos.email, datos.password);

    if (usuario) {
      toast.success(`Bienvenido/a de nuevo, ${usuario.nombre}`);
      navigate(location.state?.desde ?? "/");
    }
    } catch (error) {
      toast.error(obtenerMensajeError(error));
    }
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