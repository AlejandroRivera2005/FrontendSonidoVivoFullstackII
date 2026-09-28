import StaffLoginTemplate from '../components/templates/StaffLoginTemplate';

function StaffLoginPage(props) {
  function manejarLogin(datosUsuario) {
  }

  return (
    <div className="pagina-login-container">
      <StaffLoginTemplate 
        tituloFormulario={props.titulo || "Sonido Vivo - Sólo personal autorizado"} 
        onLoginExitoso={manejarLogin}
      />
    </div>
  );
}

export default StaffLoginPage;