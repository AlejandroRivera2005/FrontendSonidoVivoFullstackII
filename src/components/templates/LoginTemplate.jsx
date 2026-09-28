import LoginForm from "../organisms/LoginForm";

function LoginTemplate(props) {
  return (
    <main className="plantilla-login">
      <div className="contenedor-login">
        <LoginForm titulo={props.tituloFormulario} />
      </div>
    </main>
  );
}

export default LoginTemplate;