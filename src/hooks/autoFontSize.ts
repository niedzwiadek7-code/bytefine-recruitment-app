import { useCallback, useEffect, useState } from 'react'

const useAutoFontSize = (
  text: string,
  maxWidth: number,
  maxHeight: number,
  options = {
    minSize: 8, maxSize: 72, defaultSize: 32, step: 4,
  },
) => {
  const [fontSize, setFontSize] = useState(options.defaultSize)
  const [measurer, setMeasurer] = useState<HTMLDivElement | null>(null)

  const measurerRef = useCallback((node: HTMLDivElement) => {
    if (node) setMeasurer(node)
  }, [])

  useEffect(() => {
    if (!measurer) return
    if (maxWidth <= 0 || maxHeight <= 0) return

    if (!text) {
      setFontSize(options.defaultSize)
      return
    }

    const calculateFontSize = () => {
      let bestSize = options.minSize
      measurer.style.fontSize = `${options.maxSize}px`

      if (
        measurer.scrollWidth <= maxWidth
        && measurer.scrollHeight <= maxHeight
      ) {
        setFontSize(options.maxSize)
        return
      }

      let low = options.minSize
      let high = options.maxSize

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        measurer.style.fontSize = `${mid}px`

        const fitsWidth = measurer.scrollWidth <= maxWidth
        const fitsHeight = measurer.scrollHeight <= maxHeight

        if (fitsWidth && fitsHeight) {
          bestSize = mid
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      setFontSize(bestSize)
    }

    calculateFontSize()
  }, [text, maxWidth, maxHeight, measurer, options.minSize, options.maxSize])

  return { fontSize, measurerRef }
}
export default useAutoFontSize
