import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import * as productoService from '../service/productoService'

const ProductosContext = createContext(null)

export function ProductosProvider(props) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const secuencia = useRef(0)

  const recargar = useCallback(async (signal) => {
    const actual = ++secuencia.current
    const vigente = () => actual === secuencia.current && !signal?.aborted
    setCargando(true)
    setError(null)
    try {
      const lista = await productoService.listarProductos(signal)
      if (vigente()) setProductos(lista)
      return lista
    } catch (err) {
      if (vigente()) setError(err)
      throw err
    } finally {
      if (vigente()) setCargando(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    recargar(controller.signal).catch(() => {})
    return () => { controller.abort(); secuencia.current += 1 }
  }, [recargar])

  function invalidarCarga() {
    secuencia.current += 1
    setCargando(false)
  }

  async function crear(datos) {
    const producto = await productoService.crearProducto(datos)
    invalidarCarga()
    setProductos((actual) => [...actual.filter((p) => p.id !== producto.id), producto])
    return producto
  }

  async function actualizar(id, cambios) {
    const producto = await productoService.actualizarProducto(id, cambios)
    invalidarCarga()
    setProductos((actual) => actual.some((p) => p.id === id) ? actual.map((p) => p.id === id ? producto : p) : [...actual, producto])
    return producto
  }

  async function eliminar(id) {
    await productoService.eliminarProducto(id)
    invalidarCarga()
    setProductos((actual) => actual.filter((p) => p.id !== id))
  }

  return <ProductosContext.Provider value={{ productos, cargando, error, recargar, crear, actualizar, eliminar }}>{props.children}</ProductosContext.Provider>
}

export function useProductosOpcional() {
  return useContext(ProductosContext)
}

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  return contexto
}