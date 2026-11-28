import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} Sonido Vivo. Todos los derechos reservados.</p>
        {!props.admin && (
          <nav className="footer-menu" aria-label="Información de la tienda">
            <Link to="/quienessomos">Quiénes somos</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
        )}
      </div>
    </footer>
  );
}

export default Footer;