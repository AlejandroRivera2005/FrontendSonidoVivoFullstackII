import { Container, Row, Col } from "react-bootstrap";
import Articulo from "../components/molecules/Articulo";

function Catalogo(props) {
  function alAnadir(nombre) {
    alert('este alert es un test - será reemplazado en el futuro');
  }
  const listaArticulos = props.articulos || [];

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12} className="mb-3">
          <h1>Catálogo de productos</h1>
          <p>En esta sección podrás ver nuestros productos a la venta.</p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-3">
          <h2>Guitarras</h2>
        </Col>        
        {listaArticulos.map((m) => (
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