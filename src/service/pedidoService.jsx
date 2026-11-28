import { api } from './api'
import { leerToken } from './sesionService'

let pendiente = null

function nuevaClave() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function listarPedidos(signal) {
  const respuesta = await api.get('/pedidos/mios', { signal })
  return respuesta.data
}

export async function listarTodosPedidos(signal) {
  const respuesta = await api.get('/pedidos', { signal })
  return respuesta.data
}

export async function obtenerPedido(id) {
  const respuesta = await api.get(`/pedidos/${id}`)
  return respuesta.data
}

export async function crearPedido(datos) {
  const token = leerToken()
  const contenido = JSON.stringify(datos)
  if (pendiente?.token !== token || pendiente?.contenido !== contenido) pendiente = { token, contenido, clave: nuevaClave() }
  const operacion = pendiente
  try {
    const respuesta = await api.post('/pedidos', datos, { headers: { 'Idempotency-Key': operacion.clave } })
    if (pendiente === operacion) pendiente = null
    return respuesta.data
  } catch (error) {
    const status = error.response?.status
    if (status >= 400 && status < 500 && ![408, 429].includes(status) && pendiente === operacion) pendiente = null
    throw error
  }
}

export async function actualizarPedido(id, cambios) {
  const respuesta = await api.put(`/pedidos/${id}`, cambios)
  return respuesta.data
}

export async function eliminarPedido(id) {
  await api.delete(`/pedidos/${id}`)
}