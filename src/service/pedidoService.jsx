import { api } from './api'

export async function listarPedidos(signal) {
  const respuesta = await api.get('/pedidos', { signal })
  return respuesta.data
}

export async function obtenerPedido(id) {
  const respuesta = await api.get(`/pedidos/${id}`)
  return respuesta.data
}

export async function crearPedido(datos) {
  const respuesta = await api.post('/pedidos', datos)
  return respuesta.data
}

export async function actualizarPedido(id, cambios) {
  const respuesta = await api.put(`/pedidos/${id}`, cambios)
  return respuesta.data
}

export async function eliminarPedido(id) {
  await api.delete(`/pedidos/${id}`)
}