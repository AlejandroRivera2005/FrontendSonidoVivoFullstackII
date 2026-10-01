import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../atoms/Boton";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="align-items-center justify-content-between">
          
          <Col xs={12} md={8} className="text-center text-md-start mb-3 mb-md-0">
            <p className="m-0 text-secondary">
              © 2026 Sonido Vivo. Todos los derechos reservados.
            </p>
          </Col>

          <Col xs={12} md={4} className="text-center text-md-end">
            <Boton
              label="Contacto"
              variant="primary"
              onClick={() => navigate("/contacto")}
            />
          </Col>

        </Row>
      </Container>
    </footer>
  );
}

export default Footer;