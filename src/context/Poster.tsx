/* eslint-disable no-unused-vars */

import React, {
  ReactNode, createContext, useState, useMemo,
} from 'react'
import { Poster, Text, Image } from '../models'

type Position = {
  x: number
  y: number
}

type Size = {
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

  handleBoxChange: (id: number, position: Position, size: Size) => void

  setContent: (id: number, content: Partial<Content>) => void

  deleteElement: (id: number) => void

  activeElement: number | null

  setActiveElement: (id: number | null) => void

  addElement: (type: string) => void

  setBackground: (background: string) => void

  resetPoster: () => void

  setInActiveElement: (id: number) => void

  constructor(
    poster: Poster = new Poster(),
    setPoster: (el: Poster) => void = () => {},
    handleBoxChange: (id: number, position: Position, size: Size) => void = () => {},
    setContent: (id: number, content: Partial<Content>) => void = () => {},
    deleteElement: (id: number) => void = () => {},
    activeElement: number | null = null,
    setActiveElement: (id: number | null) => void = () => {},
    addElement: (type: string) => void = () => {},
    setBackground: (background: string) => void = () => {},
    resetPoster: () => void = () => {},
    setInActiveElement: (id: number) => void = () => {},
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
  }
}

const PosterContext = createContext<PosterClass>(new PosterClass())

type ProviderProps = {
  children: ReactNode,
}

export const PosterProvider: React.FC<ProviderProps> = (props) => {
  const [poster, setPoster] = useState<Poster>(new Poster())
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const handleBoxChange = (id: number, position: Position, size: Size) => {
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

  const addElement = (type: string) => {
    setPoster((prevPoster) => {
      if (type === 'text') {
        const element: Omit<Text, 'id'> = {
          x: 100,
          y: 100,
          width: 300,
          height: 150,
          text: '',
          type: 'text',
          color: '#353535',
        }

        const { newPoster, index } = prevPoster.addElement(element)
        setActiveElement(index)
        return newPoster
      }

      const element: Omit<Image, 'id'> = {
        x: 100,
        y: 100,
        width: 300,
        height: 150,
        content: '',
        type: 'image',
      }

      const { newPoster, index } = prevPoster.addElement(element)
      setActiveElement(index)

      return newPoster
    })
  }

  const setBackground = (background: string) => {
    setPoster((prevPoster) => prevPoster.setBackground(background))
  }

  const resetPoster = () => {
    setPoster(new Poster())
  }

  const setInActiveElement = (id: number) => {
    setActiveElement((prevValue) => {
      if (prevValue === id) {
        return null
      }

      return prevValue
    })
  }

  const setActiveElementFunction = (id: number | null) => {
    setActiveElement(id)
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
  ), [poster, activeElement])

  return (
    <PosterContext.Provider value={newPosterClass}>
      {props.children}
    </PosterContext.Provider>
  )
}

export const usePoster = () => React.useContext(PosterContext)
