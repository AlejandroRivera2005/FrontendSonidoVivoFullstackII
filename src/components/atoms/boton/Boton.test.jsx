import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Boton } from './Boton'

describe('Button', () => {
  it('renderiza el texto que recibe por props', () => {
    render(<Boton>Agregar</Boton>)
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument()
  })

  it('ejecuta onClick una vez cuando se hace clic', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Boton onClick={onClick}>Agregar</Boton>)
    await user.click(screen.getByRole('button', { name: /agregar/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('no ejecuta onClick cuando está deshabilitado', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Boton onClick={onClick} disabled>
        Agregar
      </Boton>,
    )

    const boton = screen.getByRole('button', { name: /agregar/i })
    expect(boton).toBeDisabled()

    await user.click(boton)
    expect(onClick).not.toHaveBeenCalled()
  })
})