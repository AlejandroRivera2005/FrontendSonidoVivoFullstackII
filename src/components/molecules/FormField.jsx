import Label from '../atoms/Label';
import Input from '../atoms/Input';

function FormField(props) {
  return (
    <div className="campo-formulario">
      <Label texto={props.labelTexto} htmlFor={props.id} />
      <Input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

export default FormField;