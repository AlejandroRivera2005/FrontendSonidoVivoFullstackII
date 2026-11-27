import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import FormPageTemplate from '../components/templates/FormPageTemplate'
import LoginForm from '../components/organisms/LoginForm'

import { useSesion } from '../context/SesionContext'
import { obtenerMensajeError } from '../service/api'
import { useTituloPagina } from '../hooks/useTituloPagina'

function StaffLoginPage() {
  useTituloPagina('Acceso Staff')

  const navigate = useNavigate()
  const sesion = useSesion()

  async function handleStaffLogin(datos) {
    try {
      const usuario = await sesion.iniciarSesion(
        datos.email,
        datos.password
      )

      if (usuario.rol !== 'admin') {
        sesion.cerrarSesion()

        toast.error(
          'Esta cuenta no tiene permisos de administrador.'
        )

        return
      }

      toast.success(
        'Bienvenido al panel de administración.'
      )

      navigate('/admin', {
        replace: true,
      })
    } catch (error) {
      toast.error(obtenerMensajeError(error))
    }
  }

  return (
    <FormPageTemplate
      titulo="Acceso Staff"
      descripcion="Acceso exclusivo para administradores."
    >
      <LoginForm onSubmit={handleStaffLogin} />
    </FormPageTemplate>
  )
}

export default StaffLoginPage