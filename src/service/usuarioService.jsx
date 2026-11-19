import { api } from './api'

export async function listarUsuarios(signal) {
  const respuesta = await api.get('/usuarios', { signal })
  return respuesta.data
}

export async function obtenerUsuario(id) {
  const respuesta = await api.get(`/usuarios/${id}`)
  return respuesta.data
}

export async function crearUsuario(datos) {
  const respuesta = await api.post('/auth/registro', datos)
  return respuesta.data.usuario
}

export async function actualizarUsuario(id, cambios) {
  const respuesta = await api.put(`/usuarios/${id}`, cambios)
  return respuesta.data
}

export async function eliminarUsuario(id) {
  await api.delete(`/usuarios/${id}`)
}