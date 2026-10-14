function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  required,
  rows = 4,
  ...rest
}) {
  const propsComunes = {
    id,
    name,
    value,
    onChange,
    placeholder,
    required,
    className: `form-control ${className}`.trim(),
    ...rest,
  };

  if (type === "textarea") {
    return <textarea rows={rows} {...propsComunes} />;
  }

  return <input type={type} {...propsComunes} />;
}

export default Input;