// useEffect es un hook de React que ejecuta código DESPUÉS de que la pantalla se dibuja.
import { useEffect } from 'react'

export function useTituloPagina(titulo) {
  useEffect(() => {
    document.title = `${titulo} | Sonido Vivo`
    // El arreglo de abajo indica cuándo se repite el efecto: solo si "titulo" cambia.
  }, [titulo])
}