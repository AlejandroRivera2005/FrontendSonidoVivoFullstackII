import LoginTemplate from '../components/templates/LoginTemplate';

function LoginPage(props) {
  function manejarLogin(datosUsuario) {
  }

  return (
    <div className="pagina-login-container">
      <LoginTemplate 
        tituloFormulario={props.titulo || "¡Bienvenido a Sonido Vivo!"} 
        onLoginExitoso={manejarLogin}
      />
    </div>
  );
}

export default LoginPage;