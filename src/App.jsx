import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProductosProvider } from "./context/ProductosContext";
import { ProveedorCarrito } from "./context/CarritoContext";
import Navbar from "./components/organisms/Navbar";
import Footer from "./components/organisms/Footer";
import InicioPage from "./pages/InicioPage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import BlogsPage from "./pages/BlogsPage";
import LoginPage from "./pages/LoginPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import ContactoPage from "./pages/ContactoPage";
import CatalogoPage from "./pages/CatalogoPage";
import CheckoutPage from "./pages/CheckoutPage";

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
  { label: "STAFF", path: "/staff-login", variant: "text" },
];

function App() {
  return (
    <BrowserRouter>
      <ProductosProvider>
        <ProveedorCarrito>
          <Navbar brandName="Sonido Vivo" menuItems={navigationConfig} />
          <main style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/quienessomos" element={<QuienesSomosPage />} />
              <Route path="/blogs" element={<BlogsPage publicaciones={publicaciones} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/staff-login" element={<StaffLoginPage />} />
              <Route path="/contacto" element={<ContactoPage />} />

              <Route path="/catalogo" element={<CatalogoPage />} />
              <Route path="/categoria/:nombre" element={<CatalogoPage />} />
              <Route path="/buscar/:texto" element={<CatalogoPage />} />

              <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </ProveedorCarrito>
      </ProductosProvider>
    </BrowserRouter>
  );
}

export default App;