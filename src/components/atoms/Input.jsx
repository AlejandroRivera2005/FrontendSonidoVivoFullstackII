function Input(props) {
  return (
    <input
      id={props.id}
      type={props.type || 'text'}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      className={props.className}
      required={props.required}
    />
  );
}

export default Input;