const clave4 = 'sesion'

export function leerSesion() {
  try {
    const guardado4 = localStorage.getItem(clave4)
    if (guardado4 === null) return null
    const id = Number(guardado4)
    return Number.isInteger(id) ? id : null
  } catch {
    return null
  }
}

export function guardarSesion(id) {
  try {
    localStorage.setItem(clave4, String(id))
  } catch {
  }
}

export function borrarSesion() {
  try {
    localStorage.removeItem(clave4)
  } catch {
  }
}