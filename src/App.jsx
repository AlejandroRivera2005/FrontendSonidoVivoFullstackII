import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductosProvider } from "./context/ProductosContext";
import { ProveedorCarrito } from "./context/CarritoContext";
import { PedidosProvider } from "./context/PedidoContext";
import { UsuariosProvider } from "./context/UsuarioContext";
import ClienteLayoutTemplate from "./components/templates/ClienteLayoutTemplate";
import AdminLayoutTemplate from "./components/templates/AdminLayoutTemplate";
import InicioPage from "./pages/InicioPage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import BlogsPage from "./pages/BlogsPage";
import LoginPage from "./pages/LoginPage";
import RegistroPage from "./pages/RegistroPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import ContactoPage from "./pages/ContactoPage";
import CatalogoPage from "./pages/CatalogoPage";
import CheckoutPage from "./pages/CheckoutPage";
import DetalleProductoPage from "./pages/DetalleProductoPage";
import Error404Page from "./pages/Error404";
import AdminSonidoVivo from "./pages/AdminSonidoVivo";
import PedidosSonidoVivo from "./pages/PedidosSonidoVivo";
import UsuariosSonidoVivo from "./pages/UsuariosSonidoVivo";

const publicaciones = [
  {
    id: 1,
    titulo: "Novedades de la Semana",
    fecha: "2026-03-20",
    resumen: "Descubre nuestros últimos productos y novedades de nuestra tienda.",
  },
  {
    id: 2,
    titulo: "Guía Práctica de Uso",
    fecha: "2026-03-18",
    resumen: "Consejos y recomendaciones para sacarle el máximo provecho a tus productos.",
  },
  {
    id: 3,
    titulo: "Cuidados y Mantenimiento",
    fecha: "2026-03-15",
    resumen: "Aprende cómo alargar la vida útil de tus compras con estos sencillos pasos.",
  },
];

const navigationConfig = [
  { label: "Inicio", path: "/", variant: "text" },
  { label: "Catálogo", path: "/catalogo", variant: "text" },
  { label: "Iniciar sesión", path: "/login", variant: "text" },
  { label: "Registrarse", path: "/registro", variant: "text" },
  { label: "STAFF", path: "/staff-login", variant: "text" },
];

const navigationAdminConfig = [
  { label: "Productos", path: "/admin", variant: "text" },
  { label: "Pedidos", path: "/pedidos", variant: "text" },
  { label: "Usuarios", path: "/usuarios", variant: "text" },
];

function App() {
  return (
    <BrowserRouter>
      <ProductosProvider>
      <PedidosProvider>
      <UsuariosProvider>
        <ProveedorCarrito>
          <Routes>
            <Route element={<ClienteLayoutTemplate menuItems={navigationConfig} />}>
              <Route path="/" element={<InicioPage />} />
              <Route path="/quienessomos" element={<QuienesSomosPage />} />
              <Route path="/blogs" element={<BlogsPage publicaciones={publicaciones} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RegistroPage />} />
              <Route path="/staff-login" element={<StaffLoginPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/producto/:id" element={<DetalleProductoPage />} />
              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/categoria/:nombre" element={<CatalogoPage />} />
              <Route path="/buscar/:texto" element={<CatalogoPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<Error404Page />} />
            </Route>

            <Route element={<AdminLayoutTemplate menuItems={navigationAdminConfig} />}>
              <Route path="/admin" element={<AdminSonidoVivo />} />
              <Route path="/pedidos" element={<PedidosSonidoVivo />} />
              <Route path="/usuarios" element={<UsuariosSonidoVivo />} />
            </Route>
          </Routes>
          <ToastContainer />
        </ProveedorCarrito>
      </UsuariosProvider>
      </PedidosProvider>
      </ProductosProvider>
    </BrowserRouter>
  );
}

export default App;