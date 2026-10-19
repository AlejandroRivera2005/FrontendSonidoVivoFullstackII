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
  tarjetaObligatoria: "El número de tarjeta es obligatorio.",
  tarjetaInvalida: "Ingresa un número de tarjeta válido (entre 13 y 19 dígitos).",
  vencimientoObligatorio: "La fecha de caducidad es obligatoria.",
  vencimientoInvalido: "Usa el formato MM/AA con un mes válido.",
  tarjetaVencida: "La tarjeta está vencida.",
  cvcObligatorio: "El CVC es obligatorio.",
  cvcInvalido: "El CVC debe tener 3 o 4 dígitos.",
  direccionObligatoria: "La dirección es obligatoria.",
  direccionInvalida: "Ingresa una dirección válida (calle y número).",
  comunaObligatoria: "La comuna es obligatoria.",
  passwordCorta: "La contraseña debe tener al menos 6 caracteres.",
  confirmarPasswordObligatoria: "Debes confirmar la contraseña.",
  passwordsNoCoinciden: "Las contraseñas no coinciden.",
  emailDuplicado: "Ya existe un usuario registrado con este correo.",
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

export const validarNumeroTarjeta = (numero) => {
  if (esVacio(numero)) return mensajes.tarjetaObligatoria;
  const digitos = String(numero).replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digitos)) return mensajes.tarjetaInvalida;
  return "";
};

export const validarVencimiento = (vencimiento, hoy = new Date()) => {
  if (esVacio(vencimiento)) return mensajes.vencimientoObligatorio;
  const coincide = /^(\d{2})\/(\d{2})$/.exec(String(vencimiento).trim());
  if (!coincide) return mensajes.vencimientoInvalido;

  const mes = Number(coincide[1]);
  const anio = 2000 + Number(coincide[2]);
  if (mes < 1 || mes > 12) return mensajes.vencimientoInvalido;

  const anioActual = hoy.getFullYear();
  const mesActual = hoy.getMonth() + 1;
  if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
    return mensajes.tarjetaVencida;
  }
  return "";
};

export const validarCvc = (cvc) => {
  if (esVacio(cvc)) return mensajes.cvcObligatorio;
  if (!/^\d{3,4}$/.test(String(cvc).trim())) return mensajes.cvcInvalido;
  return "";
};

export const validarFormularioPago = ({ numeroTarjeta, vencimiento, cvc }) =>
  limpiarErrores({
    numeroTarjeta: validarNumeroTarjeta(numeroTarjeta),
    vencimiento: validarVencimiento(vencimiento),
    cvc: validarCvc(cvc),
  });

export const validarDireccion = (direccion) => {
  if (esVacio(direccion)) return mensajes.direccionObligatoria;
  if (String(direccion).trim().length < 5) return mensajes.direccionInvalida;
  return "";
};

export const validarComuna = (comuna) =>
  esVacio(comuna) ? mensajes.comunaObligatoria : "";

export const validarFormularioEnvio = ({ direccion, comuna }) =>
  limpiarErrores({
    direccion: validarDireccion(direccion),
    comuna: validarComuna(comuna),
  });

export const validarPasswordNueva = (password) => {
  if (esVacio(password)) return mensajes.passwordObligatoria;
  if (String(password).length < 6) return mensajes.passwordCorta;
  return "";
};

export const validarConfirmarPassword = (password, confirmar) => {
  if (esVacio(confirmar)) return mensajes.confirmarPasswordObligatoria;
  if (password !== confirmar) return mensajes.passwordsNoCoinciden;
  return "";
};

export const validarEmailUnico = (email, usuarios = [], idActual = null) => {
  const buscado = String(email ?? "").trim().toLowerCase();
  const existe = usuarios.some(
    (u) => u.id !== idActual && String(u.email ?? "").trim().toLowerCase() === buscado
  );
  return existe ? mensajes.emailDuplicado : "";
};

export const validarFormularioUsuario = (
  { nombre, email, password },
  usuarios = [],
  idActual = null
) =>
  limpiarErrores({
    nombre: validarNombre(nombre),
    email:
      validarEmail(String(email ?? "").trim()) ||
      validarEmailUnico(email, usuarios, idActual),
    password: validarPasswordNueva(password),
  });

export const validarFormularioRegistro = (
  { nombre, email, password, confirmarPassword },
  usuarios = []
) =>
  limpiarErrores({
    ...validarFormularioUsuario({ nombre, email, password }, usuarios),
    confirmarPassword: validarConfirmarPassword(password, confirmarPassword),
  });

export const validarCheckout = (items) =>
  !items || items.length === 0 ? mensajes.carritoVacio : "";