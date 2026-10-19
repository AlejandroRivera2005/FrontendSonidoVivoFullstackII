import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormField from "../components/molecules/FormField";
import Boton from "../components/atoms/boton/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { validarFormularioUsuario } from "../utils/validaciones";
import { useTituloPagina } from "../hooks/useTituloPagina";

const form_inicial = {
  nombre: "",
  email: "",
  password: "",
};

function UsuariosSonidoVivo() {
  useTituloPagina("Administrar usuarios");
  const usuariosCtx = useUsuarios();

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

  const handleSubmit = (e) => {
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
      password: form.password,
    };

    if (idEditando !== null) {
      usuariosCtx.actualizar(idEditando, datos);
      toast.success(`Usuario "${datos.nombre}" actualizado correctamente.`);
    } else {
      usuariosCtx.crear(datos);
      toast.success(`Usuario "${datos.nombre}" agregado correctamente.`);
    }
    limpiarFormulario();
  };

  const editar = (usuario) => {
    setIdEditando(usuario.id);
    setForm({
      nombre: usuario.nombre ?? "",
      email: usuario.email ?? "",
      password: usuario.password ?? "",
    });
    setErrors({});
  };

  const eliminar = (usuario) => {
    usuariosCtx.eliminar(usuario.id);
    if (usuario.id === idEditando) limpiarFormulario();
    toast.info(`Usuario "${usuario.nombre}" eliminado.`);
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col xs={12}>
          <h1 className="fw-bold">Administrar usuarios</h1>
          <p className="text-muted mb-0">
            Agrega, edita o elimina los usuarios registrados.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col xs={12} md={4}>
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
                placeholder="••••••••"
                autoComplete="new-password"
                error={errors.password}
              />

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

        <Col xs={12} md={8}>
          <div className="p-3 p-md-4 border rounded bg-white shadow-sm">
            <h3 className="h5 mb-3">Usuarios ({usuariosCtx.usuarios.length})</h3>

            {usuariosCtx.usuarios.length === 0 ? (
              <p className="text-muted mb-0">No hay usuarios registrados.</p>
            ) : (
              <ul className="list-group">
                {usuariosCtx.usuarios.map((u) => (
                  <li
                    key={u.id}
                    className="list-group-item d-flex flex-wrap align-items-center gap-3"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-semibold text-break">{u.nombre}</div>
                      <small className="text-muted text-break">{u.email}</small>
                    </div>
                    <div className="d-flex gap-2">
                      <Boton label="Editar" variant="outline-primary" onClick={() => editar(u)} />
                      <Boton label="Eliminar" variant="danger" onClick={() => eliminar(u)} />
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