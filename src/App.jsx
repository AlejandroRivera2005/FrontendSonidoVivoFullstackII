import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/organisms/Navbar"; 
import LoginPage from "./pages/LoginPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import CatalogoPage from "./pages/CatalogoPage";
import InicioPage from "./pages/InicioPage";
import QuienesSomosPage from "./pages/QuienesSomosPage";
import BlogsPage from "./pages/BlogsPage"

const articulos = [
  { id: 1, nombre: "Guitarra", precio: "$40000" },
  { id: 2, nombre: "Piano", precio: "$50000" },
  { id: 3, nombre: "Batería", precio: "$430000" },
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
          <Route path="/blogs" element={<BlogsPage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          <Route path="/catalogo" element={<CatalogoPage articulos={articulos} />} />
        </Routes>
      </main>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;