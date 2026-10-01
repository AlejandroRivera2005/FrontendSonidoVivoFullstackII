import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import NavMenu from '../molecules/NavMenu';

function Navbar({ brandName, menuItems }) {
  const navigate = useNavigate();

  return (
    <header className="navbar-banner sticky-top">
      <Container>
        <Row className="align-items-center justify-content-between py-3">        
          <Col xs={12} md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h2 
              className="m-0 text-white" 
              style={{ cursor: 'pointer', fontSize: '1.4rem', fontWeight: '700' }} 
              onClick={() => navigate('/')}
            >
              {brandName || "Sonido Vivo"}
            </h2>
          </Col>
          <Col xs={12} md={8}>
            <NavMenu menuItems={menuItems} />
          </Col>

        </Row>
      </Container>
    </header>
  );
}

export default Navbar;