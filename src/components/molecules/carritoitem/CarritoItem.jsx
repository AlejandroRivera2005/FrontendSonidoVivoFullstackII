import Boton from "../../atoms/boton/Boton";
import { formatoPrecio } from "../../../utils/formatoPrecio";


function CarritoItem(props) {
  if (!props.item || !props.item.producto) return null;

  const { producto, cantidad } = props.item;
  const subtotal = producto.precio * cantidad;
  const llegoAlLimite = typeof producto.stock === "number" && cantidad >= producto.stock;

  return (
    <li className="list-group-item d-flex flex-wrap align-items-center gap-3">
      <div className="flex-grow-1">
        <span className="fw-semibold">{producto.nombre}</span>{" "}
        <span className="text-muted">x{cantidad}</span>
      </div>
      <span className="fw-bold">{formatoPrecio(subtotal)}</span>
      <div className="d-flex gap-2">
        <Boton
          label="+"
          variant="outline-secondary"
          disabled={llegoAlLimite}
          onClick={() => props.onIncrement && props.onIncrement(producto.id)}
        />
        <Boton
          label="Quitar"
          variant="danger"
          onClick={() => props.onRemove && props.onRemove(producto.id)}
        />
      </div>
    </li>
  );
}

export default CarritoItem;