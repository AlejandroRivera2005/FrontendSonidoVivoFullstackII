import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import StaffLoginPage from "./pages/StaffLoginPage";
import CatalogoPage from "./pages/CatalogoPage";


const articulos = [
  { id: 1, nombre: "Guitarra", precio: "$40000" },
  { id: 2, nombre: "Piano", precio: "$50000" },
  { id: 3, nombre: "Batería", precio: "$430000" },
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/staff-login" element={<StaffLoginPage />} />
        <Route path="/catalogo" element={<CatalogoPage articulos = {articulos} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;