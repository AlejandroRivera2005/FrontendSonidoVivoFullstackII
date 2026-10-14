import Boton from "../../atoms/boton/Boton";
import { formatoPrecio } from "../../../utils/formatoPrecio";


function CarritoItem({ item, onIncrement, onRemove }) {
  if (!item || !item.producto) return null;

  const { producto, cantidad } = item;
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
          onClick={() => onIncrement && onIncrement(producto.id)}
        />
        <Boton
          label="Quitar"
          variant="danger"
          onClick={() => onRemove && onRemove(producto.id)}
        />
      </div>
    </li>
  );
}

export default CarritoItem;