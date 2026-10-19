import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useProductos } from "../context/ProductosContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { validarFormularioProducto } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";

const form_inicial = {
  nombre: "",
  precio: "",
  categoria: "",
  stock: "",
  descripcion: "",
};

function AdminSonidoVivo() {
  useTituloPagina("Administrar productos");
  const productosCtx = useProductos();

  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});
  const [idEditando, setIdEditando] = useState(null);

  const categoriasExistentes = [
    ...new Set(productosCtx.productos.map((p) => p.categoria).filter(Boolean)),
  ];

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

    const datos = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      categoria: form.categoria.trim(),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
    };

    if (idEditando !== null) {
      productosCtx.actualizar(idEditando, datos);
      toast.success(`"${datos.nombre}" actualizado correctamente.`);
    } else {
      productosCtx.crear(datos);
      toast.success(`"${datos.nombre}" agregado correctamente.`);
    }
    limpiarFormulario();
  };

  const editar = (producto) => {
    setIdEditando(producto.id);
    setForm({
      nombre: producto.nombre ?? "",
      precio: String(producto.precio ?? ""),
      categoria: producto.categoria ?? "",
      stock: String(producto.stock ?? ""),
      descripcion: producto.descripcion ?? "",
    });
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
        <Col xs={12} md={4}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
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

              <FormField
                label="Categoría"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                placeholder="Categoría del producto"
                list="categorias-existentes"
                autoComplete="off"
                error={errors.categoria}
              />
              <datalist id="categorias-existentes">
                {categoriasExistentes.map((cat) => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>

              <FormField
                label="Stock"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="1"
                error={errors.stock}
              />

              <FormField
                label="Descripción"
                type="textarea"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción del producto"
                error={errors.descripcion}
              />

              <div className="d-flex flex-wrap gap-2 mt-4">
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

        <Col xs={12} md={8}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Productos ({productosCtx.productos.length})</h3>

            {productosCtx.productos.length === 0 ? (
              <p className="text-muted mb-0">No hay productos registrados.</p>
            ) : (
              <ul className="list-group">
                {productosCtx.productos.map((p) => (
                  <li
                    key={p.id}
                    className="list-group-item d-flex flex-wrap align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-break">{p.nombre}</div>
                      <small className="text-muted">
                        {p.categoria}
                        {typeof p.stock === "number" && ` · ${p.stock} en stock`}
                      </small>
                    </div>
                    <span className="fw-bold">{formatoPrecio(p.precio)}</span>
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

export default AdminSonidoVivo;