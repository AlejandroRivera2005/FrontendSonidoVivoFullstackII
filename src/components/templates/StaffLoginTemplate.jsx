import StaffLoginForm from "../organisms/StaffLoginForm";

function StaffLoginTemplate(props) {
  return (
    <main className="plantilla-login">
      <div className="contenedor-login">
        <StaffLoginForm titulo={props.tituloFormulario} onLoginExitoso={props.onLoginExitoso} />
      </div>
    </main>
  );
}

export default StaffLoginTemplate;