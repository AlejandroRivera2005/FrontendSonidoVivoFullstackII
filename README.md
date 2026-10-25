# Equipo 3

## Integrantes
- Alejandro Rivera (ale.riverav@duocuc.cl)


## Caso
Sonido Vivo

## Descripción del caso
Tienda de música ubicada en la región de Valparaíso

## Estructura del proyecto
```text
.
├── App.css
├── App.jsx
├── assets
│   ├── hero.png
│   ├── react.svg
│   └── vite.svg
├── components
│   ├── atoms
│   │   ├── Input.jsx
│   │   ├── Label.jsx
│   │   ├── MensajeError.jsx
│   │   ├── Selector.jsx
│   │   ├── boton
│   │   │   ├── Boton.jsx
│   │   │   └── Boton.test.jsx
│   │   └── precio
│   │       ├── Precio.jsx
│   │       └── Precio.test.jsx
│   ├── molecules
│   │   ├── Articulo.jsx
│   │   ├── EntradaBlog.jsx
│   │   ├── FiltroCategorias.jsx
│   │   ├── FormField.jsx
│   │   ├── NavMenu.jsx
│   │   └── carritoitem
│   │       └── CarritoItem.jsx
│   ├── organisms
│   │   ├── Footer.jsx
│   │   ├── FooterAdmin.jsx
│   │   ├── LoginForm.jsx
│   │   ├── Navbar.jsx
│   │   └── RegistroForm.jsx
│   └── templates
│       ├── AdminLayoutTemplate.jsx
│       ├── ClienteLayoutTemplate.jsx
│       ├── FormPageTemplate.jsx
│       └── MenuPageTemplate.jsx
├── context
│   ├── CarritoContext.jsx
│   ├── CarritoContext.test.jsx
│   ├── PedidoContext.jsx
│   ├── ProductosContext.jsx
│   ├── ProductosContext.test.jsx
│   ├── SesionContext.jsx
│   └── UsuarioContext.jsx
├── data
│   ├── blogs.json
│   ├── pedidos.json
│   ├── productos.json
│   └── usuarios.json
├── hooks
│   └── useTituloPagina.js
├── index.css
├── main.jsx
├── pages
│   ├── AdminSonidoVivo.jsx
│   ├── BlogsPage.jsx
│   ├── CatalogoPage.jsx
│   ├── CheckoutPage.jsx
│   ├── ContactoPage.jsx
│   ├── DetalleBlog.jsx
│   ├── DetalleProductoPage.jsx
│   ├── Error404.jsx
│   ├── InicioPage.jsx
│   ├── LoginPage.jsx
│   ├── MisPedidosPage.jsx
│   ├── PedidosSonidoVivo.jsx
│   ├── QuienesSomosPage.jsx
│   ├── RegistroPage.jsx
│   ├── StaffLoginPage.jsx
│   └── UsuariosSonidoVivo.jsx
├── service
│   ├── pedidoService.jsx
│   ├── productoService.jsx
│   ├── sesionService.jsx
│   └── usuarioService.jsx
├── setupTests.js
└── utils
    ├── formatoFecha.js
    ├── formatoPago.js
    ├── formatoPrecio.js
    └── validaciones.js

```

## Tecnologías
- React + Vite
- React Bootstrap
- Toastify
- React router DOM

## Cómo ejecutar el proyecto
Ejecuta estos comandos en el mismo orden:

- npm create vite@latest sonido-vivo -- --template react
- cd sonido-vivo
- npm install react-router-dom bootstrap react-bootstrap react-toastify
- npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

En el documento de cobertura de tests se encuentra el tutorial de cómo configurar los tests unitarios.

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
https://drive.google.com/file/d/1OCjoL4JEdWKS48DAM2iN9XVNLDBjfxiU/view?usp=sharing