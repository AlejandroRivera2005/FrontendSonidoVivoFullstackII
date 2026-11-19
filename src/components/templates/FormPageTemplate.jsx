import { Container, Row, Col } from "react-bootstrap";

function FormPageTemplate(props) {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">{props.titulo}</h1>
          {props.descripcion && <p>{props.descripcion}</p>}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="p-4 border rounded bg-white shadow-sm">
            {props.children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormPageTemplate;