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
    { id: 1, titulo: "Guitarra Eléctrica Stratocaster", precio: 350000, categoria: "Guitarras", imagen: "/assets/hero.png" },
    { id: 2, titulo: "Guitarra Acústica Dreadnought", precio: 180000, categoria: "Guitarras", imagen: "/assets/hero.png" },

    { id: 3, titulo: "Bajo Eléctrico Jazz Bass 4 Cuerdas", precio: 290000, categoria: "Bajos", imagen: "/assets/hero.png" },
    { id: 4, titulo: "Bajo Activo 5 Cuerdas", precio: 420000, categoria: "Bajos", imagen: "/assets/hero.png" },

    { id: 5, titulo: "Teclado Sintetizador 61 Teclas", precio: 250000, categoria: "Teclados y pianos", imagen: "/assets/hero.png" },
    { id: 6, titulo: "Piano Digital 88 Teclas Contrapesadas", precio: 680000, categoria: "Teclados y pianos", imagen: "/assets/hero.png" },

    { id: 7, titulo: "Batería Acústica 5 Piezas", precio: 520000, categoria: "Baterías", imagen: "/assets/hero.png" },
    { id: 8, titulo: "Batería Electrónica Malla", precio: 450000, categoria: "Baterías", imagen: "/assets/hero.png" },

    { id: 9, titulo: "Amplificador de Guitarra 50W", precio: 190000, categoria: "Equipo de Sonido", imagen: "/assets/hero.png" },
    { id: 10, titulo: "Interfaz de Audio USB 2x2", precio: 120000, categoria: "Equipo de Sonido", imagen: "/assets/hero.png" },
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