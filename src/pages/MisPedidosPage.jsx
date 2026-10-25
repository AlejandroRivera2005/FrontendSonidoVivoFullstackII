import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Boton from "../components/atoms/boton/Boton";
import { usePedidos } from "../context/PedidoContext";
import { useSesion } from "../context/SesionContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { useTituloPagina } from "../hooks/useTituloPagina";

function MisPedidosPage() {
  useTituloPagina("Mis pedidos");
  const navigate = useNavigate();
  const pedidosCtx = usePedidos();
  const sesionCtx = useSesion();

  if (!sesionCtx.usuario) {
    return (
      <Container className="py-4">
        <h1 className="fw-bold">Mis pedidos</h1>
        <p className="text-muted">
          Debes iniciar sesión para ver tus pedidos.
        </p>
        <Boton
          label="Iniciar sesión"
          variant="primary"
          onClick={() => navigate("/login", { state: { desde: "/mis-pedidos" } })}
        />
      </Container>
    );
  }

  const misPedidos = pedidosCtx.pedidos
    .filter((p) => p.usuarioId === sesionCtx.usuario.id)
    .sort((a, b) => b.id - a.id);

  const textoEntrega = (pedido) => {
    if (pedido.entrega === "envio") return `Envío a domicilio: ${pedido.direccion}`;
    if (pedido.entrega === "retiro") return "Retiro presencial en tienda";
    return null;
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Mis pedidos</h1>
          <p className="text-muted mb-0">
            Revisa los pedidos realizados con tu cuenta, {sesionCtx.usuario.nombre}.
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Pedidos ({misPedidos.length})</h3>

            {misPedidos.length === 0 ? (
              <div className="d-flex flex-column align-items-start gap-3">
                <p className="text-muted mb-0">Aún no has realizado pedidos.</p>
                <Boton
                  label="Ir al catálogo"
                  variant="primary"
                  onClick={() => navigate("/catalogo")}
                />
              </div>
            ) : (
              <ul className="list-group">
                {misPedidos.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex flex-wrap align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-break">{p.nombre}</div>
                      <small className="text-muted d-block">
                        Pedido #{p.id}
                        {typeof p.cantidad === "number" && ` · Cantidad: ${p.cantidad}`}
                      </small>
                      {textoEntrega(p) && (
                        <small className="text-muted text-break d-block">
                          {textoEntrega(p)}
                        </small>
                      )}
                    </div>
                    <span className="fw-bold">
                      {typeof p.total === "number" ? formatoPrecio(p.total) : "—"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MisPedidosPage;