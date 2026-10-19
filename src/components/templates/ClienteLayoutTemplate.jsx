import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function ClienteLayoutTemplate({ menuItems }) {
  return (
    <>
      <Navbar brandName="Sonido Vivo" menuItems={menuItems} />
      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default ClienteLayoutTemplate;