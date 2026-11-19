import Label from '../atoms/Label';
import Input from '../atoms/Input';
import MensajeError from '../atoms/MensajeError';

function FormField(props) {
  const type = props.type ?? "text";

  const extras = { ...props };
  ["label", "type", "name", "value", "onChange", "placeholder", "error"].forEach(
    (clave) => delete extras[clave]
  );

  return (
    <div className="mb-3">
      {props.label && <Label texto={props.label} htmlFor={props.name} />}
      <Input
        id={props.name}
        type={type}
        name={props.name}
        value={props.value ?? ""}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.error ? "is-invalid" : ""}
        {...extras}
      />
      <MensajeError mensaje={props.error} />
    </div>
  );
}

export default FormField;