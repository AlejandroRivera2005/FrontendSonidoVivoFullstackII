import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuPageTemplate from "../components/templates/MenuPageTemplate";
import Articulo from "../components/molecules/Articulo";
import FiltroCategorias from "../components/molecules/FiltroCategorias";
import Boton from "../components/atoms/Boton";

const CATEGORIAS = [
  "Guitarras",
  "Bajos",
  "Teclados y pianos",
  "Baterías",
  "Equipo de Sonido",
];

function CatalogoPage({ productos = [] }) {
  const navigate = useNavigate();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito");
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
    }
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    if (!producto || !producto.id) return;

    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item.id === producto.id);
      if (existe) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });

    if (typeof toast !== "undefined" && toast.success) {
      toast.success(`"${producto.titulo}" agregado al carrito`);
    }
  };

  const totalCantidad = carrito.reduce(
    (acc, item) => acc + (item.cantidad || 1),
    0
  );

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? productos
      : productos.filter((item) => item.categoria === categoriaSeleccionada);

  const botonCheckout = (
    <Boton
      label={`Ir al Checkout (${totalCantidad})`}
      variant="success"
      onClick={() => navigate("/checkout")}
    />
  );

  const componenteFiltros = (
    <FiltroCategorias
      categorias={CATEGORIAS}
      categoriaSeleccionada={categoriaSeleccionada}
      onSeleccionar={setCategoriaSeleccionada}
    />
  );

  return (
    <MenuPageTemplate
      titulo="Catálogo de Productos"
      descripcion="Explora nuestros instrumentos y equipos organizados por categoría."
      filtros={componenteFiltros}
      acciones={botonCheckout}
      items={productosFiltrados}
      renderItem={(producto) => (
        <Articulo
          titulo={producto.titulo}
          precio={producto.precio}
          imagen={producto.imagen}
          onAgregar={() => agregarAlCarrito(producto)}
        />
      )}
    />
  );
}

export default CatalogoPage;