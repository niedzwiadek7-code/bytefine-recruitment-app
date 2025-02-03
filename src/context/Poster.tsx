/* eslint-disable no-unused-vars */

import React, {
  ReactNode, createContext, useState, useMemo, useCallback,
} from 'react'
import {
  Poster, Text, Image, Size,
} from '../models'

type Position = {
  x: number
  y: number
}

type ContextSize = {
  width?: number
  height?: number
}

type Content = {
  content: string
  color: string
  text: string
}

class PosterClass {
  poster: Poster

  setPoster: (poster: Poster) => void

  handleBoxChange: (id: number, position: Position, size: ContextSize) => void

  setContent: (id: number, content: Partial<Content>) => void

  deleteElement: (id: number) => void

  activeElement: number | null

  setActiveElement: (id: number | null) => void

  addElement: (type: string) => void

  setBackground: (background: string) => void

  resetPoster: () => void

  setInActiveElement: (id: number) => void

  setSize: (size: Size) => void

  constructor(
    poster: Poster = new Poster(),
    setPoster: (el: Poster) => void = () => {},
    handleBoxChange: (id: number, position: Position, size: ContextSize) => void = () => {},
    setContent: (id: number, content: Partial<Content>) => void = () => {},
    deleteElement: (id: number) => void = () => {},
    activeElement: number | null = null,
    setActiveElement: (id: number | null) => void = () => {},
    addElement: (type: string) => void = () => {},
    setBackground: (background: string) => void = () => {},
    resetPoster: () => void = () => {},
    setInActiveElement: (id: number) => void = () => {},
    setSize: (size: Size) => void = () => {},
  ) {
    this.poster = poster
    this.setPoster = setPoster
    this.handleBoxChange = handleBoxChange
    this.setContent = setContent
    this.deleteElement = deleteElement
    this.activeElement = activeElement
    this.setActiveElement = setActiveElement
    this.addElement = addElement
    this.setBackground = setBackground
    this.resetPoster = resetPoster
    this.setInActiveElement = setInActiveElement
    this.setSize = setSize
  }
}

const PosterContext = createContext<PosterClass>(new PosterClass())

type ProviderProps = {
  children: ReactNode,
}

export const PosterProvider: React.FC<ProviderProps> = (props) => {
  const [poster, setPoster] = useState<Poster>(new Poster())
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const handleBoxChange = (id: number, position: Position, size: ContextSize) => {
    setPoster(
      (prevPoster) => prevPoster.updateElement(id, { x: position.x, y: position.y, ...size }),
    )
  }

  const setContent = (id: number, content: Partial<Content>) => {
    setPoster((prevPoster) => prevPoster.updateElement(id, content))
  }

  const deleteElement = (id: number) => {
    setPoster((prevPoster) => prevPoster.removeElement(id))
  }

  const addElement = useCallback((type: string) => {
    setPoster((prevPoster) => {
      if (type === 'text') {
        const width = Math.min(300, poster.size.width / 2)
        const height = Math.min(150, poster.size.height / 4)
        const element: Omit<Text, 'id'> = {
          x: prevPoster.size.width / 2 - width / 2,
          y: prevPoster.size.height / 2 - height / 2,
          width,
          height,
          text: '',
          type: 'text',
          color: '#353535',
        }

        const { newPoster, index } = prevPoster.addElement(element)
        setActiveElement(index)
        return newPoster
      }

      const width = Math.min(200, poster.size.width / 2)
      const height = Math.min(200, poster.size.height / 2)

      const element: Omit<Image, 'id'> = {
        x: prevPoster.size.width / 2 - width / 2,
        y: prevPoster.size.height / 2 - height / 2,
        width,
        height,
        content: '',
        type: 'image',
      }

      const { newPoster, index } = prevPoster.addElement(element)
      setActiveElement(index)

      return newPoster
    })
  }, [poster.size.height, poster.size.width])

  const setBackground = (background: string) => {
    setPoster((prevPoster) => prevPoster.setBackground(background))
  }

  const resetPoster = () => {
    setPoster(new Poster())
  }

  const setActiveElementFunction = (id: number | null) => {
    const elements = poster.elements.sort((a, b) => {
      if (a.id === id) return 1
      if (b.id === id) return -1
      return a.id - b.id
    })

    setPoster((prevPoster) => prevPoster.updateElementsQueue(elements))
    setActiveElement(id)
  }

  const setInActiveElement = (id: number) => {
    setActiveElement((prevValue) => {
      if (prevValue === id) {
        // setActiveElementFunction(null)
        return null
      }

      // setActiveElementFunction(prevValue)
      return prevValue
    })
  }

  const setSize = (size: Size) => {
    setPoster((prevPoster) => prevPoster.setSize(size))
  }

  const newPosterClass = useMemo(() => new PosterClass(
    poster,
    setPoster,
    handleBoxChange,
    setContent,
    deleteElement,
    activeElement,
    setActiveElementFunction,
    addElement,
    setBackground,
    resetPoster,
    setInActiveElement,
    setSize,
  ), [poster, activeElement, addElement])

  return (
    <PosterContext.Provider value={newPosterClass}>
      {props.children}
    </PosterContext.Provider>
  )
}

export const usePoster = () => React.useContext(PosterContext)
