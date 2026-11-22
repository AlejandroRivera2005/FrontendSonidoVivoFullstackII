import { Container, Row, Col } from "react-bootstrap";

function FormPageTemplate(props) {
  return (
    <Container fluid className="form-page py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">{props.titulo}</h1>
          {props.descripcion && <p>{props.descripcion}</p>}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={7} xl={6}>
          <div className="form-page__card p-4 border rounded bg-white shadow-sm">
            {props.children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormPageTemplate;
