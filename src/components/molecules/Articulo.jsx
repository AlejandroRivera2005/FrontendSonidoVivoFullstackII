import Boton from "../atoms/Boton";

function Articulo(props) {
  const { titulo, precio, imagen, onAgregar } = props;

  const precioFormateado = typeof precio === "number" 
    ? precio.toLocaleString("es-CL") 
    : "0";

  return (
    <div className="card h-100 shadow-sm border-0">
      <img
        src={imagen || "/assets/hero.png"}
        className="card-img-top p-3"
        alt={titulo || "Producto"}
        style={{ height: "180px", objectFit: "contain" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title fw-bold text-truncate">
            {titulo || "Sin título"}
          </h5>
          <p className="card-text text-primary fw-semibold">
            ${precioFormateado}
          </p>
        </div>
        <Boton
          label="Agregar al Carrito"
          variant="primary"
          onClick={onAgregar}
        />
      </div>
    </div>
  );
}

export default Articulo;