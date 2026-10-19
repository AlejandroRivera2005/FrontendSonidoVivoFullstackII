import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import RegistroForm from "../components/organisms/RegistroForm";
import { useUsuarios } from "../context/UsuarioContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

function RegistroPage() {
  useTituloPagina("Registrarse");
  const navigate = useNavigate();
  const usuariosCtx = useUsuarios();

  const handleRegistro = (datos) => {
    usuariosCtx.crear({
      nombre: datos.nombre.trim(),
      email: datos.email.trim().toLowerCase(),
      password: datos.password,
    });
    toast.success(`Cuenta creada correctamente. ¡Bienvenido/a, ${datos.nombre.trim()}!`);
    navigate("/login");
  };

  return (
    <FormPageTemplate
      titulo="Crear cuenta"
      descripcion="Completa tus datos para registrarte y poder gestionar tus compras."
    >
      <RegistroForm onSubmit={handleRegistro} usuarios={usuariosCtx.usuarios} />
    </FormPageTemplate>
  );
}

export default RegistroPage;