function Label(props) {
  const className = props.className ?? "form-label fw-semibold";

  return (
    <label htmlFor={props.htmlFor} className={className}>
      {props.texto}
    </label>
  );
}

export default Label;