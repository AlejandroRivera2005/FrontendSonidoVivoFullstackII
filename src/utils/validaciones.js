export const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const mensajes = {
  nombreObligatorio: "El nombre es obligatorio.",
  emailObligatorio: "El correo electrónico es obligatorio.",
  emailInvalido: "Ingresa un correo electrónico válido.",
  mensajeObligatorio: "El mensaje es obligatorio.",
  passwordObligatoria: "La contraseña es obligatoria.",
  carritoVacio: "Tu carrito está vacío.",
  precioObligatorio: "El precio es obligatorio.",
  precioInvalido: "El precio debe ser un número mayor o igual a 1.",
  categoriaObligatoria: "La categoría es obligatoria.",
  stockObligatorio: "El stock es obligatorio.",
  stockInvalido: "El stock debe ser un número entero mayor o igual a 0.",
  descripcionObligatoria: "La descripción es obligatoria.",
  totalObligatorio: "El total es obligatorio.",
  totalInvalido: "El total debe ser un número mayor o igual a 1.",
  cantidadObligatoria: "La cantidad es obligatoria.",
  cantidadInvalida: "La cantidad debe ser un número entero mayor o igual a 1.",
};

export const esVacio = (valor) => !String(valor ?? "").trim();

export const esEmailValido = (email) => regex_email.test(email);

export const validarEmail = (email) => {
  if (esVacio(email)) return mensajes.emailObligatorio;
  if (!esEmailValido(email)) return mensajes.emailInvalido;
  return "";
};

export const validarNombre = (nombre) =>
  esVacio(nombre) ? mensajes.nombreObligatorio : "";

export const validarMensaje = (mensaje) =>
  esVacio(mensaje) ? mensajes.mensajeObligatorio : "";

export const validarPassword = (password) =>
  esVacio(password) ? mensajes.passwordObligatoria : "";

export const validarPrecio = (precio) => {
  if (esVacio(precio)) return mensajes.precioObligatorio;
  const numero = Number(precio);
  if (!Number.isFinite(numero) || numero < 1) return mensajes.precioInvalido;
  return "";
};

export const validarCategoria = (categoria) =>
  esVacio(categoria) ? mensajes.categoriaObligatoria : "";

export const validarStock = (stock) => {
  if (esVacio(stock)) return mensajes.stockObligatorio;
  const numero = Number(stock);
  if (!Number.isInteger(numero) || numero < 0) return mensajes.stockInvalido;
  return "";
};

export const validarDescripcion = (descripcion) =>
  esVacio(descripcion) ? mensajes.descripcionObligatoria : "";

const limpiarErrores = (errores) =>
  Object.fromEntries(Object.entries(errores).filter(([, msg]) => msg));

export const validarFormularioContacto = ({ nombre, email, mensaje }) =>
  limpiarErrores({
    nombre: validarNombre(nombre),
    email: validarEmail(email),
    mensaje: validarMensaje(mensaje),
  });

export const validarFormularioLogin = ({ email, password }) =>
  limpiarErrores({
    email: validarEmail(email),
    password: validarPassword(password),
  });

  export const validarTotal = (total) => {
  if (esVacio(total)) return mensajes.totalObligatorio;
  const numero = Number(total);
  if (!Number.isFinite(numero) || numero < 1) return mensajes.totalInvalido;
  return "";
};

export const validarCantidad = (cantidad) => {
  if (esVacio(cantidad)) return mensajes.cantidadObligatoria;
  const numero = Number(cantidad);
  if (!Number.isInteger(numero) || numero < 1) return mensajes.cantidadInvalida;
  return "";
};

export const validarFormularioProducto = ({
  nombre,
  precio,
  categoria,
  stock,
  descripcion,
}) =>

  limpiarErrores({
    nombre: validarNombre(nombre),
    precio: validarPrecio(precio),
    categoria: validarCategoria(categoria),
    stock: validarStock(stock),
    descripcion: validarDescripcion(descripcion),
  });

  export const validarFormularioPedido = ({ nombre, total, cantidad }) =>
  limpiarErrores({
    nombre: validarNombre(nombre),
    total: validarTotal(total),
    cantidad: validarCantidad(cantidad),
  });

export const validarCheckout = (items) =>
  !items || items.length === 0 ? mensajes.carritoVacio : "";