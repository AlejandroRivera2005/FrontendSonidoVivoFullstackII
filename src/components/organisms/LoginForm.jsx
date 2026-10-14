import { useState } from "react";
import FormField from "../molecules/FormField";
import Boton from "../atoms/boton/Boton";

function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      nuevosErrores.email = "El correo electrónico es obligatorio.";
    } else if (!regexEmail.test(form.email)) {
      nuevosErrores.email = "Ingresa un correo electrónico válido.";
    }

    if (!form.password.trim()) {
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
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
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
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        error={errors.password}
      />

      <div className="mt-4">
        <Boton label="Iniciar Sesión" variant="primary" type="submit" />
      </div>
    </form>
  );
}

export default LoginForm;