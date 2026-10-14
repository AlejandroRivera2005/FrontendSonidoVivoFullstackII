import productosIniciales from '../data/productos.json'

const CLAVE = 'productos'
const CLAVE_VERSION = 'productos_version'
const VERSION = 1

function reiniciar() {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(productosIniciales))
    localStorage.setItem(CLAVE_VERSION, String(VERSION))
  } catch {
  }
  return [...productosIniciales]
}

function leer() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    const version = localStorage.getItem(CLAVE_VERSION)

    if (guardado === null || version !== String(VERSION)) return reiniciar()

    const lista = JSON.parse(guardado)
    return Array.isArray(lista) ? lista : reiniciar()
  } catch {
    return reiniciar()
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lista))
  } catch {
  }
}

export function listarProductos() {
  return leer()
}

export function obtenerProducto(id) {
  return leer().find((p) => p.id === id) ?? null
}

export function crearProducto(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((p) => p.id)) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarProducto(id, cambios) {
  const lista = leer().map((p) => (p.id === id ? { ...p, ...cambios } : p))
  guardar(lista)
  return lista.find((p) => p.id === id) ?? null
}

export function eliminarProducto(id) {
  guardar(leer().filter((p) => p.id !== id))
}