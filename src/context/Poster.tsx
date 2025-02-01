import {Poster} from "../models";
import React, {ReactNode, createContext, useState} from "react";

class PosterClass {
  poster: Poster

  setPoster: (poster: Poster) => void

  handleBoxChange: (id: number, position: any, size: any)  => void

  setContent: (id: number, content: any) => void

  deleteElement: (id: number) => void

  activeElement: number | null

  setActiveElement: (id: number | null) => void

  addElement: (element: any) => void

  setBackground: (background: string) => void

  resetPoster: () => void

  setInActiveElement: (id: number) => void

  constructor(
    poster: Poster = new Poster(),
    setPoster: (poster: Poster) => void = () => {},
    handleBoxChange: (id: number, position: any, size: any) => void = () => {},
    setContent: (id: number, content: any) => void = () => {},
    deleteElement: (id: number) => void = () => {},
    activeElement: number | null = null,
    setActiveElement: (id: number | null) => void = () => {},
    addElement: (element: any) => void = () => {},
    setBackground: (background: string) => void = () => {},
    resetPoster: () => void = () => {},
    setInActiveElement: (id: number) => void = () => {}
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

const PosterContext = createContext<PosterClass>(new PosterClass());

type ProviderProps = {
  children: ReactNode,
}

export const PosterProvider: React.FC<ProviderProps> = (props) => {
  const [poster, setPoster] = useState<Poster>(new Poster())
  const [activeElement, setActiveElement] = useState<number | null>(null)

  const handleBoxChange = (id: number, position: any, size: any) => {
    // const element = poster.elements.find(e => e.id === id)
    //
    // if (element) {
    //   element.x = position.x
    //   element.y = position.y
    //   if (size.width && size.height) {
    //     element.width = size.width
    //     element.height = size.height
    //   }
    //
    //   poster.updateElement(id, element)
    // }
    //
    // setPoster(poster)

    // setPoster((prevPoster) => {
    //   const newPoster = Poster.newPoster(prevPoster)
    //   const element = newPoster.elements.find(e => e.id === id)
    //
    //   if (element) {
    //     element.x = position.x
    //     element.y = position.y
    //     if (size.width && size.height) {
    //       element.width = size.width
    //       element.height = size.height
    //     }
    //
    //     newPoster.updateElement(id, element)
    //   }
    //
    //   return newPoster
    // })
    setPoster((prevPoster) => prevPoster.updateElement(id, { x: position.x, y: position.y, ...size }))
  }

  const setContent = (id: number, content: any) => {
    // const element = poster.elements.find(e => e.id === id)
    //
    // if (element) {
    //   switch (element.type) {
    //     case 'text':
    //       element.text = content.text || ''
    //       element.color = content.color || ''
    //       break
    //     default:
    //       break
    //   }
    //
    //   poster.updateElement(id, element)
    // }
    //
    // setPoster(poster)

    // setPoster((prevPoster) => {
    //   const newPoster = Poster.newPoster(prevPoster)
    //   const element = newPoster.elements.find(e => e.id === id)
    //
    //   if (element) {
    //     switch (element.type) {
    //       case 'text':
    //         element.text = content.text || ''
    //         element.color = content.color || ''
    //         break
    //       default:
    //         break
    //     }
    //
    //     newPoster.updateElement(id, element)
    //   }
    //
    //   return newPoster
    // })
    setPoster((prevPoster) => prevPoster.updateElement(id, content))
  }

  const deleteElement = (id: number) => {
    // poster.removeElement(id)
    // setPoster(poster)
    // setPoster((prevPoster) => {
    //   const newPoster = Poster.newPoster(prevPoster)
    //   newPoster.removeElement(id)
    //
    //   return newPoster
    // })
    setPoster((prevPoster) => prevPoster.removeElement(id))
  }

  const addElement = (element: any) => {
    // poster.addElement(element)
    // setActiveElement(element.id)
    // setPoster(poster)
    // setPoster((prevPoster) => {
    //   const newPoster = Poster.newPoster(prevPoster)
    //   newPoster.addElement(element)
    //   setActiveElement(element.id)
    //
    //   return newPoster
    // })
    setPoster((prevPoster) => {
      const newPoster = prevPoster.addElement(element)
      setActiveElement(element.id)

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
    setActiveElement(prevValue => {
      if (prevValue === id) {
        return null
      }

      return prevValue
    })
  }

  const setActiveElementFunction = (id: number | null) => {
    console.log('setActiveElementFunction', id)
    setActiveElement(id)
  }

  return (
    <PosterContext.Provider value={new PosterClass(
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
      setInActiveElement
    )}>
      {props.children}
    </PosterContext.Provider>
  )
}

export const usePoster = () => React.useContext(PosterContext)
