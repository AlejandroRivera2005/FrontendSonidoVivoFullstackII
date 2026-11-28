import { createContext, useContext } from 'react'
import * as usuarioService from '../service/usuarioService'
import { useSesion } from './SesionContext'
import { useListaProtegida } from '../hooks/useListaProtegida'

const UsuariosContext = createContext(null)

export function UsuariosProvider(props) {
  const sesion = useSesion()
  const clave = !sesion.verificando && sesion.usuario?.rol === 'admin' ? sesion.token : null
  const cargar = usuarioService.listarUsuarios
  const estado = useListaProtegida(clave, cargar)

  async function crear(datos) {
    estado.exigirSesion()
    const resultado = await usuarioService.crearUsuario(datos)
    estado.exigirSesion()
    estado.refrescar()
    return resultado
  }

  async function actualizar(id, cambios) {
    estado.exigirSesion()
    const resultado = await usuarioService.actualizarUsuario(id, cambios)
    estado.exigirSesion()
    if (id === sesion.usuario?.id && estado.vigente()) {
      if (cambios.password) sesion.cerrarSesion()
      else sesion.sincronizarUsuario(resultado, clave)
    }
    estado.refrescar()
    return resultado
  }

  async function eliminar(id) {
    estado.exigirSesion()
    await usuarioService.eliminarUsuario(id)
    estado.exigirSesion()
    estado.refrescar()
  }

  return <UsuariosContext.Provider value={{ usuarios: estado.lista, cargando: estado.cargando, error: estado.error, recargar: estado.recargar, crear, actualizar, eliminar }}>{props.children}</UsuariosContext.Provider>
}

export function useUsuarios() {
  const contexto = useContext(UsuariosContext)
  if (!contexto) throw new Error('useUsuarios debe usarse dentro de un UsuariosProvider')
  return contexto
}