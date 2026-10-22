import { createContext, useContext, useState } from 'react'
import * as sesionService from '../service/sesionService'
import { useUsuarios } from './UsuarioContext'

const SesionContext = createContext(null)

export function SesionProvider(props) {

  const { usuarios } = useUsuarios()
  const [idSesion, setIdSesion] = useState(() => sesionService.leerSesion())

  const guardado = usuarios.find((u) => u.id === idSesion)
  const usuario = guardado
    ? { id: guardado.id, nombre: guardado.nombre, email: guardado.email }
    : null

  function iniciarSesion(email, password) {
    const buscado = String(email ?? '').trim().toLowerCase()
    const encontrado = usuarios.find(
      (u) => String(u.email ?? '').trim().toLowerCase() === buscado && u.password === password
    )
    if (!encontrado) return null
    sesionService.guardarSesion(encontrado.id)
    setIdSesion(encontrado.id)
    return { id: encontrado.id, nombre: encontrado.nombre, email: encontrado.email }
  }
  function cerrarSesion() {
    sesionService.borrarSesion()
    setIdSesion(null)
  }

  return (
    <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {props.children}
    </SesionContext.Provider>
  )
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de un SesionProvider')
  }
  return contexto
}