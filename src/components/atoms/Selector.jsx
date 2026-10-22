function Selector({ id, name, value, onChange, options }) {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="form-select p-2 border rounded"
    >
      {options && options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Selector;