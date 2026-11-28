import axios from 'axios'
import { leerToken, borrarSesion } from './sesionService'

const urlApi = (
  import.meta.env.VITE_API_URL || '/api'
).replace(/\/+$/, '')

export const api = axios.create({
  baseURL: urlApi,
  timeout: 15000,
})

function obtenerRuta(config) {
  return String(config?.url || '')
    .split('?')[0]
    .replace(/\/+$/, '')
}

function esRutaPublica(config) {
  const ruta = obtenerRuta(config)
  const metodo = String(
    config?.method || 'get'
  ).toLowerCase()

  if (metodo === 'post') {
    return (
      ruta === '/auth/login' ||
      ruta === '/auth/registro' ||
      ruta === '/contacto'
    )
  }

  if (metodo === 'get') {
    return (
      ruta === '/health' ||
      ruta === '/saludo' ||
      ruta === '/productos' ||
      ruta.startsWith('/productos/') ||
      ruta === '/docs' ||
      ruta === '/docs.json'
    )
  }

  return false
}

api.interceptors.request.use(
  (config) => {
    if (esRutaPublica(config)) {
      config.headers.delete('Authorization')
      return config
    }

    const token = leerToken()

    if (token) {
      config.headers.set(
        'Authorization',
        `Bearer ${token}`
      )
    } else {
      config.headers.delete('Authorization')
    }

    return config
  },
  (error) => { throw error },
  { synchronous: true }
)

api.interceptors.response.use(
  (respuesta) => respuesta,

  (error) => {
    const publica = esRutaPublica(error.config)

    const tokenActual = leerToken()

    const encabezado =
      error.config?.headers?.get?.('Authorization') ||
      error.config?.headers?.Authorization ||
      ''

    const tokenSolicitud = String(encabezado)
      .replace(/^Bearer\s+/i, '')

    if (
      error.response?.status === 401 &&
      !publica &&
      tokenActual &&
      tokenSolicitud === tokenActual
    ) {
      borrarSesion()

      window.dispatchEvent(
        new Event('sonidovivo:sesion-expirada')
      )
    }

    return Promise.reject(error)
  }
)

export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data

    const mensaje = datos?.error || datos?.mensaje

    const detalles =
      datos?.detalles &&
      typeof datos.detalles === 'object'
        ? Object.values(datos.detalles)
            .flat()
            .join(' ')
        : ''

    return [
      mensaje || `Error HTTP ${error.response.status}`,
      detalles,
    ]
      .filter(Boolean)
      .join(' ')
  }

  if (error.code === 'ERR_CANCELED') {
    return 'Solicitud cancelada.'
  }

  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder. Intenta nuevamente.'
  }

  if (error.code === 'ERR_NETWORK') {
    return 'No se pudo conectar con la API. Comprueba el proxy /api y la conectividad entre servidores.'
  }

  return error instanceof Error && !error.isAxiosError ? error.message : 'No fue posible completar la solicitud. Intenta nuevamente.'
}