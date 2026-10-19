export function formatoFecha(fecha) {
  const texto = String(fecha ?? '')
  const coincide = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto)
  if (!coincide) return texto
  const [, anio, mes, dia] = coincide
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(Number(anio), Number(mes) - 1, Number(dia)))
}