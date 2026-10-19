import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/atoms/boton/Boton";
import blogs from "../data/blogs.json";
import { formatoFecha } from "../utils/formatoFecha";
import { useTituloPagina } from "../hooks/useTituloPagina";
import imagenRespaldo from "../assets/hero.png";

function DetalleBlog() {
  const navigate = useNavigate();
  const { id } = useParams();

  const entrada = blogs.find((b) => String(b.id) === String(id)) ?? null;
  useTituloPagina(entrada ? entrada.titulo : "Publicación no encontrada");

  if (!entrada) {
    return (
      <Container className="py-4">
        <h1 className="fw-bold">Publicación no encontrada</h1>
        <p className="text-muted">
          La publicación que buscas no existe o ya no está disponible.
        </p>
        <Boton
          label="Volver al blog"
          variant="primary"
          onClick={() => navigate("/blogs")}
        />
      </Container>
    );
  }

  const { titulo, fecha, categoria, autor, resumen, contenido, imagen } = entrada;
  const parrafos = Array.isArray(contenido) && contenido.length > 0 ? contenido : [resumen];

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col xs={12}>
          <Boton className="volver-catalogo-btn"
            label="← Volver al blog"
            variant="text"
            onClick={() => navigate(-1)}
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <div className="mb-2 d-flex gap-2 flex-wrap">
              {categoria && <span className="badge text-bg-secondary">{categoria}</span>}
            </div>

            <h1 className="fw-bold h2">{titulo}</h1>

            <small className="text-muted d-block mb-4">
              {fecha && formatoFecha(fecha)}
              {fecha && autor && " · "}
              {autor && `Por ${autor}`}
            </small>

            <div className="text-center mb-4">
              <img
                src={imagen || imagenRespaldo}
                alt={titulo}
                className="img-fluid"
                style={{ maxHeight: "400px", objectFit: "contain" }}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = imagenRespaldo;
                }}
              />
            </div>

            {parrafos.map((parrafo, indice) => (
              <p key={indice}>{parrafo}</p>
            ))}

            <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
              <Boton
                label="Ver todas las publicaciones"
                variant="outline-primary"
                onClick={() => navigate("/blogs")}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleBlog;