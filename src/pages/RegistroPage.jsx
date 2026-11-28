import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import RegistroForm from "../components/organisms/RegistroForm";
import { registrar } from "../service/sesionService";
import { obtenerMensajeError } from "../service/api";
import { useTituloPagina } from "../hooks/useTituloPagina";

function RegistroPage() {
  useTituloPagina("Registrarse");
  const navigate = useNavigate();

  const handleRegistro = async (datos) => {
    try {
    await registrar({
      nombre: datos.nombre.trim(),
      email: datos.email.trim().toLowerCase(),
      password: datos.password,
    });
    toast.success(`Cuenta creada correctamente. ¡Bienvenido/a, ${datos.nombre.trim()}!`);
    navigate("/login");
    } catch (error) {
      toast.error(obtenerMensajeError(error));
    }
  };

  return (
    <FormPageTemplate
      titulo="Crear cuenta"
      descripcion="Completa tus datos para registrarte y poder gestionar tus compras."
    >
      <RegistroForm onSubmit={handleRegistro} />
    </FormPageTemplate>
  );
}

export default RegistroPage;