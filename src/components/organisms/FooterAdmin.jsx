import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../atoms/boton/Boton";

function FooterAdmin() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="align-items-center justify-content-between">

          <Col xs={12} md={8} className="text-center text-md-start mb-3 mb-md-0">
            <p className="m-0 text-secondary">
              © 2026 Sonido Vivo. Panel de administración.
            </p>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <Boton
              label="Volver a la tienda"
              variant="primary"
              onClick={() => navigate("/")}
            />
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default FooterAdmin;