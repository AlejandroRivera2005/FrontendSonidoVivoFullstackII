import { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as sesionService from '../service/sesionService'

const SesionContext = createContext(null)

export function SesionProvider(props) {
  const [sesion, setSesion] = useState(sesionService.leerSesion)
  const [verificando, setVerificando] = useState(() => Boolean(sesionService.leerToken()))
  const version = useRef(0)
  const solicitud = useRef(null)

  function cerrarSesion() {
    version.current += 1
    solicitud.current?.abort()
    sesionService.borrarSesion()
    setSesion(null)
    setVerificando(false)
  }

  useEffect(() => {
    const controller = new AbortController()
    const actual = version.current
    const token = sesionService.leerToken()
    const expirar = () => cerrarSesion()
    window.addEventListener('sonidovivo:sesion-expirada', expirar)
    if (token) {
      sesionService.obtenerPerfil(controller.signal)
        .then((usuario) => {
          if (controller.signal.aborted || version.current !== actual || sesionService.leerToken() !== token) return
          const nueva = { usuario, token }
          sesionService.guardarSesion(nueva)
          setSesion(nueva)
        })
        .catch(() => {
          if (!controller.signal.aborted && version.current === actual && sesionService.leerToken() === token) cerrarSesion()
        })
        .finally(() => {
          if (!controller.signal.aborted && version.current === actual) setVerificando(false)
        })
    }
    return () => {
      controller.abort()
      solicitud.current?.abort()
      window.removeEventListener('sonidovivo:sesion-expirada', expirar)
    }
  }, [])

  async function iniciarSesion(email, password) {
    cerrarSesion()
    const actual = version.current
    const controller = new AbortController()
    solicitud.current = controller
    try {
      const nueva = await sesionService.iniciarSesion(email, password, controller.signal)
      if (controller.signal.aborted || version.current !== actual) {
        throw Object.assign(new Error('Solicitud cancelada.'), { code: 'ERR_CANCELED' })
      }
      sesionService.guardarSesion(nueva)
      setSesion(nueva)
      return nueva.usuario
    } finally {
      if (solicitud.current === controller) solicitud.current = null
    }
  }

  function sincronizarUsuario(usuario, token) {
    if (!token || token !== sesionService.leerToken() || sesionService.leerSesion()?.usuario.id !== usuario.id) return
    const nueva = { usuario, token }
    sesionService.guardarSesion(nueva)
    setSesion(nueva)
  }

  return <SesionContext.Provider value={{ usuario: sesion?.usuario ?? null, token: sesion?.token ?? null, verificando, iniciarSesion, cerrarSesion, sincronizarUsuario }}>{props.children}</SesionContext.Provider>
}

export function useSesion() {
  const contexto = useContext(SesionContext)
  if (!contexto) throw new Error('useSesion debe usarse dentro de un SesionProvider')
  return contexto
}