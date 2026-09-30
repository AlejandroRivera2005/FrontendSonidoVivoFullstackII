import NavMenu from '../molecules/NavMenu';


function Navbar(props) {
  return (
    <header className="navbar-banner">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>{props.brandName}</h1>
        </div>
        <NavMenu items={props.menuItems} />
      </div>
    </header>
  );
}

export default Navbar;