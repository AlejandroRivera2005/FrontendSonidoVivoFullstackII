import { api } from './api'

const clave = 'sonidovivo_sesion_api'

export function leerSesion() {
  try {
    const sesion = JSON.parse(
      localStorage.getItem(clave)
    )

    return sesion?.token && sesion?.usuario
      ? sesion
      : null
  } catch {
    return null
  }
}

export function leerToken() {
  return leerSesion()?.token ?? null
}

export function guardarSesion(sesion) {
  localStorage.setItem(
    clave,
    JSON.stringify(sesion)
  )
}

export function borrarSesion() {
  localStorage.removeItem(clave)
}

export async function iniciarSesion(email, password, signal) {
  const respuesta = await api.post('/auth/login', { email, password }, { signal })
  const { usuario, token } = respuesta.data ?? {}
  if (!usuario || !token) throw new Error('El servidor no devolvió una sesión válida.')
  return { usuario, token }
}

export async function registrar(datos) {
  const respuesta = await api.post('/auth/registro', datos)
  return respuesta.data.usuario
}

export async function obtenerPerfil(signal) {
  const respuesta = await api.get('/auth/perfil', { signal })
  return respuesta.data
}