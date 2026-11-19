import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { usePedidos } from '../context/PedidoContext'
import { useUsuarios } from '../context/UsuarioContext'
import { formatoPrecio } from '../utils/formatoPrecio'
import { obtenerMensajeError } from '../service/api'
import { useTituloPagina } from '../hooks/useTituloPagina'

function PedidosSonidoVivo() {
  useTituloPagina('Administrar pedidos')
  const { pedidos, cargando, error, eliminar } = usePedidos()
  const { usuarios } = useUsuarios()

  async function eliminarPedido(pedido) {
    if (!window.confirm(`¿Eliminar el historial del pedido #${pedido.id}? No se repondrá el stock.`)) return
    try {
      await eliminar(pedido.id)
      toast.success('Pedido eliminado.')
    } catch (err) {
      toast.error(obtenerMensajeError(err))
    }
  }

  return (
    <Container className="py-4">
      <h1>Administrar pedidos</h1>
      <p>Los pedidos se crean desde el checkout. La eliminación no devuelve stock.</p>
      {cargando && <p>Cargando pedidos...</p>}
      {error && <p role="alert">{obtenerMensajeError(error)}</p>}
      <ul className="list-group">
        {pedidos.map((pedido) => {
          const usuario = usuarios.find((u) => u.id === pedido.usuarioId)
          return <li className="list-group-item" key={pedido.id}>
            <strong>Pedido #{pedido.id}</strong> — {usuario?.nombre || `Usuario ${pedido.usuarioId}`}
            <p className="mb-1">{pedido.nombre} · {formatoPrecio(pedido.total)}</p>
            <small>{pedido.entrega === 'envio' ? `Envío: ${pedido.direccion}` : 'Retiro en tienda'}</small>
            <div><button className="btn btn-outline-danger btn-sm mt-2" onClick={() => eliminarPedido(pedido)}>Eliminar historial</button></div>
          </li>
        })}
      </ul>
    </Container>
  )
}

export default PedidosSonidoVivo