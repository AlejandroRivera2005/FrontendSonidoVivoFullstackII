import pedidosIniciales from '../data/pedidos.json'

const clave2 = 'pedidos'
const clave_version2 = 'pedidos_version'
const version2 = 2

function reiniciar() {
  try {
    localStorage.setItem(clave2, JSON.stringify(pedidosIniciales))
    localStorage.setItem(clave_version2, String(version2))
  } catch {
  }
  return [...pedidosIniciales]
}

function leer() {
  try {
    const guardado2 = localStorage.getItem(clave2)
    const versionGuardada2 = localStorage.getItem(clave_version2)

    if (guardado2 === null || versionGuardada2 !== String(version2)) return reiniciar()

    const lista = JSON.parse(guardado2)
    return Array.isArray(lista) ? lista : reiniciar()
  } catch {
    return reiniciar()
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(clave2, JSON.stringify(lista))
  } catch {
  }
}

export function listarPedidos() {
  return leer()
}

export function obtenerPedido(id) {
  return leer().find((p) => p.id === id) ?? null
}

export function crearPedido(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarPedido(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p))
  guardar(lista)
  return lista.find((p) => p.id === id) ?? null
}

export function eliminarPedido(id) {
  guardar(leer().filter((p) => p.id !== id))
}