import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Articulo from "../components/molecules/Articulo";
import Boton from "../components/atoms/Boton";

function CatalogoPage(props) {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  function alAnadir(articulo) {
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevoCarrito = [...carritoActual, articulo];
    
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    
    toast.success(`¡"${articulo.nombre}" añadido al carrito!`);
  }

  function irAlCheckout() {
    navigate("/checkout");
  }

  const listaArticulos = props.articulos || [];

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col xs={12} md={8}>
          <h1 className="fw-bold">Catálogo de productos</h1>
          <p>En esta sección podrás ver nuestros productos a la venta y gestionar tu compra.</p>
        </Col>
        
        <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
          {carrito.length > 0 && (
            <Boton 
              label={`Proceder al Checkout (${carrito.length})`} 
              variant="primary" 
              onClick={irAlCheckout} 
            />
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mb-3">
          <h2>Guitarras e Instrumentos</h2>
        </Col>     
        {listaArticulos.map((m) => (
          <Col key={m.id} xs={12} md={6} lg={4} className="mb-3">
            <Articulo
              nombre={m.nombre}
              precio={m.precio}
              onAnadir={() => alAnadir(m)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CatalogoPage;