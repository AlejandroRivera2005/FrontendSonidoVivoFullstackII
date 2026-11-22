import { useNavigate } from 'react-router-dom';
import Boton from '../atoms/boton/Boton';

function NavMenu(props) {
  const navigate = useNavigate();
  const items = props.menuItems || [];

  return (
    <div className="d-flex justify-content-center justify-content-md-end align-items-center flex-wrap gap-2">
      {items.map((item, index) => (
        <Boton
          key={item.path || item.label || index}
          label={item.label}
          variant={item.variant || "text"}
          className={item.className || ""}
          onClick={() => (item.onClick ? item.onClick() : navigate(item.path))}
        />
      ))}
    </div>
  );
}

export default NavMenu;