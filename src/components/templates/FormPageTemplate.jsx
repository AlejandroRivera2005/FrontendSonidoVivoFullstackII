import { Container, Row, Col } from "react-bootstrap";

function FormPageTemplate({ titulo, descripcion, children }) {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">{titulo}</h1>
          {descripcion && <p>{descripcion}</p>}
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="p-4 border rounded bg-white shadow-sm">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default FormPageTemplate;