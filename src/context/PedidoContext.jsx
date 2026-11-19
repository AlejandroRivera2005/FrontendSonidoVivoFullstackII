import { createContext, useContext, useEffect, useState } from 'react'
import * as pedidoService from '../service/pedidoService'
import { useSesion } from './SesionContext'

const PedidosContext = createContext(null)

export function PedidosProvider({ children }) {
  const { usuario, verificando } = useSesion()
  const [pedidos, setPedidos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  async function recargar() {
    setCargando(true)
    try {
      const lista = await pedidoService.listarPedidos()
      setPedidos(lista)
      setError(null)
      return lista
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (verificando) return
    const controller = new AbortController()
    setCargando(true)
    setError(null)
    pedidoService.listarPedidos(controller.signal)
      .then((lista) => { if (!controller.signal.aborted) setPedidos(lista) })
      .catch((err) => {
        if (!controller.signal.aborted && err.code !== 'ERR_CANCELED') setError(err)
      })
      .finally(() => { if (!controller.signal.aborted) setCargando(false) })
    return () => controller.abort()
  }, [usuario?.id, verificando])

  async function crear(datos) {
    const pedido = await pedidoService.crearPedido(datos)
    setPedidos((actual) => [...actual, pedido])
    return pedido
  }

  async function actualizar(id, cambios) {
    const pedido = await pedidoService.actualizarPedido(id, cambios)
    setPedidos((actual) => actual.map((p) => p.id === id ? pedido : p))
    return pedido
  }

  async function eliminar(id) {
    await pedidoService.eliminarPedido(id)
    setPedidos((actual) => actual.filter((p) => p.id !== id))
  }

  return <PedidosContext.Provider value={{ pedidos, cargando, error, recargar, crear, actualizar, eliminar }}>{children}</PedidosContext.Provider>
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  return contexto
}
