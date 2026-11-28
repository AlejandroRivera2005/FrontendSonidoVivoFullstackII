import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { useSesion } from "../context/SesionContext";
import { validarFormularioUsuario } from "../utils/validaciones";
import { obtenerMensajeError } from "../service/api";
import { useTituloPagina } from "../hooks/useTituloPagina";

const form_inicial = {
  nombre: "",
  email: "",
  password: "",
  rol: "cliente",
};

function UsuariosSonidoVivo() {
  useTituloPagina("Administrar usuarios");
  const usuariosCtx = useUsuarios();
  const { usuario: sesionActual } = useSesion();

  const [form, setForm] = useState(form_inicial);
  const [errors, setErrors] = useState({});
  const [idEditando, setIdEditando] = useState(null);

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

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    const erroresValidacion = validarFormularioUsuario(form, usuariosCtx.usuarios, idEditando);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrors(erroresValidacion);
      toast.error("Por favor, corrige los errores del formulario.");
      return;
    }

    const datos = {
      nombre: form.nombre.trim(),
      email: form.email.trim().toLowerCase(),
      rol: form.rol,
      ...(idEditando === null || form.password ? { password: form.password } : {}),
    };

    if (idEditando !== null) {
      await usuariosCtx.actualizar(idEditando, datos);
      toast.success(`Usuario "${datos.nombre}" actualizado correctamente.`);
    } else {
      await usuariosCtx.crear(datos);
      toast.success(`Usuario "${datos.nombre}" agregado correctamente.`);
    }
    limpiarFormulario();
    } catch (error) { toast.error(obtenerMensajeError(error)); }
  };

  const editar = (usuario) => {
    setIdEditando(usuario.id);
    setForm({
      nombre: usuario.nombre ?? "",
      email: usuario.email ?? "",
      password: "",
      rol: usuario.rol ?? "cliente",
    });
    setErrors({});
  };

  const eliminar = async (usuario) => {
    if (!window.confirm(`¿Eliminar a ${usuario.nombre}?`)) return;
    try {
    await usuariosCtx.eliminar(usuario.id);
    if (usuario.id === idEditando) limpiarFormulario();
    toast.info(`Usuario "${usuario.nombre}" eliminado.`);
    } catch (error) { toast.error(obtenerMensajeError(error)); }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Administrar usuarios</h1>
          <p className="text-muted mb-0">
            Agrega, edita o elimina los usuarios registrados.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} lg={4} xxl={3}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">
              {idEditando !== null ? "Editar usuario" : "Nuevo usuario"}
            </h3>

            <form onSubmit={handleSubmit} noValidate>
              <FormField
                label="Nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre completo"
                error={errors.nombre}
              />

              <FormField
                label="Correo electrónico"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="usuario@email.com"
                error={errors.email}
              />

              <FormField
                label="Contraseña"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={form.rol === "admin" ? "Mínimo 12 caracteres al asignar admin o cambiar clave" : idEditando !== null ? "Dejar vacío para conservar" : "Mínimo 6 caracteres"}
                autoComplete="new-password"
                error={errors.password}
              />

              <div className="mb-3">
                <label className="form-label" htmlFor="rol">Rol del usuario</label>
                <select id="rol" name="rol" className={`form-select ${errors.rol ? "is-invalid" : ""}`}
                  value={form.rol} onChange={handleChange}
                  disabled={idEditando !== null && Number(idEditando) === Number(sesionActual?.id)}>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
                {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
              </div>
              {idEditando !== null && <p className="text-muted small">Deja la contraseña vacía para conservar la actual.</p>}

              <div className="d-flex flex-wrap gap-2 mt-4">
                <Boton
                  label={idEditando !== null ? "Guardar cambios" : "Agregar usuario"}
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

        <Col xs={12} lg={8} xxl={9}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Usuarios ({usuariosCtx.usuarios.length})</h3>

            {usuariosCtx.usuarios.length === 0 ? (
              <p className="text-muted mb-0">No hay usuarios registrados.</p>
            ) : (
              <ul className="record-grid">
                {usuariosCtx.usuarios.map((u) => (
                  <li
                    key={u.id}
                    className="list-group-item record-grid__item d-flex flex-wrap align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-break">{u.nombre}</div>
                      <small className="text-muted text-break">{u.email}</small>
                      <div><span className={`badge ${u.rol === "admin" ? "bg-primary" : "bg-secondary"}`}>
                        {u.rol === "admin" ? "Administrador" : "Cliente"}
                      </span></div>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      <Boton label="Editar" variant="outline-primary" onClick={() => editar(u)} />
                      {Number(u.id) !== Number(sesionActual?.id) && <Boton label="Eliminar" variant="danger" onClick={() => eliminar(u)} />}
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

export default UsuariosSonidoVivo;