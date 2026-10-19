import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MenuPageTemplate from "../components/templates/MenuPageTemplate";
import EntradaBlog from "../components/molecules/EntradaBlog";
import FiltroCategorias from "../components/molecules/FiltroCategorias";
import Boton from "../components/atoms/boton/Boton";
import Input from "../components/atoms/Input";
import blogs from "../data/blogs.json";
import { useTituloPagina } from "../hooks/useTituloPagina";

function normalizar(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function filtrarBlogs(entradas, { texto, categoria }) {
  const buscado = normalizar(texto);
  const cat = normalizar(categoria);

  return entradas.filter((b) => {
    const coincideCategoria = !cat || normalizar(b.categoria) === cat;
    const coincideTexto =
      !buscado ||
      normalizar(`${b.titulo} ${b.resumen} ${b.categoria}`).includes(buscado);
    return coincideCategoria && coincideTexto;
  });
}


function BlogsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const nombre = params.nombre ?? "";
  const texto = params.texto ?? "";

  const [busqueda, setBusqueda] = useState(texto);
  useEffect(() => {
    setBusqueda(texto);
  }, [texto]);

  const visibles = filtrarBlogs(blogs, { texto, categoria: nombre });
  const categorias = [...new Set(blogs.map((b) => b.categoria))];

  const categoriaActiva = categorias.find((c) => normalizar(c) === normalizar(nombre)) ?? nombre;

  let titulo = "Blog y Noticias";
  if (nombre) titulo = categoriaActiva;
  if (texto) titulo = `Resultados para "${texto}"`;
  useTituloPagina(titulo);

  const verEntrada = (entrada) => {
    navigate(`/blog/${entrada.id}`);
  };

  const seleccionarCategoria = (categoria) => {
    if (categoria === "Todas") navigate("/blogs");
    else navigate(`/blogs/categoria/${encodeURIComponent(categoria)}`);
  };

  const buscar = (e) => {
    e.preventDefault();
    const limpio = busqueda.trim();
    if (limpio) navigate(`/blogs/buscar/${encodeURIComponent(limpio)}`);
    else navigate("/blogs");
  };

  const componenteFiltros = (
    <div className="d-flex flex-column gap-3">
      <form onSubmit={buscar} role="search" className="d-flex gap-2">
        <Input
          id="busqueda"
          name="busqueda"
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar publicaciones..."
          aria-label="Buscar publicaciones"
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
      descripcion="Entérate de las últimas novedades, guías y publicaciones de interés."
      filtros={componenteFiltros}
      items={visibles}
      renderItem={(entrada) => (
        <EntradaBlog entrada={entrada} onVer={verEntrada} />
      )}
    />
  );
}

export default BlogsPage;