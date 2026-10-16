import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Boton from "../components/atoms/boton/Boton";
import Selector from "../components/atoms/Selector";
import CarritoItem from "../components/molecules/carritoitem/CarritoItem";
import { useCart } from "../context/CarritoContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { validarCheckout } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";

const OPCIONES_ENTREGA = [
  { value: "retiro", label: "Retiro presencial en tienda" },
  { value: "envio", label: "Envío a domicilio" },
];

function CheckoutPage() {
  useTituloPagina("Checkout");
  const navigate = useNavigate();
  const carrito = useCart();
  const [tipoEntrega, setTipoEntrega] = useState("retiro");
  const [confirmado, setConfirmado] = useState(false);

  const temporizador = useRef(null);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const vaciarCarrito = () => {
    carrito.vaciar();
    toast.info("El carrito ha sido vaciado.");
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    if (confirmado) return;

    const errorCarrito = validarCheckout(carrito.items);
    if (errorCarrito) {
      toast.error(errorCarrito);
      return;
    }

    const mensajeEntrega =
      tipoEntrega === "retiro"
        ? "Retiro presencial en tienda seleccionado."
        : "Envío a acordar seleccionado.";
    toast.success(`¡Pedido confirmado con éxito! ${mensajeEntrega}`, {
      autoClose: 3500,
    });

    setConfirmado(true);
    carrito.vaciar();
    temporizador.current = setTimeout(() => navigate("/catalogo"), 3000);
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
                  options={OPCIONES_ENTREGA}
                />
              </div>

              <div className="d-flex flex-column gap-2 mt-4">
                <Boton
                  label="Confirmar Pedido"
                  variant="primary"
                  type="submit"
                  disabled={confirmado}
                />

                {carrito.items.length > 0 && (
                  <Boton label="Vaciar Carrito" variant="text" onClick={vaciarCarrito} />
                )}
              </div>
            </form>
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="mb-3">Resumen del Carrito</h3>
            {carrito.items.length === 0 ? (
              <p className="text-muted">No hay productos en el carrito actualmente.</p>
            ) : (
              <div>
                <ul className="list-group mb-3">
                  {carrito.items.map((item) => (
                    <CarritoItem
                      key={item.producto.id}
                      item={item}
                      onIncrement={carrito.increment}
                      onRemove={carrito.remove}
                    />
                  ))}
                </ul>
                <div className="d-flex justify-content-between fw-bold mt-3">
                  <span>Total de artículos:</span>
                  <span>{carrito.totalItems}</span>
                </div>
                <div className="d-flex justify-content-between fw-bold fs-5 mt-2">
                  <span>Total a pagar:</span>
                  <span>{formatoPrecio(carrito.totalPrecio)}</span>
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