import { useState } from "react";
import { toast } from "react-toastify";
import FormPageTemplate from "../components/templates/FormPageTemplate";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useTituloPagina } from '../hooks/useTituloPagina';
import { validarFormularioContacto } from "../utils/validaciones";

function ContactoPage() {
  useTituloPagina('Contacto');
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormularioContacto(form);
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
          <Boton label="Enviar Mensaje" variant="primary" type="submit" />
        </div>
      </form>
    </FormPageTemplate>
  );
}

export default ContactoPage;