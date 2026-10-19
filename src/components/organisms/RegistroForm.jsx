import { useState } from "react";
import FormField from "../molecules/FormField";
import Boton from "../atoms/boton/Boton";
import { validarFormularioRegistro } from "../../utils/validaciones";

const form_inicial = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

function RegistroForm({ onSubmit, usuarios = [] }) {
  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormularioRegistro(form, usuarios);

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
        label="Nombre completo"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Tu nombre"
        autoComplete="name"
        error={errors.nombre}
      />

      <FormField
        label="Correo electrónico"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="tucorreo@email.com"
        autoComplete="email"
        error={errors.email}
      />

      <FormField
        label="Contraseña"
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.password}
      />

      <FormField
        label="Confirmar contraseña"
        type="password"
        name="confirmarPassword"
        value={form.confirmarPassword}
        onChange={handleChange}
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmarPassword}
      />

      <div className="mt-4">
        <Boton label="Registrarse" variant="primary" type="submit" />
      </div>
    </form>
  );
}

export default RegistroForm;