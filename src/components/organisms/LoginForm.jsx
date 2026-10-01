import { useState } from "react";
import FormField from "../molecules/FormField";
import Boton from "../atoms/Boton";
import MensajeError from "../atoms/MensajeError";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email || !form.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!regexEmail.test(form.email)) {
      nuevosErrores.email = "Ingresa un correo electrónico válido.";
    }

    if (!form.password || !form.password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria.";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormulario();

    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      return;
    }

    setErrors({});
    if (onSubmit) {
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <p>Ingresa tu Correo electrónico</p>
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
        <p>Ingresa tu Contraseña</p>
        <FormField
          label="Contraseña"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        <MensajeError mensaje={errors.password} />
      </div>

      <div className="mt-4">
        <Boton
          label="Iniciar Sesión"
          variant="primary"
          type="submit"
        />
      </div>
    </form>
  );
}

export default LoginForm;