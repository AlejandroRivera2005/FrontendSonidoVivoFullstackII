import { Container, Row, Col } from "react-bootstrap";

function MenuPageTemplate(props) {
  const listaItems = Array.isArray(props.items) ? props.items : [];

  return (
    <Container fluid className="py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} lg={props.acciones ? 8 : 12}>
          <h1 className="fw-bold">{props.titulo}</h1>
          {props.descripcion && <p className="text-muted mb-0">{props.descripcion}</p>}
        </Col>
        {props.acciones && (
          <Col xs={12} lg={4} className="text-lg-end mt-3 mt-lg-0">
            {props.acciones}
          </Col>
        )}
      </Row>

      {props.filtros && (
        <Row className="mb-4">
          <Col xs={12}>{props.filtros}</Col>
        </Row>
      )}

      {listaItems.length === 0 ? (
        <p className="text-muted">No hay elementos disponibles en este momento.</p>
      ) : (
        <div className={`content-grid${props.tipo === "blog" ? " content-grid--blog" : ""}`}>
          {listaItems.map((item, index) => (
            <div className="content-grid__item" key={item.id ?? index}>
              {typeof props.renderItem === "function" ? props.renderItem(item) : null}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default MenuPageTemplate;