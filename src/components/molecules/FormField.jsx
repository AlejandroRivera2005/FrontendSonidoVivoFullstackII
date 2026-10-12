import Label from '../atoms/Label';
import Input from '../atoms/Input';
import MensajeError from '../atoms/MensajeError';

function FormField({ label, type = "text", name, value, onChange, placeholder, error, ...rest }) {
  return (
    <div className="mb-3">
      {label && <Label texto={label} htmlFor={name} />}
      <Input
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "is-invalid" : ""}
        {...rest}
      />
      <MensajeError mensaje={error} />
    </div>
  );
}

export default FormField;