import { createContext, useContext, useEffect, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => sesionService.leerSesion()?.usuario ?? null)

  useEffect(() => {
    if (!sesionService.leerToken()) return
    sesionService.obtenerPerfil()
      .then((perfil) => setUsuario(perfil))
      .catch((error) => { if (error.response?.status === 401) { sesionService.borrarSesion(); setUsuario(null) } })
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

  return <SesionContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>{children}</SesionContext.Provider>
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de un SesionProvider')
  return contexto
}