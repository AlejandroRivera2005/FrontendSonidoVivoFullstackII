import { formatoPrecio } from '../../../utils/formatoPrecio'

export function Precio(props) {
  const anterior = props.anterior ?? null
  const enOferta = anterior !== null && anterior > props.valor

  return (
    <p className="precio mb-2">
      <span className="precio__actual">{formatoPrecio(props.valor)}</span>
      {enOferta && (
        <span className="precio__anterior ms-2" aria-label="Precio anterior">
          <s>{formatoPrecio(anterior)}</s>
        </span>
      )}
    </p>
  )
}