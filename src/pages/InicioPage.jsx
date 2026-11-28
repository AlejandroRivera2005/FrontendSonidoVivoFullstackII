import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/boton/Boton';
import { useTituloPagina } from '../hooks/useTituloPagina';

function InicioPage() {
  const navigate = useNavigate();
  useTituloPagina('Inicio');

  return (
    <div className="home-container home-container--centrado">
      <h1>¡Bienvenid@ a Sonido Vivo!</h1>
      <p>La mejor tienda de música dentro de la quinta región.</p>
      <div className="home-container__acciones">
        <Boton
          label="Explorar catálogo"
          variant="primary"
          onClick={() => navigate('/catalogo')}
        />
      </div>
    </div>
  );
}

export default InicioPage;