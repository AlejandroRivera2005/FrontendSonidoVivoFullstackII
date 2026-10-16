import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuPageTemplate from "../components/templates/MenuPageTemplate";
import Articulo from "../components/molecules/Articulo";
import FiltroCategorias from "../components/molecules/FiltroCategorias";
import Boton from "../components/atoms/boton/Boton";
import Input from "../components/atoms/Input";
import { useProductos } from "../context/ProductosContext";
import { useCart } from "../context/CarritoContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function filtrarProductos(productos, { texto, categoria }) {
  const buscado = normalizar(texto);
  const cat = normalizar(categoria);

  return productos.filter((p) => {
    const coincideCategoria = !cat || normalizar(p.categoria) === cat;
    const coincideTexto =
      !buscado ||
      normalizar(`${p.nombre} ${p.descripcion} ${p.categoria}`).includes(buscado);
    return coincideCategoria && coincideTexto;
  });
}


function CatalogoPage() {
  const navigate = useNavigate();
  const params = useParams();
  const nombre = params.nombre ?? "";
  const texto = params.texto ?? "";

  const productosCtx = useProductos();
  const carrito = useCart();

  const [busqueda, setBusqueda] = useState(texto);
  useEffect(() => {
    setBusqueda(texto);
  }, [texto]);

  const visibles = filtrarProductos(productosCtx.productos, { texto, categoria: nombre });
  const categorias = [...new Set(productosCtx.productos.map((p) => p.categoria))];

  const categoriaActiva = categorias.find((c) => normalizar(c) === normalizar(nombre)) ?? nombre;

  let titulo = "Catálogo completo";
  if (nombre) titulo = categoriaActiva;
  if (texto) titulo = `Resultados para "${texto}"`;
  useTituloPagina(titulo);

  const verProducto = (producto) => {
    navigate(`/producto/${producto.id}`);
  };

  const seleccionarCategoria = (categoria) => {
    if (categoria === "Todas") navigate("/catalogo");
    else navigate(`/categoria/${encodeURIComponent(categoria)}`);
  };

  const buscar = (e) => {
    e.preventDefault();
    const limpio = busqueda.trim();
    if (limpio) navigate(`/buscar/${encodeURIComponent(limpio)}`);
    else navigate("/catalogo");
  };

  const botonCheckout = (
    <Boton
      label={`Ir al Checkout (${carrito.totalItems})`}
      variant="success"
      onClick={() => navigate("/checkout")}
    />
  );

  const componenteFiltros = (
    <div className="d-flex flex-column gap-3">
      <form onSubmit={buscar} role="search" className="d-flex gap-2">
        <Input
          id="busqueda"
          name="busqueda"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar productos..."
          aria-label="Buscar productos"
        />
        <Boton label="Buscar" variant="primary" type="submit" />
      </form>

      <FiltroCategorias
        categorias={categorias}
        categoriaSeleccionada={nombre ? categoriaActiva : "Todas"}
        onSeleccionar={seleccionarCategoria}
      />
    </div>
  );

  return (
    <MenuPageTemplate
      titulo={titulo}
      descripcion="Explora nuestros productos organizados por categoría."
      filtros={componenteFiltros}
      acciones={botonCheckout}
      items={visibles}
      renderItem={(producto) => (
        <Articulo producto={producto} onVer={verProducto} />
      )}
    />
  );
}

export default CatalogoPage;