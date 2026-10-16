import { useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useProductos } from "../context/ProductosContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { validarFormularioProducto } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";

const FORM_INICIAL = { nombre: "", precio: "" };

function AdminSonidoVivo() {
  useTituloPagina("Administrar productos");
  const productosCtx = useProductos();

  const [form, setForm] = useState(FORM_INICIAL);
  const [errors, setErrors] = useState({});
  const [idEditando, setIdEditando] = useState(null);

  const handleChange = (e) => {
    if (!e || !e.target) return;
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const limpiarFormulario = () => {
    setForm(FORM_INICIAL);
    setErrors({});
    setIdEditando(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresValidacion = validarFormularioProducto(form);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }

    const datos = { nombre: form.nombre.trim(), precio: Number(form.precio) };

    if (idEditando !== null) {
      productosCtx.actualizar(idEditando, datos);
      toast.success(`"${datos.nombre}" actualizado correctamente.`);
    } else {
      productosCtx.crear({ ...datos, categoria: "Accesorios", stock: 10 });
      toast.success(`"${datos.nombre}" agregado correctamente.`);
    }
    limpiarFormulario();
  };

  const editar = (producto) => {
    setIdEditando(producto.id);
    setForm({ nombre: producto.nombre, precio: String(producto.precio) });
    setErrors({});
  };

  const eliminar = (producto) => {
    productosCtx.eliminar(producto.id);
    if (producto.id === idEditando) limpiarFormulario();
    toast.info(`"${producto.nombre}" eliminado.`);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Administrar productos</h1>
          <p className="text-muted mb-0">
            Agrega, edita o elimina los productos del catálogo.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} lg={4}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">
              {idEditando !== null ? "Editar producto" : "Nuevo producto"}
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                error={errors.nombre}
              />

              <FormField
                label="Precio"
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                min="1"
                error={errors.precio}
              />

              <div className="d-flex gap-2 mt-4">
                <Boton
                  label={idEditando !== null ? "Guardar cambios" : "Agregar producto"}
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

        <Col xs={12} lg={8}>
          <div className="p-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Productos ({productosCtx.productos.length})</h3>

            {productosCtx.productos.length === 0 ? (
              <p className="text-muted mb-0">No hay productos registrados.</p>
            ) : (
              <Table striped responsive className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosCtx.productos.map((p) => (
                    <tr key={p.id}>
                      <td>{p.nombre}</td>
                      <td>{formatoPrecio(p.precio)}</td>
                      <td className="text-end">
                        <div className="d-flex gap-2 justify-content-end">
                          <Boton label="Editar" variant="outline-primary" onClick={() => editar(p)} />
                          <Boton label="Eliminar" variant="danger" onClick={() => eliminar(p)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminSonidoVivo;