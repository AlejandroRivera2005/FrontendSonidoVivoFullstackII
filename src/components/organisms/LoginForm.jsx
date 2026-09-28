import { useState } from 'react';
import FormField from '../molecules/FormField';
import Boton from '../atoms/Boton';

function LoginForm(props) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  function validarCorreo(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function alEnviarFormulario(evento) {
    evento.preventDefault();
    setError('');
    setMensajeExito('');

    if (!validarCorreo(correo)) {
      setError('Por favor, introduce un formato de correo electrónico válido.');
      return;
    }

    if (contrasena.trim() === '') {
      setError('La contraseña no puede estar vacía.');
      return;
    }

    setMensajeExito(`¡Bienvenido de nuevo, ${correo}!`);

    if (props.onLoginExitoso) {
      props.onLoginExitoso({ correo, contrasena });
    }
  }

  return (
    <form onSubmit={alEnviarFormulario} className="formulario-login">
      <h2>{props.titulo || 'Iniciar Sesión'}</h2>

      <FormField
        id="correo"
        labelTexto="Correo Electrónico"
        type="email"
        placeholder="ejemplo@correo.com"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />

      <FormField
        id="contrasena"
        labelTexto="Contraseña"
        type="password"
        placeholder="********"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
      />

      {error && <p>{error}</p>}
      {mensajeExito && <p>{mensajeExito}</p>}

      <Boton type="submit" texto="Ingresar" className="boton-ingresar" />
    </form>
  );
}

export default LoginForm;