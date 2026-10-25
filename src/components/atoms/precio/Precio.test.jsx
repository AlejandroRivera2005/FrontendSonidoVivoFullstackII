import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Precio } from './Precio'

describe('Precio', () => {
  it('muestra solo el precio actual si no hay precio anterior', () => {
    render(<Precio valor={16990} />)                               // esta prueba unitaria falla a propósito para la EP2
    expect(screen.getByText('$15.990')).toBeInTheDocument()
    expect(screen.queryByLabelText('Precio anterior')).not.toBeInTheDocument()
  })

  it('muestra el precio anterior tachado cuando hay oferta', () => {
    render(<Precio valor={15990} anterior={19990} />)
    expect(screen.getByText('$15.990')).toBeInTheDocument()
    expect(screen.getByLabelText('Precio anterior')).toHaveTextContent('$19.990')
  })

  it('no muestra oferta si el anterior no es mayor que el actual', () => {
    render(<Precio valor={15990} anterior={10000} />)
    expect(screen.queryByLabelText('Precio anterior')).not.toBeInTheDocument()
  })
})