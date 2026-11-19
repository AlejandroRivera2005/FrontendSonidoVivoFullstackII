import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../service/usuarioService'
import { useSesion } from './SesionContext'

const UsuariosContext = createContext(null)

export function UsuariosProvider({ children }) {
  const { usuario } = useSesion()
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    if (!usuario) return
    const controller = new AbortController()
    usuarioService.listarUsuarios(controller.signal)
      .then(setUsuarios)
      .catch(() => {})
    return () => controller.abort()
  }, [usuario?.id])

  async function crear(datos) {
    const nuevo = await usuarioService.crearUsuario(datos)
    setUsuarios((actual) => [...actual, nuevo])
    return nuevo
  }

  async function actualizar(id, cambios) {
    const actualizado = await usuarioService.actualizarUsuario(id, cambios)
    setUsuarios((actual) => actual.map((u) => u.id === id ? actualizado : u))
    return actualizado
  }

  async function eliminar(id) {
    await usuarioService.eliminarUsuario(id)
    setUsuarios((actual) => actual.filter((u) => u.id !== id))
  }

  return <UsuariosContext.Provider value={{ usuarios, crear, actualizar, eliminar }}>{children}</UsuariosContext.Provider>
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  return contexto
}