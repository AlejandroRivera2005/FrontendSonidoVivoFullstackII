import Boton from "../atoms/Boton";

function FiltroCategorias({
  categorias = [],
  categoriaSeleccionada = "Todas",
  onSeleccionar,
}) {
  return (
    <div className="d-flex flex-wrap gap-2">
      <Boton
        label="Todas las categorías"
        variant={categoriaSeleccionada === "Todas" ? "primary" : "outline-primary"}
        onClick={() => onSeleccionar && onSeleccionar("Todas")}
      />
      {categorias.map((cat) => (
        <Boton
          key={cat}
          label={cat}
          variant={categoriaSeleccionada === cat ? "primary" : "outline-primary"}
          onClick={() => onSeleccionar && onSeleccionar(cat)}
        />
      ))}
    </div>
  );
}

export default FiltroCategorias;