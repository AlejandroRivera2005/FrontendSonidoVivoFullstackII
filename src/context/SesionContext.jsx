import { createContext, useContext, useEffect, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider(props) {
  const [usuario, setUsuario] = useState(() => sesionService.leerSesion()?.usuario ?? null)
  const [verificando, setVerificando] = useState(() => Boolean(sesionService.leerToken()))

  useEffect(() => {
    let activo = true
    const expirar = () => {
      if (activo) { setUsuario(null); setVerificando(false) }
    }
    window.addEventListener('sonidovivo:sesion-expirada', expirar)

    if (sesionService.leerToken()) {
      sesionService.obtenerPerfil()
        .then((perfil) => { if (activo) setUsuario(perfil) })
        .catch((error) => {
          if (error.response?.status === 401) {
            sesionService.borrarSesion()
            if (activo) setUsuario(null)
          }
        })
        .finally(() => { if (activo) setVerificando(false) })
    }
    return () => {
      activo = false
      window.removeEventListener('sonidovivo:sesion-expirada', expirar)
    }
  }, [])

  async function iniciarSesion(email, password) {
    const autenticado = await sesionService.iniciarSesion(email, password)
    setUsuario(autenticado)
    setVerificando(false)
    return autenticado
  }

  function cerrarSesion() {
    sesionService.borrarSesion()
    setUsuario(null)
    setVerificando(false)
  }

  return <SesionContext.Provider value={{ usuario, verificando, iniciarSesion, cerrarSesion }}>{props.children}</SesionContext.Provider>
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de un SesionProvider')
  return contexto
}
