import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import FooterAdmin from "../organisms/FooterAdmin";

function AdminLayoutTemplate(props) {
  return (
    <>
      <Navbar brandName="Sonido Vivo · Admin" brandPath="/admin" menuItems={props.menuItems} />
      <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Outlet />
      </main>
      <FooterAdmin />
    </>
  );
}

export default AdminLayoutTemplate;