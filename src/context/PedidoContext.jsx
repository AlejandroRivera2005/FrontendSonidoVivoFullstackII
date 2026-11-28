import { createContext, useContext } from 'react'
import * as pedidoService from '../service/pedidoService'
import { useSesion } from './SesionContext'
import { useListaProtegida } from '../hooks/useListaProtegida'

const PedidosContext = createContext(null)

export function PedidosProvider(props) {
  const sesion = useSesion()
  const clave = !sesion.verificando && sesion.usuario ? sesion.token : null
  const cargar = sesion.usuario?.rol === 'admin' ? pedidoService.listarTodosPedidos : pedidoService.listarPedidos
  const estado = useListaProtegida(clave, cargar)

  async function crear(datos) {
    estado.exigirSesion()
    const resultado = await pedidoService.crearPedido(datos)
    estado.exigirSesion()
    estado.refrescar()
    return resultado
  }

  async function actualizar(id, cambios) {
    estado.exigirSesion()
    const resultado = await pedidoService.actualizarPedido(id, cambios)
    estado.exigirSesion()
    estado.refrescar()
    return resultado
  }

  async function eliminar(id) {
    estado.exigirSesion()
    await pedidoService.eliminarPedido(id)
    estado.exigirSesion()
    estado.refrescar()
  }

  return <PedidosContext.Provider value={{ pedidos: estado.lista, cargando: estado.cargando, error: estado.error, recargar: estado.recargar, crear, actualizar, eliminar }}>{props.children}</PedidosContext.Provider>
}

export function usePedidos() {
  const contexto = useContext(PedidosContext)
  if (!contexto) throw new Error('usePedidos debe usarse dentro de un PedidosProvider')
  return contexto
}