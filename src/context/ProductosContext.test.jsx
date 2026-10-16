import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ProductosProvider, useProductos } from './ProductosContext'

beforeEach(() => {
  localStorage.clear()
})

function wrapper(props) {
  return <ProductosProvider>{props.children}</ProductosProvider>
}

describe('ProductosContext', () => {
  it('carga la lista inicial de productos', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    expect(result.current.productos.length).toBeGreaterThan(0)
  })

  it('crear agrega un producto y actualiza la lista', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const antes = result.current.productos.length

    act(() => {
      result.current.crear({ nombre: 'Soporte para notebook', precio: 9990 })
    })

    expect(result.current.productos).toHaveLength(antes + 1)
  })

  it('eliminar quita un producto de la lista', () => {
    const { result } = renderHook(() => useProductos(), { wrapper })
    const id = result.current.productos[0].id

    act(() => {
      result.current.eliminar(id)
    })

    expect(result.current.productos.find((p) => p.id === id)).toBeUndefined()
  })
})