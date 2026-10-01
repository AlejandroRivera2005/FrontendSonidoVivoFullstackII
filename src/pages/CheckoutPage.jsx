import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Boton from "../components/atoms/Boton";
import Selector from "../components/atoms/Selector";

function CheckoutPage() {
  const navigate = useNavigate();
  const [carrito, setCarrito] = useState([]);
  const [tipoEntrega, setTipoEntrega] = useState("retiro");

  const opcionesEntrega = [
    { value: "retiro", label: "Retiro presencial en tienda" },
    { value: "envio", label: "Envío a domicilio" }
  ];

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoGuardado);
  }, []);

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    toast.info("El carrito ha sido vaciado.");
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    if (carrito.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }

    const mensajeEntrega = tipoEntrega === "retiro" ? "Retiro presencial en tienda seleccionado." : "Envío a acordar seleccionado.";
    toast.success(`¡Pedido confirmado con éxito! ${mensajeEntrega}`, {
      autoClose: 3500,
    });

    localStorage.removeItem("carrito");
    setCarrito([]);

    setTimeout(() => {
      navigate("/catalogo");
    }, 3000);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Finalizar Compra</h1>
          <p>Selecciona tu método de entrega y revisa los artículos de tu pedido.</p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6} className="mb-4">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="mb-3">Método de Entrega</h3>
            
            <form onSubmit={handleFinalizarCompra}>
              <div className="mb-3">
                <label htmlFor="tipoEntrega" className="form-label fw-bold">
                  Selecciona una opción
                </label>
                
                <Selector
                  id="tipoEntrega"
                  value={tipoEntrega}
                  onChange={(e) => setTipoEntrega(e.target.value)}
                  options={opcionesEntrega}
                />
              </div>

              <div className="d-flex flex-column gap-2 mt-4">
                <Boton
                  label="Confirmar Pedido"
                  variant="primary"
                  type="submit"
                />

                {carrito.length > 0 && (
                  <Boton
                    label="Vaciar Carrito"
                    variant="text"
                    onClick={vaciarCarrito}
                  />
                )}
              </div>
            </form>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="mb-3">Resumen del Carrito</h3>
            {carrito.length === 0 ? (
              <p className="text-muted">No hay productos en el carrito actualmente.</p>
            ) : (
              <div>
                <ul className="list-group mb-3">
                  {carrito.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{item.nombre}</span>
                      <span className="fw-bold">{item.precio}</span>
                    </li>
                  ))}
                </ul>
                <div className="d-flex justify-content-between fw-bold fs-5 mt-3">
                  <span>Total de artículos:</span>
                  <span>{carrito.length}</span>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;