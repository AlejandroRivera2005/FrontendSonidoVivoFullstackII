import { Container, Row, Col } from "react-bootstrap";

function MenuPageTemplate({ titulo, descripcion, acciones, items = [], renderItem }) {
  const listaItems = Array.isArray(items) ? items : [];

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={acciones ? 8 : 12}>
          <h1 className="fw-bold">{titulo}</h1>
          {descripcion && <p className="text-muted mb-0">{descripcion}</p>}
        </Col>
        {acciones && (
          <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
            {acciones}
          </Col>
        )}
      </Row>

      <Row className="g-4">
        {listaItems.length === 0 ? (
          <Col xs={12}>
            <p className="text-muted">No hay elementos disponibles en este momento.</p>
          </Col>
        ) : (
          listaItems.map((item, index) => (
            <Col key={item.id || index} xs={12} sm={6} md={4} lg={3}>
              {typeof renderItem === "function" ? renderItem(item) : null}
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default MenuPageTemplate;