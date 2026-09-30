import { useNavigate } from 'react-router-dom';
import Boton from '../components/atoms/Boton'; // Asegúrate de que la ruta a tu átomo sea correcta

function InicioPage() {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ textAlign: 'center', padding: '40px' }}>
      <h1>¡Bienvenid@ a Sonido Vivo!</h1>
      <p>La mejor tienda de música dentro de la quinta región.</p>


      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <Boton 
          label="¿Quienes somos?" 
          variant="primary" 
          onClick={() => navigate('/quienessomos')} 
        />
        
        <Boton 
          label="Nuestros Blogs" 
          variant="primary" 
          onClick={() => navigate('/blogs')} 
        />
      </div>
    </div>
  );
}

export default InicioPage;