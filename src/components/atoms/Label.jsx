function Label(props) {
  return (
    <label htmlFor={props.htmlFor} className={props.className}>
      {props.texto}
    </label>
  );
}

export default Label;
