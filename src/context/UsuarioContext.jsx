import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../service/usuarioService'

const UsuariosContext = createContext(null)

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    usuarioService.listarUsuarios(controller.signal)
      .then((lista) => { if (!controller.signal.aborted) setUsuarios(lista) })
      .catch((error) => {
        if (error.code !== 'ERR_CANCELED') console.error('No se pudieron cargar usuarios:', error)
      })
    return () => controller.abort()
  }, [])

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
