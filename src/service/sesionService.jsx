import { api } from './api'

const clave = 'sonidovivo_sesion_api'

export function leerSesion() {
  try {
    const sesion = JSON.parse(localStorage.getItem(clave))
    return sesion?.token && sesion?.usuario ? sesion : null
  } catch {
    return null
  }
}

export function leerToken() {
  return leerSesion()?.token ?? null
}

export function guardarSesion(sesion) {
  localStorage.setItem(clave, JSON.stringify(sesion))
}

export function borrarSesion() {
  localStorage.removeItem(clave)
}

export async function iniciarSesion(email, password) {
  const respuesta = await api.post('/auth/login', { email, password })
  guardarSesion({ token: respuesta.data.token, usuario: respuesta.data.usuario })
  return respuesta.data.usuario
}

export async function obtenerPerfil() {
  const respuesta = await api.get('/auth/perfil')
  return respuesta.data
}