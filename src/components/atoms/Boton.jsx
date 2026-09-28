function Boton(props) {
  const variante = props.variante || "primary";
  return (
    <button 
      type={props.type || "button"} 
      className={`btn btn-${variante} ${props.className || ''}`} 
      onClick={props.onClick}
    >
      {props.texto}
    </button>
  );
}

export default Boton;