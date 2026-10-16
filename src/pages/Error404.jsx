import { useNavigate } from 'react-router-dom'

import { Boton} from '../components/atoms/boton/Boton'
import { useTituloPagina } from '../hooks/useTituloPagina'

export default function NoEncontrada() {
  const navigate = useNavigate()
  useTituloPagina('Página no encontrada')

  return (
    <div className="container mt-4">
      <h1>404</h1>
      <p>La página que estás buscando no existe o ha sido movida.</p>
      <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
    </div>
  )
}