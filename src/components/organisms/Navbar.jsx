import { useState } from "react";
import { Link } from "react-router-dom";
import NavMenu from "../molecules/NavMenu";

function Navbar(props) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  return (
    <header className="navbar-banner">
      <div className="navbar-container">
        {props.admin ? (
          <span className="navbar-brand-link">Sonido Vivo · Admin</span>
        ) : (
          <Link to="/" className="navbar-brand-link" aria-label="Sonido Vivo, inicio" onClick={cerrarMenu}>
            Sonido Vivo
          </Link>
        )}
        <button
          type="button"
          className="navbar-toggle"
          aria-controls="navegacion-principal"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          {menuAbierto ? "Cerrar menú" : "Menú"}
        </button>
        <div id="navegacion-principal" className={`navbar-actions${menuAbierto ? " navbar-actions--open" : ""}`}>
          {props.nombreUsuario && (
            <span className="navbar-user">{props.nombreUsuario}</span>
          )}
          <NavMenu menuItems={props.menuItems} onNavigate={cerrarMenu} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;