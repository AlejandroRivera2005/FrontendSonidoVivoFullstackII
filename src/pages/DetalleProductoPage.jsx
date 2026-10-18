import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Boton from "../components/atoms/boton/Boton";
import { Precio } from "../components/atoms/precio/Precio";
import { useProductos } from "../context/ProductosContext";
import { useCart } from "../context/CarritoContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import imagenRespaldo from "../assets/hero.png";

function DetalleProductoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { productos } = useProductos();
  const carrito = useCart();

  const producto = productos.find((p) => String(p.id) === String(id)) ?? null;
  useTituloPagina(producto ? producto.nombre : "Producto no encontrado");

  if (!producto) {
    return (
      <Container className="py-4">
        <h1 className="fw-bold">Producto no encontrado</h1>
        <p className="text-muted">
          El producto que buscas no existe o ya no está disponible.
        </p>
        <Boton
          label="Volver al catálogo"
          variant="primary"
          onClick={() => navigate("/catalogo")}
        />
      </Container>
    );
  }

  const { nombre, descripcion, categoria, imagen, precio, precioAnterior, stock } =
    producto;
  const tieneStock = typeof stock === "number";
  const sinStock = stock === 0;
  const enOferta = typeof precioAnterior === "number" && precioAnterior > precio;

  const agregarAlCarrito = () => {
    const agregado = carrito.add(producto);
    if (agregado) {
      toast.success(`"${nombre}" agregado al carrito`);
    } else {
      toast.warn(`No hay más stock disponible de "${nombre}"`);
    }
  };

  const volver = () => {
  if (location.key !== "default") navigate(-1); 
  else navigate("/catalogo");                 
};

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col xs={12}>
          <Boton
            className="volver-catalogo-btn"
            label="← Volver al catálogo"
            variant="text"
            onClick={volver}
          />
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <div className="p-4 border rounded bg-white shadow-sm text-center">
            <img
              src={imagen || imagenRespaldo}
              alt={nombre}
              className="img-fluid"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </div>
        </Col>

        <Col xs={12} md={6}>
          <div className="mb-2 d-flex gap-2 flex-wrap">
            {categoria && <span className="badge text-bg-secondary">{categoria}</span>}
            {enOferta && <span className="badge text-bg-danger">Oferta</span>}
          </div>

          <h1 className="fw-bold h2">{nombre}</h1>

          <div className="fs-4">
            <Precio
              valor={typeof precio === "number" ? precio : 0}
              anterior={enOferta ? precioAnterior : null}
            />
          </div>

          {tieneStock && (
            <p className="mb-3">
              {sinStock ? (
                <span className="badge text-bg-warning">Sin stock</span>
              ) : (
                <span className="badge text-bg-success">{stock} disponibles</span>
              )}
            </p>
          )}

          {descripcion && <p>{descripcion}</p>}

          <div className="d-flex flex-column flex-sm-row gap-2 mt-4">
            <Boton
              label="Agregar al Carrito"
              variant="primary"
              disabled={sinStock}
              onClick={agregarAlCarrito}
            />
            <Boton
              label={`Ir al Checkout (${carrito.totalItems})`}
              variant="success"
              onClick={() => navigate("/checkout")}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProductoPage;