import { useNavigate } from 'react-router-dom';
import Boton from '../atoms/Boton';

function NavMenu(props) {
  const navigate = useNavigate();

  return (
    <nav className="nav-menu">
      {props.items.map((item, index) => (
        <Boton
          key={index}
          label={item.label}
          variant={item.variant}
          onClick={() => navigate(item.path)}
        />
      ))}
    </nav>
  );
}

export default NavMenu;