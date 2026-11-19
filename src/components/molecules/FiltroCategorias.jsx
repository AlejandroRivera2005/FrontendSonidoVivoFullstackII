import Boton from "../atoms/boton/Boton";

function FiltroCategorias(props) {
  const categorias = props.categorias ?? [];
  const categoriaSeleccionada = props.categoriaSeleccionada ?? "Todas";

  return (
    <div className="d-flex flex-wrap gap-2">
      <Boton
        label="Todas las categorías"
        variant={categoriaSeleccionada === "Todas" ? "primary" : "outline-primary"}
        onClick={() => props.onSeleccionar && props.onSeleccionar("Todas")}
      />
      {categorias.map((cat) => (
        <Boton
          key={cat}
          label={cat}
          variant={categoriaSeleccionada === cat ? "primary" : "outline-primary"}
          onClick={() => props.onSeleccionar && props.onSeleccionar(cat)}
        />
      ))}
    </div>
  );
}

export default FiltroCategorias;