import { createContext, useContext, useEffect, useState } from 'react'

const CarritoContext = createContext(null)

const CLAVE = 'carrito_v2'

function leerCarrito() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
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

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(items))
    } catch {
    }
  }, [items])

  function add(producto) {
    const existente = items.find((i) => i.producto.id === producto.id)
    if (!puedeAgregarMas(producto, existente ? existente.cantidad : 0)) return false

    setItems((actual) => {
      const encontrado = actual.find((i) => i.producto.id === producto.id)
      if (encontrado) {
        if (!puedeAgregarMas(producto, encontrado.cantidad)) return actual
        return actual.map((i) =>
          i.producto.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i,
        )
      }
      return [...actual, { producto, cantidad: 1 }]
    })
    return true
  }

  function remove(id) {
    setItems((actual) => actual.filter((i) => i.producto.id !== id))
  }

  function increment(id) {
    setItems((actual) =>
      actual.map((i) =>
        i.producto.id === id && puedeAgregarMas(i.producto, i.cantidad)
          ? { ...i, cantidad: i.cantidad + 1 }
          : i,
      ),
    )
  }

  function vaciar() {
    setItems([])
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
