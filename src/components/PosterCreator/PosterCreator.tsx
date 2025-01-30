import {Poster} from "../../models";
import React, {useState} from "react";
import startImage from "../../assets/startimage.png"
import ElementComponent from "./Element";

type Props = {
  poster: Poster
  handleBoxChange: (id: number, position: any, size: any) => void
}

const PosterCreator: React.FC<Props> = ({
  poster,
  handleBoxChange
}) => {
  const [active, setActive] = useState<number | null>(null)

  if (poster.elements.length === 0) {
    return (
      <img
        src={startImage}
        className="absolute top-0 left-0 w-full h-full object-contain"
        alt="logo"
      />
    )
  }

  const setActiveFn = (id: number) => {
    setActive(id)
  }

  return (
    <div
      className='w-full h-full bg-black50'
    >
      {poster.elements.map((element) => (
        <ElementComponent
          element={element}
          handleBoxChange={handleBoxChange}
          isActive={active === element.id}
          setActive={setActiveFn}
        />
      ))}
    </div>
  )
}

export default PosterCreator
