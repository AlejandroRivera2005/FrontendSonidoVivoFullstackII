import { useRef, useState } from "react";
import imagenRespaldo from "../assets/hero.png";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useProductos } from "../context/ProductosContext";
import { formatoPrecio } from "../utils/formatoPrecio";
import { esVacio, validarFormularioProducto } from "../utils/validaciones";
import { obtenerMensajeError } from "../service/api";
import { useTituloPagina } from "../hooks/useTituloPagina";

const galeria = [
  { nombre: "Guitarra", ruta: "/img/guitarra.jpg" },
  { nombre: "Bajo", ruta: "/img/bajo.jpg" },
  { nombre: "Batería", ruta: "/img/bateria.jpg" },
  { nombre: "Teclado", ruta: "/img/teclado.jpg" },
  { nombre: "Parlante", ruta: "/img/parlante.jpg" },
];

const tiposImagen = ["image/jpeg", "image/png", "image/webp"];
const maximoBytes = 2 * 1024 * 1024;

function leerArchivo(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(new Error("No se pudo leer la imagen."));
    lector.onabort = () => reject(new Error("Lectura cancelada."));
    lector.readAsDataURL(archivo);
  });
}

function usarRespaldo(evento) {
  if (evento.currentTarget.src !== new URL(imagenRespaldo, window.location.href).href) {
    evento.currentTarget.src = imagenRespaldo;
  }
}

