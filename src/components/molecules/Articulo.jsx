import { Card } from "react-bootstrap";
import Boton from "../atoms/boton/Boton";
import { Precio } from "../atoms/precio/Precio";
import imagenRespaldo from "../../assets/hero.png";

function Articulo({ producto, onVer }) {
  if (!producto) return null;

  const { precio, precioAnterior, categoria, imagen, stock } = producto;
  const nombre = producto.nombre ?? producto.titulo;
  const sinStock = stock === 0;
  const tieneStock = typeof stock === "number";
  const enOferta = typeof precioAnterior === "number" && precioAnterior > precio;

  return (
    <Card as="article" className="card-producto h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imagen || imagenRespaldo}
        alt=""
        className="card-producto__imagen p-3"
        style={{ height: "180px", objectFit: "contain" }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="mb-2 d-flex gap-2 flex-wrap">
          {categoria && <span className="badge text-bg-secondary">{categoria}</span>}
          {enOferta && <span className="badge text-bg-danger">Oferta</span>}
        </div>

        <Card.Title as="h3" className="h6 fw-bold text-truncate">
          {nombre || "Sin nombre"}
        </Card.Title>

        <Precio
          valor={typeof precio === "number" ? precio : 0}
          anterior={enOferta ? precioAnterior : null}
        />

        {tieneStock && (
          <p className="mb-3">
            {sinStock ? (
              <span className="badge text-bg-warning">Sin stock</span>
            ) : (
              <span className="badge text-bg-success">{stock} disponibles</span>
            )}
          </p>
        )}

        <div className="mt-auto d-grid">
          <Boton
            label="Ver producto"
            variant="primary"
            onClick={() => onVer && onVer(producto)}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default Articulo;
