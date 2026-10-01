import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/organisms/Navbar"; 
import LoginPage from "./pages/LoginPage";
import Footer from "./components/organisms/Footer";
import StaffLoginPage from "./pages/StaffLoginPage";
import CatalogoPage from "./pages/CatalogoPage";
import InicioPage from "./pages/InicioPage";
import ContactoPage from "./pages/ContactoPage"
import QuienesSomosPage from "./pages/QuienesSomosPage";
import BlogsPage from "./pages/BlogsPage";
import CheckoutPage from "./pages/CheckoutPage"

const productos = [
    { id: 1, titulo: "Producto 1", precio: 10000, imagen: "/assets/hero.png" },
    { id: 2, titulo: "Producto 2", precio: 15000, imagen: "/assets/hero.png" },
    { id: 3, titulo: "Producto 3", precio: 20000, imagen: "/assets/hero.png" },
    { id: 4, titulo: "Producto 4", precio: 25000, imagen: "/assets/hero.png" },
  ];

  const publicaciones = [
    {
      id: 1,
      titulo: "Novedades de la Semana",
      fecha: "2026-03-20",
      resumen: "Descubre las últimas tendencias e innovaciones de nuestra tienda.",
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


function App() {
  const navigationConfig = [
    { label: 'Inicio', path: '/', variant: 'text' },
    { label: 'Catálogo', path: '/catalogo', variant: 'text' },
    { label: 'Iniciar sesión', path: '/login', variant: 'text' },
    { label: 'STAFF', path: '/staff-login', variant: 'text' }
  ];

  return (
    <BrowserRouter>
      <Navbar brandName="Sonido Vivo" menuItems={navigationConfig} />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<InicioPage/>} />
          <Route path="/quienessomos" element={<QuienesSomosPage/>} />
          <Route path="/blogs" element={<BlogsPage publicaciones={publicaciones} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          <Route path="/catalogo" element={<CatalogoPage productos={productos} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;