import { useRef, useState } from 'react'
import { Container } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { usePedidos } from '../context/PedidoContext'
import { useUsuarios } from '../context/UsuarioContext'
import { formatoPrecio } from '../utils/formatoPrecio'
import { obtenerMensajeError } from '../service/api'
import { useTituloPagina } from '../hooks/useTituloPagina'

function PedidosSonidoVivo() {
  useTituloPagina('Administrar pedidos')
  const { pedidos, cargando, error, eliminar, actualizar, recargar } = usePedidos()
  const { usuarios } = useUsuarios()
  const [edicion, setEdicion] = useState(null)
  const [ocupado, setOcupado] = useState(false)
  const bloqueo = useRef(false)

  async function ejecutar(operacion) {
    if (bloqueo.current) return
    bloqueo.current = true
    setOcupado(true)
    try { await operacion() } catch (err) { toast.error(obtenerMensajeError(err)) }
    finally { bloqueo.current = false; setOcupado(false) }
  }

  function eliminarPedido(pedido) {
    if (!window.confirm(`¿Eliminar el historial del pedido #${pedido.id}? No se repondrá el stock.`)) return
    return ejecutar(async () => {
      await eliminar(pedido.id)
      if (edicion?.id === pedido.id) setEdicion(null)
      toast.success('Pedido eliminado.')
    })
  }

  function guardar(e) {
    e.preventDefault()
    if (!edicion) return
    const direccion = edicion.entrega === 'envio' ? edicion.direccion.trim() : null
    if (edicion.entrega === 'envio' && (!direccion || direccion.length > 500)) {
      toast.error('Indica una dirección válida de hasta 500 caracteres.')
      return
    }
    return ejecutar(async () => {
      await actualizar(edicion.id, { entrega: edicion.entrega, direccion })
      setEdicion(null)
      toast.success('Pedido actualizado.')
    })
  }

  return (
    <Container fluid className="py-4">
      <h1>Administrar pedidos</h1>
      <p>Los pedidos se crean desde el checkout. La eliminación no devuelve stock.</p>
      {cargando && <p role="status">Cargando pedidos...</p>}
      {error && <div role="alert"><p>{obtenerMensajeError(error)}</p><button className="btn btn-outline-primary" onClick={() => recargar().catch(() => {})}>Reintentar</button></div>}
      {!cargando && !error && !pedidos.length && <p>No hay pedidos registrados.</p>}
      <ul className="record-grid">
        {pedidos.map((pedido) => {
          const usuario = usuarios.find((u) => u.id === pedido.usuarioId)
          return <li className="list-group-item record-grid__item" key={pedido.id}>
            <strong>Pedido #{pedido.id}</strong> — {usuario?.nombre || `Usuario ${pedido.usuarioId}`}
            <p className="mb-1">{pedido.nombre} · {formatoPrecio(pedido.total)}</p>
            <small>{pedido.entrega === 'envio' ? `Envío: ${pedido.direccion}` : 'Retiro en tienda'}</small>
            {edicion?.id === pedido.id ? (
              <form onSubmit={guardar} className="mt-3">
                <label className="form-label" htmlFor={`entrega-${pedido.id}`}>Entrega</label>
                <select id={`entrega-${pedido.id}`} className="form-select" disabled={ocupado} value={edicion.entrega} onChange={(e) => setEdicion({ ...edicion, entrega: e.target.value })}>
                  <option value="retiro">Retiro en tienda</option>
                  <option value="envio">Envío a domicilio</option>
                </select>
                {edicion.entrega === 'envio' && <><label className="form-label mt-2" htmlFor={`direccion-${pedido.id}`}>Dirección</label><input id={`direccion-${pedido.id}`} className="form-control" maxLength={500} disabled={ocupado} value={edicion.direccion} onChange={(e) => setEdicion({ ...edicion, direccion: e.target.value })} /></>}
                <div className="d-flex flex-wrap gap-2 mt-2"><button className="btn btn-primary btn-sm" disabled={ocupado}>Guardar</button><button type="button" className="btn btn-outline-secondary btn-sm" disabled={ocupado} onClick={() => setEdicion(null)}>Cancelar</button></div>
              </form>
            ) : <div className="d-flex flex-wrap gap-2 mt-2"><button className="btn btn-outline-primary btn-sm" disabled={ocupado} onClick={() => setEdicion({ id: pedido.id, entrega: pedido.entrega, direccion: pedido.direccion ?? '' })}>Editar entrega</button><button className="btn btn-outline-danger btn-sm" disabled={ocupado} onClick={() => eliminarPedido(pedido)}>Eliminar historial</button></div>}
          </li>
        })}
      </ul>
    </Container>
  )
}

export default PedidosSonidoVivo