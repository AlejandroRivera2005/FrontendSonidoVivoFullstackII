export function formatoNumeroTarjeta(valor) {
  return String(valor ?? "")
    .replace(/\D/g, "")
    .slice(0, 19)
    .replace(/(.{4})/g, "$1 ")
    .trim();
}

export function formatoVencimiento(valor) {
  const digitos = String(valor ?? "").replace(/\D/g, "").slice(0, 4);
  return digitos.length > 2 ? `${digitos.slice(0, 2)}/${digitos.slice(2)}` : digitos;
}

export function formatoCvc(valor) {
  return String(valor ?? "").replace(/\D/g, "").slice(0, 4);
}