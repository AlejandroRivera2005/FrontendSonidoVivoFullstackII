import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProveedorCarrito, useCart } from './CarritoContext'

const guitarra = { id: 1, nombre: 'Guitarra Acústica', precio: 15990 }
const bajo = { id: 2, nombre: 'Bajo Eléctrico', precio: 10000 }

function wrapper(props) {
  return <ProveedorCarrito>{props.children}</ProveedorCarrito>
}

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })
    

  it('agrega productos y calcula cantidad y total correctamente', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(guitarra)
      result.current.add(guitarra)
      result.current.add(bajo)
    })

    expect(result.current.totalItems).toBe(3)
    expect(result.current.totalPrecio).toBe(41980)
  })

  it('remove quita el producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(guitarra)
      result.current.remove(guitarra.id)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('increment suma una unidad más al producto', () => {
    const { result } = renderHook(() => useCart(), { wrapper })

    act(() => {
      result.current.add(guitarra)
      result.current.increment(guitarra.id)
    })

    expect(result.current.totalItems).toBe(2)
  })

  it('useCart lanza un error si se usa fuera de un ProveedorCarrito', () => {
    expect(() => renderHook(() => useCart())).toThrow(/ProveedorCarrito/)
  })
})