function Boton(props) {
  const variant = props.variant || "primary";
  return (
    <button 
      type={props.type || "button"} 
      className={`btn btn-${variant} ${props.className || ''}`} 
      onClick={props.onClick}
    >
      {props.texto}
      {props.label}
    </button>
  );
}

export default Boton;