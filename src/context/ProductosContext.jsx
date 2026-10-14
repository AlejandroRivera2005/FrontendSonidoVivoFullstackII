import { createContext, useContext, useState } from 'react'
import * as productoService from '../service/productoService'

const ProductosContext = createContext(null)

export function ProductosProvider(props) {

  const [productos, setProductos] = useState(() => productoService.listarProductos())

  function crear(datos) {
    productoService.crearProducto(datos)
    setProductos(productoService.listarProductos())
  }
  function actualizar(id, cambios) {
    productoService.actualizarProducto(id, cambios)
    setProductos(productoService.listarProductos())
  }
  function eliminar(id) {
    productoService.eliminarProducto(id)
    setProductos(productoService.listarProductos())
  }

  return (
    <ProductosContext.Provider value={{ productos, crear, actualizar, eliminar }}>
      {props.children}
    </ProductosContext.Provider>
  )
}

export function useProductos() {
  const contexto = useContext(ProductosContext)
  if (!contexto) {
    throw new Error('useProductos debe usarse dentro de un ProductosProvider')
  }
  return contexto
}
