import { api } from './api'

export async function listarProductos(signal) {
  const respuesta = await api.get('/productos', { signal })
  return respuesta.data
}

export async function obtenerProducto(id) {
  const respuesta = await api.get(`/productos/${id}`)
  return respuesta.data
}

export async function crearProducto(datos) {
  const respuesta = await api.post('/productos', datos)
  return respuesta.data
}

export async function actualizarProducto(id, cambios) {
  const respuesta = await api.put(`/productos/${id}`, cambios)
  return respuesta.data
}

export async function eliminarProducto(id) {
  await api.delete(`/productos/${id}`)
}