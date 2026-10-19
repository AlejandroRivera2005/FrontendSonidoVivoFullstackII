import usuariosIniciales from '../data/usuarios.json'

const clave3 = 'usuarios'
const clave_version3 = 'usuarios_version'
const version3 = 1

function reiniciar() {
  try {
    localStorage.setItem(clave3, JSON.stringify(usuariosIniciales))
    localStorage.setItem(clave_version3, String(version3))
  } catch {
  }
  return [...usuariosIniciales]
}

function leer() {
  try {
    const guardado3 = localStorage.getItem(clave3)
    const versionGuardada3 = localStorage.getItem(clave_version3)

    if (guardado3 === null || versionGuardada3 !== String(version3)) return reiniciar()

    const lista = JSON.parse(guardado3)
    return Array.isArray(lista) ? lista : reiniciar()
  } catch {
    return reiniciar()
  }
}

function guardar(lista) {
  try {
    localStorage.setItem(clave3, JSON.stringify(lista))
  } catch {
  }
}

export function listarUsuarios() {
  return leer()
}

export function obtenerUsuario(id) {
  return leer().find((u) => u.id === id) ?? null
}

export function crearUsuario(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((u) => u.id)) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarUsuario(id, cambios) {
  const lista = leer().map((u) => (u.id === id ? { ...u, ...cambios } : u))
  guardar(lista)
  return lista.find((u) => u.id === id) ?? null
}

export function eliminarUsuario(id) {
  guardar(leer().filter((u) => u.id !== id))
}