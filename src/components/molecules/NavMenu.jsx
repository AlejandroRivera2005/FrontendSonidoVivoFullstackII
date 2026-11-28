import { NavLink } from "react-router-dom";

function NavMenu(props) {
  const items = props.menuItems || [];

  return (
    <nav className="nav-menu" aria-label="Navegación principal">
      {items.map((item) => {
        const clase = `nav-menu-link${item.destacado ? " nav-menu-link--destacado" : ""}`;

        return item.onClick ? (
          <button key={item.label} type="button" className={clase} onClick={() => { props.onNavigate?.(); item.onClick(); }}>
            {item.label}
          </button>
        ) : (
          <NavLink key={item.path} to={item.path} end={item.path === "/"} className={clase} onClick={props.onNavigate}>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}

export default NavMenu;