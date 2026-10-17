export const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MENSAJES = {
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
};

export const esVacio = (valor) => !String(valor ?? "").trim();

export const esEmailValido = (email) => REGEX_EMAIL.test(email);

export const validarEmail = (email) => {
  if (esVacio(email)) return MENSAJES.emailObligatorio;
  if (!esEmailValido(email)) return MENSAJES.emailInvalido;
  return "";
};

export const validarNombre = (nombre) =>
  esVacio(nombre) ? MENSAJES.nombreObligatorio : "";

export const validarMensaje = (mensaje) =>
  esVacio(mensaje) ? MENSAJES.mensajeObligatorio : "";

export const validarPassword = (password) =>
  esVacio(password) ? MENSAJES.passwordObligatoria : "";

export const validarPrecio = (precio) => {
  if (esVacio(precio)) return MENSAJES.precioObligatorio;
  const numero = Number(precio);
  if (!Number.isFinite(numero) || numero < 1) return MENSAJES.precioInvalido;
  return "";
};

export const validarCategoria = (categoria) =>
  esVacio(categoria) ? MENSAJES.categoriaObligatoria : "";

export const validarStock = (stock) => {
  if (esVacio(stock)) return MENSAJES.stockObligatorio;
  const numero = Number(stock);
  if (!Number.isInteger(numero) || numero < 0) return MENSAJES.stockInvalido;
  return "";
};

export const validarDescripcion = (descripcion) =>
  esVacio(descripcion) ? MENSAJES.descripcionObligatoria : "";

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

export const validarCheckout = (items) =>
  !items || items.length === 0 ? MENSAJES.carritoVacio : "";