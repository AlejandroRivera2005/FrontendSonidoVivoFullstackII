function MensajeError({ mensaje, error, text, children }) {
  const contenido = mensaje || error || text || children;

  if (!contenido || typeof contenido !== 'string') {
    return null;
  }

  return (
    <small className="text-danger d-block mt-1 fw-semibold">
      {contenido}
    </small>
  );
}

export default MensajeError;