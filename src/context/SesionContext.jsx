import { createContext, useContext, useEffect, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(() => sesionService.leerSesion()?.usuario ?? null)
  const [verificando, setVerificando] = useState(Boolean(sesionService.leerToken()))

  useEffect(() => {
    let activo = true
    function sesionExpirada() {
      setUsuario(null)
      setVerificando(false)
    }
    window.addEventListener('sonidovivo:sesion-expirada', sesionExpirada)
    if (sesionService.leerToken()) {
      sesionService.obtenerPerfil()
        .then((perfil) => {
          if (activo) setUsuario(perfil)
        })
        .catch((error) => {
          if (activo && error.response?.status === 401) {
            sesionService.borrarSesion()
            setUsuario(null)
          }
        })
        .finally(() => { if (activo) setVerificando(false) })
    }
    return () => {
      activo = false
      window.removeEventListener('sonidovivo:sesion-expirada', sesionExpirada)
    }
  }, [])

  async function iniciarSesion(email, password) {
    const usuarioAutenticado = await sesionService.iniciarSesion(email, password)
    setUsuario(usuarioAutenticado)
    setVerificando(false)
    return usuarioAutenticado
  }

  function cerrarSesion() {
    sesionService.borrarSesion()
    setUsuario(null)
    setVerificando(false)
  }

  return (
    <SesionContext.Provider value={{ usuario, verificando, iniciarSesion, cerrarSesion }}>
      {children}
    </SesionContext.Provider>
  )
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de un SesionProvider')
  return contexto
}
