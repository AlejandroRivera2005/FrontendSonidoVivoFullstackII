import { Container, Row, Col } from "react-bootstrap";
import Articulo from "../components/molecules/Articulo";

function Catalogo(props) {
  function alAnadir(nombre) {
    alert('este alert es un test - será reemplazado en el futuro');
  }

  return (
    <Container>
      <Row>
        {props.articulos.map((m) => (
          <Col key={m.id} xs={12} md={6} lg={4} className="mb-3">
            <Articulo
              nombre={m.nombre}
              precio={m.precio}
              onAnadir={() => alAnadir(m.nombre)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;