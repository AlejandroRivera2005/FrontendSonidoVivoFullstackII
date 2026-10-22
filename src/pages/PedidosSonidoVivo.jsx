import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Label from "../components/atoms/Label";
import MensajeError from "../components/atoms/MensajeError";
import Selector from "../components/atoms/Selector";
import Boton from "../components/atoms/boton/Boton";
import { usePedidos } from "../context/PedidoContext";
import { useUsuarios } from "../context/UsuarioContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { validarFormularioPedido } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";

const form_inicial = {
  usuarioId: "",
  nombre: "",
  total: "",
  cantidad: "",
};

function PedidosSonidoVivo() {
  useTituloPagina("Administrar pedidos");
  const pedidosCtx = usePedidos();
  const usuariosCtx = useUsuarios();

  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});
  const [idEditando, setIdEditando] = useState(null);

  const opciones_usuarios = [
    { value: "", label: "Selecciona un usuario" },
    ...usuariosCtx.usuarios.map((u) => ({
      value: String(u.id),
      label: `${u.nombre} (${u.email})`,
    })),
  ];

  const textoUsuario = (pedido) => {
    if (pedido.usuarioId === undefined) return "Sin usuario asignado";
    const usuario = usuariosCtx.usuarios.find((u) => u.id === pedido.usuarioId);
    return usuario ? `${usuario.nombre} (${usuario.email})` : "Usuario eliminado";
  };

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const limpiarFormulario = () => {
    setForm(form_inicial);
    setErrors({});
    setIdEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormularioPedido(form);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }

    const datos = {
      usuarioId: Number(form.usuarioId),
      nombre: form.nombre.trim(),
      total: Number(form.total),
      cantidad: Number(form.cantidad),
    };

    if (idEditando !== null) {
      pedidosCtx.actualizar(idEditando, datos);
      toast.success(`Pedido "${datos.nombre}" actualizado correctamente.`);
    } else {
      pedidosCtx.crear(datos);
      toast.success(`Pedido "${datos.nombre}" agregado correctamente.`);
    }
    limpiarFormulario();
  };

  const editar = (pedido) => {
    setIdEditando(pedido.id);
    setForm({
      usuarioId: String(pedido.usuarioId ?? ""),
      nombre: pedido.nombre ?? "",
      total: String(pedido.total ?? ""),
      cantidad: String(pedido.cantidad ?? ""),
    });
    setErrors({});
  };

  const eliminar = (pedido) => {
    pedidosCtx.eliminar(pedido.id);
    if (pedido.id === idEditando) limpiarFormulario();
    toast.info(`Pedido "${pedido.nombre}" eliminado.`);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Administrar pedidos</h1>
          <p className="text-muted mb-0">
            Agrega, edita o elimina los pedidos.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} md={4}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">
              {idEditando !== null ? "Editar pedido" : "Nuevo pedido"}
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <Label texto="Usuario" htmlFor="usuarioId" />
                <Selector
                  id="usuarioId"
                  name="usuarioId"
                  value={form.usuarioId}
                  onChange={handleChange}
                  options={opciones_usuarios}
                />
                <MensajeError mensaje={errors.usuarioId} />
              </div>

              <FormField
                label="Producto"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                error={errors.nombre}
              />

              <FormField
                label="Total"
                type="number"
                name="total"
                value={form.total}
                onChange={handleChange}
                placeholder="0"
                min="1"
                error={errors.total}
              />

              <FormField
                label="Cantidad"
                type="number"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                placeholder="1"
                min="1"
                step="1"
                error={errors.cantidad}
              />

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Boton
                  label={idEditando !== null ? "Guardar cambios" : "Agregar pedido"}
                  variant="primary"
                  type="submit"
                />
                {idEditando !== null && (
                  <Boton label="Cancelar" variant="secondary" onClick={limpiarFormulario} />
                )}
              </div>
            </form>
          </div>
        </Col>

        <Col xs={12} md={8}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Pedidos ({pedidosCtx.pedidos.length})</h3>

            {pedidosCtx.pedidos.length === 0 ? (
              <p className="text-muted mb-0">No hay pedidos registrados.</p>
            ) : (
              <ul className="list-group">
                {pedidosCtx.pedidos.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex flex-wrap align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-break">{p.nombre}</div>
                      <small className="text-muted text-break d-block">
                        Usuario: {textoUsuario(p)}
                      </small>
                      <small className="text-muted">
                        {typeof p.cantidad === "number" && `Cantidad: ${p.cantidad}`}
                      </small>
                    </div>
                    <span className="fw-bold">
                      {typeof p.total === "number" ? formatoPrecio(p.total) : "—"}
                    </span>
                    <div className="d-flex gap-2">
                      <Boton label="Editar" variant="outline-primary" onClick={() => editar(p)} />
                      <Boton label="Eliminar" variant="danger" onClick={() => eliminar(p)} />
                    </div>
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

export default PedidosSonidoVivo;