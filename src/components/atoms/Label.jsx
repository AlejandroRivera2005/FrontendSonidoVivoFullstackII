function Label({ htmlFor, texto, className = "form-label fw-semibold" }) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {texto}
    </label>
  );
}

export default Label;