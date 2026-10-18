import { createContext, useContext, useState } from 'react'
import * as pedidoService from '../service/pedidoService'

const PedidosContext = createContext(null)

export function PedidosProvider(props) {

  const [pedidos, setPedidos] = useState(() => pedidoService.listarPedidos())

  function crear(datos) {
    pedidoService.crearPedido(datos)
    setPedidos(pedidoService.listarPedidos())
  }
  function actualizar(id, cambios) {
    pedidoService.actualizarPedido(id, cambios)
    setPedidos(pedidoService.listarPedidos())
  }
  function eliminar(id) {
    pedidoService.eliminarPedido(id)
    setPedidos(pedidoService.listarPedidos())
  }

  return (
    <PedidosContext.Provider value={{ pedidos, crear, actualizar, eliminar }}>
      {props.children}
    </PedidosContext.Provider>
  )
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) {
    throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  }
  return contexto
}