import { Card } from "react-bootstrap";
import Boton from "../atoms/boton/Boton";
import { formatoFecha } from "../../utils/formatoFecha";
import imagenRespaldo from "../../assets/hero.png";

function EntradaBlog({ entrada, onVer }) {
  if (!entrada) return null;

  const { titulo, fecha, categoria, resumen, imagen } = entrada;

  return (
    <Card as="article" className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={imagen || imagenRespaldo}
        alt=""
        className="p-3"
        style={{ height: "180px", objectFit: "contain" }}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = imagenRespaldo;
        }}
      />

      <Card.Body className="d-flex flex-column">
        <div className="mb-2 d-flex gap-2 flex-wrap">
          {categoria && <span className="badge text-bg-secondary">{categoria}</span>}
        </div>

        <Card.Title as="h3" className="h6 fw-bold mb-1">
          {titulo || "Sin título"}
        </Card.Title>

        {fecha && <small className="text-muted d-block mb-3">{formatoFecha(fecha)}</small>}

        {resumen && <p className="text-secondary small">{resumen}</p>}

        <div className="mt-auto d-grid">
          <Boton
            label="Saber más"
            variant="primary"
            onClick={() => onVer && onVer(entrada)}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

export default EntradaBlog;