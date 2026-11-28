import { useRef, useState } from "react";
import FormField from "../molecules/FormField";
import Boton from "../atoms/boton/Boton";
import { validarFormularioRegistro } from "../../utils/validaciones";

const form_inicial = {
  nombre: "",
  email: "",
  password: "",
  confirmarPassword: "",
};

function RegistroForm(props) {
  const usuarios = props.usuarios ?? [];
  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});
  const [procesando, setProcesando] = useState(false);
  const bloqueo = useRef(false);

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bloqueo.current) return;
    const erroresValidacion = validarFormularioRegistro(form, usuarios);

    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      return;
    }

    setErrors({});
    bloqueo.current = true;
    setProcesando(true);
    try {
      if (props.onSubmit) await props.onSubmit(form);
    } finally {
      bloqueo.current = false;
      setProcesando(false);
    }
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
        <Boton label="Registrarse" variant="primary" type="submit" disabled={procesando} />
      </div>
    </form>
  );
}

export default RegistroForm;