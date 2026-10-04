import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuPageTemplate from "../components/templates/MenuPageTemplate";
import Articulo from "../components/molecules/Articulo";
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
      console.error("Error al cargar localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
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

  const cabeceraConFiltros = (
    <div>
      <p className="text-muted mb-3">
        Explora nuestros instrumentos y equipos organizados por categoría.
      </p>
      <div className="d-flex flex-wrap gap-2">
        <button
          className={`btn btn-sm ${
            categoriaSeleccionada === "Todas"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          onClick={() => setCategoriaSeleccionada("Todas")}
        >
          Todas las categorías
        </button>
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            className={`btn btn-sm ${
              categoriaSeleccionada === cat
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setCategoriaSeleccionada(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <MenuPageTemplate
      titulo="Catálogo de Productos"
      descripcion={cabeceraConFiltros}
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