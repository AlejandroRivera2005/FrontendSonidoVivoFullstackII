function Boton(props) {
  const variant = props.variant || "primary";
  return (
    <button
      type={props.type || "button"}
      className={`btn btn-${variant} ${props.className || ''}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.texto}
      {props.label}
      {props.children}
    </button>
  );
}

export default Boton;