import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar"; 
import LoginPage from "./pages/LoginPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import CatalogoPage from "./pages/CatalogoPage";

const articulos = [
  { id: 1, nombre: "Guitarra", precio: "$40000" },
  { id: 2, nombre: "Piano", precio: "$50000" },
  { id: 3, nombre: "Batería", precio: "$430000" },
];

const articulos2 = [
  { id: 1, nombre: "Bajo 1", precio: "$40000" },
  { id: 2, nombre: "Bajo 2", precio: "$50000" },
  { id: 3, nombre: "Bajo 3", precio: "$430000" },
];

function App() {
  const navigationConfig = [
    { label: 'Catálogo', path: '/catalogo', variant: 'text' },
    { label: 'Iniciar sesión', path: '/login', variant: 'text' },
    { label: 'STAFF', path: '/staff-login', variant: 'primary' }
  ];

  return (
    <BrowserRouter>
      <Navbar brandName="Sonido Vivo" menuItems={navigationConfig} />
      <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/staff-login" element={<StaffLoginPage />} />
          <Route path="/catalogo" element={<CatalogoPage articulos={articulos} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;