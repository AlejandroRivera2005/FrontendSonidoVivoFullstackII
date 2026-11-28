import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import AutorizacionRuta from './utils/AutorizacionRuta'

import { ProductosProvider } from './context/ProductosContext'
import { ProveedorCarrito } from './context/CarritoContext'
import { PedidosProvider } from './context/PedidoContext'
import { UsuariosProvider } from './context/UsuarioContext'
import { SesionProvider } from './context/SesionContext'

import SiteLayoutTemplate from './components/templates/SiteLayoutTemplate'

import InicioPage from './pages/InicioPage'
import QuienesSomosPage from './pages/QuienesSomosPage'
import BlogsPage from './pages/BlogsPage'
import LoginPage from './pages/LoginPage'
import RegistroPage from './pages/RegistroPage'
import StaffLoginPage from './pages/StaffLoginPage'
import ContactoPage from './pages/ContactoPage'
import CatalogoPage from './pages/CatalogoPage'
import CheckoutPage from './pages/CheckoutPage'
import DetalleProductoPage from './pages/DetalleProductoPage'
import Error404Page from './pages/Error404'
import AdminSonidoVivo from './pages/AdminSonidoVivo'
import PedidosSonidoVivo from './pages/PedidosSonidoVivo'
import ContactosSonidoVivo from './pages/ContactosSonidoVivo'
import UsuariosSonidoVivo from './pages/UsuariosSonidoVivo'
import DetalleBlog from './pages/DetalleBlog'
import MisPedidosPage from './pages/MisPedidosPage'

function App() {
  return (
    <BrowserRouter>
      <ProductosProvider>
        <SesionProvider>
          <PedidosProvider>
            <UsuariosProvider>
              <ProveedorCarrito>
                <Routes>

                  <Route
                    element={
                      <SiteLayoutTemplate />
                    }
                  >
                    <Route
                      path="/"
                      element={<InicioPage />}
                    />

                    <Route
                      path="/quienessomos"
                      element={<QuienesSomosPage />}
                    />

                    <Route
                      path="/blogs"
                      element={<BlogsPage />}
                    />

                    <Route
                      path="/blogs/categoria/:nombre"
                      element={<BlogsPage />}
                    />

                    <Route
                      path="/blogs/buscar/:texto"
                      element={<BlogsPage />}
                    />

                    <Route
                      path="/blog/:id"
                      element={<DetalleBlog />}
                    />

                    <Route
                      path="/login"
                      element={<LoginPage />}
                    />

                    <Route
                      path="/registro"
                      element={<RegistroPage />}
                    />

                    <Route
                      path="/staff-login"
                      element={<StaffLoginPage />}
                    />

                    <Route
                      path="/contacto"
                      element={<ContactoPage />}
                    />

                    <Route
                      path="/producto/:id"
                      element={<DetalleProductoPage />}
                    />

                    <Route
                      path="/catalogo"
                      element={<CatalogoPage />}
                    />

                    <Route
                      path="/categoria/:nombre"
                      element={<CatalogoPage />}
                    />

                    <Route
                      path="/buscar/:texto"
                      element={<CatalogoPage />}
                    />

                    <Route element={<AutorizacionRuta />}>
                      <Route
                        path="/checkout"
                        element={<CheckoutPage />}
                      />

                      <Route
                        path="/mis-pedidos"
                        element={<MisPedidosPage />}
                      />
                    </Route>

                    <Route
                      path="*"
                      element={<Error404Page />}
                    />
                  </Route>

                  <Route
                    element={<AutorizacionRuta admin />}
                  >
                    <Route
                      element={
                        <SiteLayoutTemplate admin />
                      }
                    >
                      <Route
                        path="/admin"
                        element={<AdminSonidoVivo />}
                      />

                      <Route
                        path="/pedidos"
                        element={<PedidosSonidoVivo />}
                      />

                      <Route
                        path="/usuarios"
                        element={<UsuariosSonidoVivo />}
                      />

                      <Route path="/contactos" element={<ContactosSonidoVivo />} />
                    </Route>
                  </Route>

                </Routes>

                <ToastContainer />
              </ProveedorCarrito>
            </UsuariosProvider>
          </PedidosProvider>
        </SesionProvider>
      </ProductosProvider>
    </BrowserRouter>
  )
}

export default App