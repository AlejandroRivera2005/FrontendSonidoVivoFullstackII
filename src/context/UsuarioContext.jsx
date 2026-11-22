import { createContext, useContext, useEffect, useState } from 'react'
import * as usuarioService from '../service/usuarioService'
import { useSesion } from './SesionContext'

const UsuariosContext = createContext(null)

export function UsuariosProvider(props) {
  const { usuario } = useSesion()
  const [usuarios, setUsuarios] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function recargar() {
    if (!usuario || usuario.rol !== 'admin') { setUsuarios([]); return [] }
    setCargando(true)
    setError(null)
    try {
      const lista = await usuarioService.listarUsuarios()
      setUsuarios(lista)
      return lista
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (!usuario || usuario.rol !== 'admin') {
      setUsuarios([])
      setError(null)
      setCargando(false)
      return
    }
    const controller = new AbortController()
    setCargando(true)
    usuarioService.listarUsuarios(controller.signal)
      .then((lista) => { if (!controller.signal.aborted) { setUsuarios(lista); setError(null) } })
      .catch((err) => { if (!controller.signal.aborted && err.code !== 'ERR_CANCELED') setError(err) })
      .finally(() => { if (!controller.signal.aborted) setCargando(false) })
    return () => controller.abort()
  }, [usuario?.id, usuario?.rol])

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

  return <UsuariosContext.Provider value={{ usuarios, cargando, error, recargar, crear, actualizar, eliminar }}>{props.children}</UsuariosContext.Provider>
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  return contexto
}
