import { useState } from "react";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/Boton";
import MensajeError from "../components/atoms/MensajeError";

function ContactoPage() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!regexEmail.test(form.email)) {
      nuevosErrores.email = "Ingresa un correo electrónico válido.";
    }
    if (!form.mensaje.trim()) nuevosErrores.mensaje = "El mensaje es obligatorio.";

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }
    toast.success("¡Mensaje enviado con éxito!");
    setForm({ nombre: "", email: "", mensaje: "" });
    setErrors({});
  };

  return (
    <FormPageTemplate
      titulo="Contacto"
      descripcion="¿Tienes alguna duda o sugerencia? Déjanos tu mensaje y te responderemos a la brevedad."
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <FormField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Escribe tu nombre"
          />
          <MensajeError mensaje={errors.nombre} />
        </div>

        <div className="mb-3">
          <FormField
            label="Correo electrónico"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="tucorreo@email.com"
          />
          <MensajeError mensaje={errors.email} />
        </div>

        <div className="mb-3">
          <FormField
            label="Mensaje"
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            placeholder="Escribe tu mensaje aquí..."
          />
          <MensajeError mensaje={errors.mensaje} />
        </div>

        <div className="mt-4">
          <Boton label="Enviar Mensaje" variant="primary" type="submit" />
        </div>
      </form>
    </FormPageTemplate>
  );
}

export default ContactoPage;