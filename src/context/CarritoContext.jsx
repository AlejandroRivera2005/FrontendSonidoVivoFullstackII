import { createContext, useContext, useEffect, useRef, useState } from 'react'

import { useProductosOpcional } from './ProductosContext'

const CarritoContext = createContext(null)

const clave = 'carrito_v2'

function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(clave))
    if (!Array.isArray(guardado)) return []
    return guardado.filter(
      (i) => i && i.producto && i.producto.id !== undefined && Number.isInteger(i.cantidad) && i.cantidad > 0,
    )
  } catch {
    return []
  }
}

function puedeAgregarMas(producto, cantidadActual) {
  if (typeof producto.stock !== 'number') return true
  return cantidadActual < producto.stock
}

export function ProveedorCarrito(props) {
  const [items, setItems] = useState(leerCarrito)
  const referencia = useRef(items)
  const catalogo = useProductosOpcional()

  function cambiar(operacion) {
    const nuevo = operacion(referencia.current)
    referencia.current = nuevo
    setItems(nuevo)
  }

  useEffect(() => {
    try { localStorage.setItem(clave, JSON.stringify(items)) } catch {}
  }, [items])

  useEffect(() => {
    if (!catalogo || catalogo.cargando || catalogo.error) return
    cambiar((actual) => actual.map((item) => ({ ...item, producto: catalogo.productos.find((p) => p.id === item.producto.id) ?? { ...item.producto, stock: 0 } })))
  }, [catalogo?.productos, catalogo?.cargando, catalogo?.error])

  function add(producto) {
    const vigente = catalogo && !catalogo.cargando && !catalogo.error ? catalogo.productos.find((p) => p.id === producto.id) : producto
    if (!vigente) return false
    const existente = referencia.current.find((i) => i.producto.id === vigente.id)
    if (!puedeAgregarMas(vigente, existente?.cantidad ?? 0)) return false
    cambiar((actual) => existente ? actual.map((i) => i.producto.id === vigente.id ? { producto: vigente, cantidad: i.cantidad + 1 } : i) : [...actual, { producto: vigente, cantidad: 1 }])
    return true
  }

  function remove(id) {
    cambiar((actual) => actual.filter((i) => i.producto.id !== id))
  }

  function increment(id) {
    cambiar((actual) => actual.map((i) => i.producto.id === id && puedeAgregarMas(i.producto, i.cantidad) ? { ...i, cantidad: i.cantidad + 1 } : i))
  }

  function vaciar() {
    cambiar(() => [])
  }

  const totalItems = items.reduce((suma, i) => suma + i.cantidad, 0)
  const totalPrecio = items.reduce((suma, i) => suma + i.producto.precio * i.cantidad, 0)

  const valor = { items, add, remove, increment, vaciar, totalItems, totalPrecio }

  return <CarritoContext.Provider value={valor}>{props.children}</CarritoContext.Provider>
}

export function useCart() {
  const contexto = useContext(CarritoContext)
  if (!contexto) {
    throw new Error('useCart debe usarse dentro de un ProveedorCarrito')
  }
  return contexto
}