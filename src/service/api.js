import axios from 'axios'
import { leerToken, borrarSesion } from './sesionService'

const urlApi = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '')
export const api = axios.create({ baseURL: urlApi, timeout: 15000 })

api.interceptors.request.use((config) => {
  const ruta = String(config.url || '')
  const metodo = String(config.method || 'get').toLowerCase()
  const publica = (metodo === 'get' && /^\/productos(?:\/|\?|$)/.test(ruta)) ||
    /^\/auth\/(?:login|registro)(?:\?|$)/.test(ruta)
  const token = leerToken()
  if (token && !publica) config.headers.Authorization = `Bearer ${token}`
  else delete config.headers.Authorization
  return config
})

api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const ruta = String(error.config?.url || '')
    const esAutenticacion = /^\/auth\/(?:login|registro)(?:\?|$)/.test(ruta)
    const tokenActual = leerToken()
    const tokenSolicitud = String(error.config?.headers?.Authorization || '').replace(/^Bearer\s+/i, '')
    if (error.response?.status === 401 && !esAutenticacion && tokenActual && tokenSolicitud === tokenActual) {
      borrarSesion()
      window.dispatchEvent(new Event('sonidovivo:sesion-expirada'))
    }
    return Promise.reject(error)
  },
)

export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    const mensaje = datos?.error || datos?.mensaje
    const detalles = datos?.detalles && typeof datos.detalles === 'object'
      ? Object.values(datos.detalles).flat().join(' ')
      : ''
    return [mensaje || `Error HTTP ${error.response.status}`, detalles].filter(Boolean).join(' ')
  }
  if (error.code === 'ERR_CANCELED') return 'Solicitud cancelada.'
  if (error.code === 'ECONNABORTED') return 'La API tardó demasiado en responder. Intenta nuevamente.'
  if (error.code === 'ERR_NETWORK') return 'No se pudo conectar con la API. Comprueba el proxy /api y la conectividad entre servidores.'
  return 'No fue posible completar la solicitud. Intenta nuevamente.'
}


