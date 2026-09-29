import Boton from "../atoms/Boton";

function Articulo(props) {
  return (
    <div className="card p-3">
      <h5>{props.nombre}</h5>
      <p>{props.precio}</p>
      <Boton texto="Añadir al Carrito" onClick={props.onAnadir} />
    </div>
  );
}

export default Articulo;