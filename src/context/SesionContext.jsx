import { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider(props) {
  const [usuario, setUsuario] = useState(() => sesionService.leerSesion()?.usuario ?? null)
  const [verificando, setVerificando] = useState(() => Boolean(sesionService.leerToken()))
  const version = useRef(0)

  useEffect(() => {
    let activo = true
    const actual = version.current
    const tokenInicial = sesionService.leerToken()
    const expirar = () => {
      version.current += 1
      if (activo) { setUsuario(null); setVerificando(false) }
    }
    window.addEventListener('sonidovivo:sesion-expirada', expirar)
    if (tokenInicial) {
      sesionService.obtenerPerfil()
        .then((perfil) => {
          if (activo && version.current === actual && sesionService.leerToken() === tokenInicial) setUsuario(perfil)
        })
        .catch((error) => {
          if (error.response?.status === 401 && activo && version.current === actual && sesionService.leerToken() === tokenInicial) {
            sesionService.borrarSesion()
            setUsuario(null)
          }
        })
        .finally(() => { if (activo && version.current === actual) setVerificando(false) })
    } else setVerificando(false)
    return () => { activo = false; window.removeEventListener('sonidovivo:sesion-expirada', expirar) }
  }, [])

  async function iniciarSesion(email, password) {
    const autenticado = await sesionService.iniciarSesion(email, password)
    version.current += 1
    setUsuario(autenticado)
    setVerificando(false)
    return autenticado
  }

  function cerrarSesion() {
    version.current += 1
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
