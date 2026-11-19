function Input(props) {
  const type = props.type ?? "text";
  const rows = props.rows ?? 4;

  const propsComunes = {
    ...props,
    className: `form-control ${props.className ?? ""}`.trim(),
  };
  delete propsComunes.type;
  delete propsComunes.rows;

  if (type === "textarea") {
    return <textarea rows={rows} {...propsComunes} />;
  }

  return <input type={type} {...propsComunes} />;
}

export default Input;