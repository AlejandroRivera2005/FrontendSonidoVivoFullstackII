import Label from '../atoms/Label';
import Input from '../atoms/Input';

function FormField({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="mb-3">
      {label && <Label text={label} />}
      <Input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default FormField;