
import axios from 'axios'
import { leerToken } from './sesionService'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://54.88.63.9:3000/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const token = leerToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export function obtenerMensajeError(error) {
  if (error.response) {
    const datos = error.response.data
    const mensaje = datos?.error || datos?.mensaje

    const detalles = datos?.detalles && typeof datos.detalles === 'object'
      ? Object.values(datos.detalles).flat().join(' ')
      : ''

    return [
      mensaje || `Error HTTP ${error.response.status}`,
      detalles,
    ].filter(Boolean).join(' ')
  }

  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder.'
  }

  return 'No fue posible contactar la API. Comprueba el servidor y la conexión.'
}
