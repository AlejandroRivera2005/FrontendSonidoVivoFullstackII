import { Outlet } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import FooterAdmin from "../organisms/FooterAdmin";

function AdminLayoutTemplate(props) {
  return (
    <>
      <Navbar brandName="Sonido Vivo · Admin" brandPath="/admin" menuItems={props.menuItems} />
      <main className="admin-main-content">
        <Outlet />
      </main>
      <FooterAdmin />
    </>
  );
}

export default AdminLayoutTemplate;