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

    if (!text) {
      setFontSize(options.defaultSize)
      return
    }

    const calculateFontSize = () => {
      let low = options.minSize
      let high = options.maxSize
      let size = high

      while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        measurer.style.fontSize = `${mid}px`

        const widthOk = measurer.scrollWidth <= maxWidth
        const heightOk = measurer.scrollHeight <= maxHeight

        if (widthOk && heightOk) {
          size = mid
          low = mid + options.step
        } else {
          high = mid - options.step
        }
      }

      setFontSize(size)
    }

    calculateFontSize()
  }, [text, maxWidth, maxHeight, measurer, options.minSize, options.maxSize])

  return { fontSize, measurerRef }
}
export default useAutoFontSize
