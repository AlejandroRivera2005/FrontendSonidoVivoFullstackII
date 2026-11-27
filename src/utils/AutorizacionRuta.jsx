import {
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom'

import { useSesion } from '../context/SesionContext'

export default function AutorizacionRuta(props) {
  const sesion = useSesion()
  const location = useLocation()

  const admin = props.admin || false

  if (sesion.verificando) {
    return (
      <p className="p-4">
        Verificando sesión...
      </p>
    )
  }

  if (!sesion.usuario) {
    return (
      <Navigate
        to={admin ? '/staff-login' : '/login'}
        state={{
          desde: location.pathname,
        }}
        replace
      />
    )
  }

  if (admin && sesion.usuario.rol !== 'admin') {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}