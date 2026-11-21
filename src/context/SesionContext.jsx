import { createContext, useContext, useEffect, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(null)
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    let activo = true
    if (!sesionService.leerToken()) {
      setVerificando(false)
      return
    }
    sesionService.obtenerPerfil()
      .then((perfil) => { if (activo) setUsuario(perfil) })
      .catch(() => {
        sesionService.borrarSesion()
        if (activo) setUsuario(null)
      })
      .finally(() => { if (activo) setVerificando(false) })
    return () => { activo = false }
  }, [])

  async function iniciarSesion(email, password) {
    const usuarioAutenticado = await sesionService.iniciarSesion(email, password)
    setUsuario(usuarioAutenticado)
    return usuarioAutenticado
  }

  function cerrarSesion() {
    sesionService.borrarSesion()
    setUsuario(null)
  }

  return <SesionContext.Provider value={{ usuario, verificando, iniciarSesion, cerrarSesion }}>{children}</SesionContext.Provider>
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de un SesionProvider')
  return contexto
}