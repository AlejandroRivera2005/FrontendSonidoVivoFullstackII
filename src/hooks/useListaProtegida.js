import { useCallback, useEffect, useRef, useState } from 'react'
import { leerToken } from '../service/sesionService'

export function useListaProtegida(clave, cargar) {
  const [estado, setEstado] = useState({ clave: null, lista: [], cargando: false, error: null })
  const secuencia = useRef(0)
  const vigente = useCallback(() => Boolean(clave && leerToken() === clave), [clave])

  const recargar = useCallback(async (signal) => {
    if (!vigente()) return []
    const numero = ++secuencia.current
    const aplicar = () => vigente() && !signal?.aborted && numero === secuencia.current
    setEstado((anterior) => ({ clave, lista: anterior.clave === clave ? anterior.lista : [], cargando: true, error: null }))
    try {
      const lista = await cargar(signal)
      if (aplicar()) setEstado({ clave, lista, cargando: false, error: null })
      return aplicar() ? lista : []
    } catch (error) {
      if (aplicar()) setEstado((anterior) => ({ ...anterior, cargando: false, error }))
      throw error
    }
  }, [clave, cargar, vigente])

  useEffect(() => {
    const controller = new AbortController()
    if (clave) recargar(controller.signal).catch(() => {})
    else setEstado({ clave: null, lista: [], cargando: false, error: null })
    return () => { controller.abort(); secuencia.current += 1 }
  }, [clave, recargar])

  function refrescar() {
    if (vigente()) recargar().catch(() => {})
  }

  function exigirSesion() {
    if (!vigente()) throw Object.assign(new Error('La sesión cambió.'), { code: 'ERR_CANCELED' })
  }

  const visible = estado.clave === clave ? estado : { lista: [], cargando: Boolean(clave), error: null }
  return { ...visible, recargar, refrescar, exigirSesion, vigente }
}