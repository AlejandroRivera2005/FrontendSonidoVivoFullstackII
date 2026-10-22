import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import Boton from "../components/atoms/boton/Boton";
import Selector from "../components/atoms/Selector";
import FormField from "../components/molecules/FormField";
import CarritoItem from "../components/molecules/carritoitem/CarritoItem";
import { useCart } from "../context/CarritoContext";
import { useProductos } from "../context/ProductosContext";
import { usePedidos } from "../context/PedidoContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { formatoNumeroTarjeta, formatoVencimiento, formatoCvc } from "../utils/formatoPago";
import { mensajes, validarCheckout, validarFormularioEnvio, validarFormularioPago } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { useSesion } from "../context/SesionContext";

const opciones_entrega = [
  { value: "retiro", label: "Retiro presencial en tienda" },
  { value: "envio", label: "Envío a domicilio" },
];

const form_inicial = {
  direccion: "",
  comuna: "",
  numeroTarjeta: "",
  vencimiento: "",
  cvc: "",
};

const formateadores = {
  numeroTarjeta: formatoNumeroTarjeta,
  vencimiento: formatoVencimiento,
  cvc: formatoCvc,
};

function CheckoutPage() {
  useTituloPagina("Checkout");
  const navigate = useNavigate();
  const carrito = useCart();
  const { productos, actualizar: actualizarProducto } = useProductos();
  const pedidosCtx = usePedidos();
  const sesionCtx = useSesion();
  const [tipoEntrega, setTipoEntrega] = useState("retiro");
  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});
  const [confirmado, setConfirmado] = useState(false);

  const temporizador = useRef(null);
  useEffect(() => () => clearTimeout(temporizador.current), []);

  const esEnvio = tipoEntrega === "envio";

  const itemsActuales = carrito.items.map((item) => ({
    ...item,
    producto: productos.find((p) => p.id === item.producto.id) ?? item.producto,
  }));
  const totalActual = itemsActuales.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );

  const irALogin = () => navigate("/login", { state: { desde: "/checkout" } });

  const vaciarCarrito = () => {
    carrito.vaciar();
    toast.info("El carrito ha sido vaciado.");
  };

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    const formatear = formateadores[name] ?? ((v) => v);
    setForm((prev) => ({ ...prev, [name]: formatear(value) }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleEntregaChange = (e) => {
    const nuevoTipo = e.target.value;
    setTipoEntrega(nuevoTipo);
    if (nuevoTipo !== "envio") {
      setErrors((prev) => ({ ...prev, direccion: "", comuna: "" }));
    }
  };

  const handleFinalizarCompra = (e) => {
    e.preventDefault();
    if (confirmado) return;

    if (!sesionCtx.usuario) {
      toast.error(mensajes.sesionRequerida);
      return;
    }

    const errorCarrito = validarCheckout(carrito.items);
    if (errorCarrito) {
      toast.error(errorCarrito);
      return;
    }

    const itemConProblema = carrito.items.find((item) => {
      const actual = productos.find((p) => p.id === item.producto.id);
      return (
        !actual ||
        (typeof actual.stock === "number" && item.cantidad > actual.stock)
      );
    });
    if (itemConProblema) {
      toast.error(
        `"${itemConProblema.producto.nombre}" ya no está disponible en la cantidad solicitada.`
      );
      return;
    }

    const erroresFormulario = {
      ...(esEnvio ? validarFormularioEnvio(form) : {}),
      ...validarFormularioPago(form),
    };
    if (Object.keys(erroresFormulario).length > 0) {
      setErrors(erroresFormulario);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }

    pedidosCtx.crear({
      nombre: itemsActuales
        .map((item) => `${item.producto.nombre} x${item.cantidad}`)
        .join(", "),
      total: totalActual,
      cantidad: carrito.totalItems,
      usuarioId: sesionCtx.usuario.id,
      entrega: tipoEntrega,
      ...(esEnvio && {
        direccion: `${form.direccion.trim()}, ${form.comuna.trim()}`,
      }),
    });

    itemsActuales.forEach((item) => {
      if (typeof item.producto.stock === "number") {
        actualizarProducto(item.producto.id, {
          stock: item.producto.stock - item.cantidad,
        });
      }
    });

    const mensajeEntrega = esEnvio
      ? "Envío a domicilio seleccionado."
      : "Retiro presencial en tienda seleccionado.";
    toast.success(`¡Pago realizado y pedido confirmado! ${mensajeEntrega}`, {
      autoClose: 3500,
    });

    setConfirmado(true);
    setForm(form_inicial);
    setErrors({});
    carrito.vaciar();
    temporizador.current = setTimeout(() => navigate("/catalogo"), 3000);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Finalizar Compra</h1>
          <p>
            Selecciona tu método de entrega, ingresa tus datos de pago y revisa los
            artículos de tu pedido.
          </p>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={6} className="mb-4">
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="mb-3">Método de Entrega</h3>
            {sesionCtx.usuario ? (
              <p className="text-muted mb-3">
                Comprando como <strong>{sesionCtx.usuario.nombre}</strong> ({sesionCtx.usuario.email}).
              </p>
            ) : (
              <div className="alert alert-warning d-flex flex-column gap-2">
                <span>{mensajes.sesionRequerida}</span>
                <Boton label="Iniciar sesión" variant="primary" onClick={irALogin} />
              </div>
            )}
            <form onSubmit={handleFinalizarCompra} noValidate>
              <div className="mb-3">
                <label htmlFor="tipoEntrega" className="form-label fw-bold">
                  Selecciona una opción
                </label>

                <Selector
                  id="tipoEntrega"
                  value={tipoEntrega}
                  onChange={handleEntregaChange}
                  options={opciones_entrega}
                />
              </div>

              {esEnvio && (
                <>
                  <FormField
                    label="Dirección (calle y número)"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Av. Libertad 1234, depto 56"
                    autoComplete="address-line1"
                    error={errors.direccion}
                  />

                  <FormField
                    label="Comuna"
                    name="comuna"
                    value={form.comuna}
                    onChange={handleChange}
                    placeholder="Viña del Mar"
                    autoComplete="address-level2"
                    error={errors.comuna}
                  />
                </>
              )}

              <h3 className="h5 mt-4 mb-3">Método de Pago</h3>

              <FormField
                label="Número de tarjeta (crédito o débito)"
                name="numeroTarjeta"
                value={form.numeroTarjeta}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={23}
                error={errors.numeroTarjeta}
              />

              <Row>
                <Col xs={12} sm={6}>
                  <FormField
                    label="Fecha de caducidad"
                    name="vencimiento"
                    value={form.vencimiento}
                    onChange={handleChange}
                    placeholder="MM/AA"
                    inputMode="numeric"
                    autoComplete="cc-exp"
                    maxLength={5}
                    error={errors.vencimiento}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <FormField
                    label="CVC"
                    type="password"
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    placeholder="•••"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    error={errors.cvc}
                  />
                </Col>
              </Row>
              <div className="d-flex flex-column gap-2 mt-4">
                <Boton
                  label="Pagar"
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
                  {itemsActuales.map((item) => (
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
                  <span>{formatoPrecio(totalActual)}</span>
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