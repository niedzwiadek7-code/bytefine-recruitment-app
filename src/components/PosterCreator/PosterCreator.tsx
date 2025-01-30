import {Poster} from "../../models";
import React, {useEffect, useState} from "react";
import startImage from "../../assets/startimage.png"
import ElementComponent from "./Element";

type Props = {
  poster: Poster
  handleBoxChange: (id: number, position: any, size: any) => void
  setContent: (id: number, content: any) => void
  deleteElement: (id: number) => void
}

const PosterCreator: React.FC<Props> = ({
  poster,
  handleBoxChange,
  setContent,
  deleteElement
}) => {
  const [active, setActive] = useState<number | null>(null)
  const [actualElementsLength, setActualElementsLength] = useState<number>(poster.elements.length)

  useEffect(() => {
    setActualElementsLength(poster.elements.length)
    if (poster.elements.length > actualElementsLength) {
      setActive(poster.elements[poster.elements.length - 1].id)
    }
  }, [JSON.stringify(poster.elements)]);

  if (poster.elements.length === 0) {
    return (
      <img
        src={startImage}
        className="absolute top-0 left-0 w-full h-full object-contain"
        alt="logo"
      />
    )
  }

  const setActiveFn = (id: number | null) => {
    setActive(id)
  }

  return (
    <div
      className='w-full h-full bg-black50'
    >
      {poster.elements.map((element) => (
        <ElementComponent
          key={element.id}
          element={element}
          handleBoxChange={handleBoxChange}
          isActive={active === element.id}
          setActive={setActiveFn}
          setContent={setContent}
          deleteElement={deleteElement}
        />
      ))}
    </div>
  )
}

export default PosterCreator
