import { Container } from 'react-bootstrap'
import { api, obtenerMensajeError } from '../service/api'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useSesion } from '../context/SesionContext'
import { useListaProtegida } from '../hooks/useListaProtegida'

async function cargar(signal) {
  const respuesta = await api.get('/contacto', { signal })
  return respuesta.data
}

export default function ContactosSonidoVivo() {
  useTituloPagina('Mensajes de contacto')
  const sesion = useSesion()
  const clave = !sesion.verificando && sesion.usuario?.rol === 'admin' ? sesion.token : null
  const { lista: mensajes, error, cargando, recargar } = useListaProtegida(clave, cargar)

  return <Container fluid className="py-4">
    <h1>Mensajes de contacto</h1>
    <p>Últimos 100 mensajes recibidos desde la tienda.</p>
    <button className="btn btn-outline-primary mb-3" disabled={cargando} onClick={() => recargar().catch(() => {})}>Actualizar</button>
    {cargando ? <p role="status">Cargando mensajes...</p> : error ? <p role="alert">{obtenerMensajeError(error)}</p> : mensajes.length ? <ul className="record-grid">{mensajes.map((mensaje) => <li key={mensaje.id} className="record-grid__item list-group-item text-break"><strong>{mensaje.nombre}</strong><p className="mb-1">{mensaje.email}</p><p>{mensaje.mensaje}</p><small>{new Date(mensaje.creado_en).toLocaleString('es-CL')}</small></li>)}</ul> : <p>No hay mensajes registrados.</p>}
  </Container>
}