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

export const validarFormularioProducto = ({ nombre, precio }) =>
  limpiarErrores({
    nombre: validarNombre(nombre),
    precio: validarPrecio(precio),
  });

export const validarCheckout = (items) =>
  !items || items.length === 0 ? MENSAJES.carritoVacio : "";