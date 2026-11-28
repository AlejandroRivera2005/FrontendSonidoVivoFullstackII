import { useRef, useState } from "react";
import FormField from "../molecules/FormField";
import Boton from "../atoms/boton/Boton";
import { validarFormularioLogin } from "../../utils/validaciones";

function LoginForm(props) {
  const [form, setForm] = useState({ email: "", password: "" });
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
    const erroresValidacion = validarFormularioLogin(form);

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
        <Boton label="Iniciar Sesión" variant="primary" type="submit" disabled={procesando} />
      </div>
    </form>
  );
}

export default LoginForm;