const form_inicial = {
  nombre: "",
  precio: "",
  precioAnterior: "",
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
  const [imagenActual, setImagenActual] = useState("");
  const [imagenGaleria, setImagenGaleria] = useState("");
  const [imagenArchivo, setImagenArchivo] = useState("");
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [leyendo, setLeyendo] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const inputArchivo = useRef(null);
  const vistaPrevia = imagenArchivo || imagenGaleria || imagenActual;
  const bloqueado = leyendo || ocupado;

  function limpiarImagenNueva() {
    setImagenGaleria("");
    setImagenArchivo("");
    setNombreArchivo("");
    if (inputArchivo.current) inputArchivo.current.value = "";
  }

  function seleccionarGaleria(ruta) {
    limpiarImagenNueva();
    setImagenGaleria(ruta);
    setErrors((prev) => ({ ...prev, imagen: "" }));
  }

  async function seleccionarArchivo(evento) {
    const archivo = evento.target.files?.[0];
    if (!archivo) return;
    limpiarImagenNueva();
    setErrors((prev) => ({ ...prev, imagen: "" }));
    if (!tiposImagen.includes(archivo.type) || archivo.size === 0 || archivo.size > maximoBytes) {
      setErrors((prev) => ({ ...prev, imagen: "Selecciona un JPG, PNG o WebP de hasta 2 MiB." }));
      return;
    }
    setLeyendo(true);
    try {
      const datos = await leerArchivo(archivo);
      const imagen = new Image();
      imagen.src = datos;
      await imagen.decode();
      setImagenArchivo(datos);
      setNombreArchivo(archivo.name);
    } catch {
      setErrors((prev) => ({ ...prev, imagen: "El archivo no contiene una imagen que pueda visualizarse." }));
    } finally {
      setLeyendo(false);
    }
  }

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
    setForm(form_inicial);
    setErrors({});
    setIdEditando(null);
    setImagenActual("");
    limpiarImagenNueva();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bloqueado) return;
    const erroresValidacion = validarFormularioProducto(form);
    if (!vistaPrevia) erroresValidacion.imagen = "Selecciona una imagen para el producto.";
    if (errors.imagen) erroresValidacion.imagen = errors.imagen;
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }

    const datos = {
      nombre: form.nombre.trim(),
      precio: Number(form.precio),
      precioAnterior: esVacio(form.precioAnterior) ? null : Number(form.precioAnterior),
      categoria: form.categoria.trim(),
      stock: Number(form.stock),
      descripcion: form.descripcion.trim(),
      ...(imagenArchivo ? { imagenArchivo } : imagenGaleria ? { imagen: imagenGaleria } : {}),
    };

    setOcupado(true);
    try {
      if (idEditando !== null) {
        await productosCtx.actualizar(idEditando, datos);
        toast.success(`"${datos.nombre}" actualizado correctamente.`);
      } else {
        await productosCtx.crear(datos);
        toast.success(`"${datos.nombre}" agregado correctamente.`);
      }
      limpiarFormulario();
    } catch (error) {
      toast.error(obtenerMensajeError(error));
    } finally {
      setOcupado(false);
    }
  };

  const editar = (producto) => {
    if (bloqueado) return;
    setIdEditando(producto.id);
    setImagenActual(producto.imagen ?? "");
    limpiarImagenNueva();
    setForm({
      nombre: producto.nombre ?? "",
      precio: String(producto.precio ?? ""),
      precioAnterior: String(producto.precioAnterior ?? ""),
      categoria: producto.categoria ?? "",
      stock: String(producto.stock ?? ""),
      descripcion: producto.descripcion ?? "",
    });
    setErrors({});
  };

  const eliminar = async (producto) => {
    if (bloqueado) return;
    if (!window.confirm(`¿Eliminar "${producto.nombre}"?`)) return;
    setOcupado(true);
    try {
      await productosCtx.eliminar(producto.id);
      if (producto.id === idEditando) limpiarFormulario();
      toast.info(`"${producto.nombre}" eliminado.`);
    } catch (error) {
      toast.error(obtenerMensajeError(error));
    } finally {
      setOcupado(false);
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Administrar productos</h1>
          <p className="text-muted mb-0">
            Agrega, edita o elimina los productos del catálogo.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} lg={4} xxl={3}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">
              {idEditando !== null ? "Editar producto" : "Nuevo producto"}
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <fieldset disabled={bloqueado} className="producto-form-fieldset">
              <FormField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                error={errors.nombre}
              />

              <FormField
                label="Precio (de oferta si corresponde)"
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                placeholder="0"
                min="0"
                error={errors.precio}
              />

              <FormField
                label="Precio anterior (opcional)"
                type="number"
                name="precioAnterior"
                value={form.precioAnterior}
                onChange={handleChange}
                placeholder="Déjalo vacío si no hay oferta"
                min="0"
                error={errors.precioAnterior}
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

              <div className="producto-selector-imagen mb-3">
                <p className="form-label fw-semibold mb-2">Imagen del producto</p>
                {vistaPrevia && (
                  <img
                    key={vistaPrevia}
                    src={vistaPrevia}
                    alt="Vista previa del producto"
                    className="producto-imagen-preview"
                    onError={usarRespaldo}
                  />
                )}
                <div className="producto-galeria" role="group" aria-label="Imágenes disponibles">
                  {galeria.map((imagen) => (
                    <button
                      key={imagen.ruta}
                      type="button"
                      className="producto-galeria-opcion"
                      aria-pressed={!imagenArchivo && vistaPrevia === imagen.ruta}
                      onClick={() => seleccionarGaleria(imagen.ruta)}
                    >
                      <img src={imagen.ruta} alt="" />
                      <span>{imagen.nombre}</span>
                    </button>
                  ))}
                </div>
                <label htmlFor="producto-imagen-archivo" className="form-label mt-3">
                  O cargar una imagen desde el equipo
                </label>
                <input
                  ref={inputArchivo}
                  id="producto-imagen-archivo"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className={`form-control${errors.imagen ? " is-invalid" : ""}`}
                  onChange={seleccionarArchivo}
                  aria-describedby="producto-imagen-ayuda"
                />
                <div id="producto-imagen-ayuda" className="form-text">
                  JPG, PNG o WebP. Máximo 2 MiB. {nombreArchivo && `Seleccionado: ${nombreArchivo}`}
                </div>
                {errors.imagen && <div className="text-danger small" role="alert">{errors.imagen}</div>}
                {idEditando !== null && (imagenGaleria || imagenArchivo || errors.imagen) && (
                  <button type="button" className="btn btn-outline-secondary btn-sm mt-2" onClick={() => seleccionarGaleria("")}>
                    Conservar imagen actual
                  </button>
                )}
              </div>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Boton
                  label={leyendo ? "Leyendo imagen..." : ocupado ? "Procesando..." : idEditando !== null ? "Guardar cambios" : "Agregar producto"}
                  variant="primary"
                  type="submit"
                  disabled={bloqueado}
                />
                {idEditando !== null && (
                  <Boton label="Cancelar" variant="secondary" onClick={limpiarFormulario} />
                )}
              </div>
              </fieldset>
            </form>
          </div>
        </Col>

        <Col xs={12} lg={8} xxl={9}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Productos ({productosCtx.productos.length})</h3>

            {productosCtx.cargando ? (
              <p role="status">Cargando productos...</p>
            ) : productosCtx.error ? (
              <div className="alert alert-danger" role="alert">{obtenerMensajeError(productosCtx.error)}</div>
            ) : productosCtx.productos.length === 0 ? (
              <p className="text-muted mb-0">No hay productos registrados.</p>
            ) : (
              <ul className="record-grid">
                {productosCtx.productos.map((p) => {
                  const sinStock = p.stock === 0;
                  const enOferta =
                    typeof p.precioAnterior === "number" && p.precioAnterior > p.precio;

                  return (
                  <li
                    key={p.id}
                    className={`list-group-item record-grid__item d-flex flex-wrap align-items-center gap-3${
                      sinStock ? " list-group-item-danger" : ""
                    }`}
                  >
                    <img key={p.imagen} src={p.imagen || imagenRespaldo} alt={p.nombre} className="producto-admin-miniatura" loading="lazy" onError={usarRespaldo} />
                    <div className="flex-grow-1">
                      <div className={`fw-semibold text-break${sinStock ? " text-danger" : ""}`}>
                        {p.nombre}
                      </div>
                      <small className={sinStock ? "text-danger fw-bold" : "text-muted"}>
                        {p.categoria}
                        {sinStock
                          ? " · Sin stock (0 unidades)"
                          : typeof p.stock === "number" && ` · ${p.stock} en stock`}
                      </small>
                    </div>
                    <span className="fw-bold">
                      {formatoPrecio(p.precio)}
                      {enOferta && (
                        <small className="text-muted fw-normal ms-2">
                          <s>{formatoPrecio(p.precioAnterior)}</s>
                        </small>
                      )}
                    </span>
                    <div className="d-flex flex-wrap gap-2">
                      <Boton label="Editar" variant="outline-primary" onClick={() => editar(p)} disabled={bloqueado} />
                      <Boton label="Eliminar" variant="danger" onClick={() => eliminar(p)} disabled={bloqueado} />
                    </div>
                  </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminSonidoVivo;