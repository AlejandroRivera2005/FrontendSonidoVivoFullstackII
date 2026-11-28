import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { ProductosProvider, useProductos } from './ProductosContext'
import * as servicio from '../service/productoService'

vi.mock('../service/productoService', () => ({ listarProductos: vi.fn(), crearProducto: vi.fn(), actualizarProducto: vi.fn(), eliminarProducto: vi.fn() }))
const inicial = { id: 1, nombre: 'Guitarra', precio: 15990 }
const nuevo = { id: 2, nombre: 'Soporte', precio: 9990 }

beforeEach(() => {
  vi.resetAllMocks()
  servicio.listarProductos.mockResolvedValue([inicial])
})

function wrapper(props) {
  return <ProductosProvider>{props.children}</ProductosProvider>
}

async function montar() {
  const resultado = renderHook(() => useProductos(), { wrapper })
  await waitFor(() => expect(resultado.result.current.cargando).toBe(false))
  return resultado.result
}

describe('ProductosContext', () => {
  it('carga la lista inicial', async () => {
    const result = await montar()
    expect(result.current.productos).toEqual([inicial])
  })

  it('crea un producto', async () => {
    servicio.crearProducto.mockResolvedValue(nuevo)
    const result = await montar()
    await act(async () => { await result.current.crear(nuevo) })
    expect(result.current.productos).toEqual([inicial, nuevo])
  })

  it('actualiza un producto', async () => {
    const actualizado = { ...inicial, precio: 20000 }
    servicio.actualizarProducto.mockResolvedValue(actualizado)
    const result = await montar()
    await act(async () => { await result.current.actualizar(1, { precio: 20000 }) })
    expect(result.current.productos).toEqual([actualizado])
  })

  it('elimina un producto', async () => {
    servicio.eliminarProducto.mockResolvedValue(undefined)
    const result = await montar()
    await act(async () => { await result.current.eliminar(1) })
    expect(result.current.productos).toEqual([])
  })

  it('expone errores de carga', async () => {
    const error = new Error('Sin conexión')
    servicio.listarProductos.mockRejectedValue(error)
    const result = await montar()
    expect(result.current.error).toBe(error)
  })
})