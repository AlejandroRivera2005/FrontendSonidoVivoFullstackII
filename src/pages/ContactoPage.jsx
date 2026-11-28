import { useRef, useState } from "react";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useTituloPagina } from '../hooks/useTituloPagina';
import { api, obtenerMensajeError } from "../service/api";
import { validarFormularioContacto } from "../utils/validaciones";

function ContactoPage() {
  useTituloPagina('Contacto');
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});
  const [procesando, setProcesando] = useState(false);
  const bloqueo = useRef(false);

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bloqueo.current) return;
    const erroresValidacion = validarFormularioContacto(form);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }
    bloqueo.current = true;
    setProcesando(true);
    try {
      await api.post("/contacto", form);
      toast.success("Mensaje registrado correctamente.");
      setForm({ nombre: "", email: "", mensaje: "" });
      setErrors({});
    } catch (error) {
      toast.error(obtenerMensajeError(error));
    } finally {
      bloqueo.current = false;
      setProcesando(false);
    }
  };

  return (
    <FormPageTemplate
      titulo="Contacto"
      descripcion="¿Tienes alguna duda o sugerencia? Déjanos tu mensaje para que el equipo pueda revisarlo."
    >
      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Nombre completo"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Escribe tu nombre"
          error={errors.nombre}
        />

        <FormField
          label="Correo electrónico"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tucorreo@email.com"
          error={errors.email}
        />

        <FormField
          label="Mensaje"
          type="textarea"
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          placeholder="Escribe tu mensaje aquí..."
          error={errors.mensaje}
        />

        <div className="mt-4">
          <Boton label="Enviar Mensaje" variant="primary" type="submit" disabled={procesando} />
        </div>
      </form>
    </FormPageTemplate>
  );
}

export default ContactoPage;