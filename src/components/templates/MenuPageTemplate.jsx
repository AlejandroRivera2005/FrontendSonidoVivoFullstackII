import { Container, Row, Col } from "react-bootstrap";

function MenuPageTemplate(props) {
  const listaItems = Array.isArray(props.items) ? props.items : [];

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={props.acciones ? 8 : 12}>
          <h1 className="fw-bold">{props.titulo}</h1>
          {props.descripcion && <p className="text-muted mb-0">{props.descripcion}</p>}
        </Col>
        {props.acciones && (
          <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
            {props.acciones}
          </Col>
        )}
      </Row>

      {props.filtros && (
        <Row className="mb-4">
          <Col xs={12}>{props.filtros}</Col>
        </Row>
      )}

      <Row className="g-4">
        {listaItems.length === 0 ? (
          <Col xs={12}>
            <p className="text-muted">No hay elementos disponibles en este momento.</p>
          </Col>
        ) : (
          listaItems.map((item, index) => (
            <Col key={item.id || index} xs={12} sm={6} md={4} lg={3}>
              {typeof props.renderItem === "function" ? props.renderItem(item) : null}
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default MenuPageTemplate;