import MenuPageTemplate from "../components/templates/MenuPageTemplate";

function BlogsPage({ publicaciones = [] }) {
  return (
    <MenuPageTemplate
      titulo="Blog y Noticias"
      descripcion="Entérate de las últimas novedades, guías y publicaciones de interés."
      items={publicaciones}
      renderItem={(post) => (
        <div className="p-4 border rounded shadow-sm bg-white h-100 d-flex flex-column justify-content-between">
          <div>
            <h5 className="fw-bold mb-1">{post.titulo}</h5>
            <small className="text-muted d-block mb-3">{post.fecha}</small>
            <p className="text-secondary small mb-0">{post.resumen}</p>
          </div>
        </div>
      )}
    />
  );
}

export default BlogsPage;