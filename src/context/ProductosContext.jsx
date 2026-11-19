import { createContext, useContext, useEffect, useState } from 'react'
import * as productoService from '../service/productoService'

const ProductosContext = createContext(null)

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  async function recargar() {
    const lista = await productoService.listarProductos()
    setProductos(lista)
    setError(null)
    return lista
  }

  useEffect(() => {
    const controller = new AbortController()
    productoService.listarProductos(controller.signal)
      .then(setProductos)
      .catch((err) => { if (err.code !== 'ERR_CANCELED') setError(err) })
      .finally(() => { if (!controller.signal.aborted) setCargando(false) })
    return () => controller.abort()
  }, [])

  async function crear(datos) {
    const producto = await productoService.crearProducto(datos)
    setProductos((actual) => [...actual, producto])
    return producto
  }

  async function actualizar(id, cambios) {
    const producto = await productoService.actualizarProducto(id, cambios)
    setProductos((actual) => actual.map((p) => p.id === id ? producto : p))
    return producto
  }

  async function eliminar(id) {
    await productoService.eliminarProducto(id)
    setProductos((actual) => actual.filter((p) => p.id !== id))
  }

  return <ProductosContext.Provider value={{ productos, cargando, error, recargar, crear, actualizar, eliminar }}>{children}</ProductosContext.Provider>
}

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  return contexto
}