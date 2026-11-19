function Selector(props) {
  return (
    <select
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className="form-select p-2 border rounded"
    >
      {props.options && props.options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Selector;