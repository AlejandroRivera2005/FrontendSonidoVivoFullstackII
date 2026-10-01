import { useNavigate } from 'react-router-dom';
import Boton from '../atoms/Boton';

function NavMenu({ menuItems }) {
  const navigate = useNavigate();
  const items = menuItems || [];

  return (
    <div className="d-flex justify-content-center justify-content-md-end align-items-center flex-wrap gap-2">
      {items.map((item, index) => (
        <Boton
          key={index}
          label={item.label}
          variant={item.variant || "text"}
          onClick={() => navigate(item.path)}
        />
      ))}
    </div>
  );
}

export default NavMenu;