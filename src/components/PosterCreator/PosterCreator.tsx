import {Poster} from "../../models";
import React, {useEffect, useState} from "react";
import startImage from "../../assets/startimage.png"
import ElementComponent from "./Element";
import {usePoster} from "../../context/Poster";
import element from "./Element";

type Props = {}

const PosterCreator: React.FC<Props> = () => {
  const { poster } = usePoster()

  if (poster.elements.length === 0) {
    return (
      <img
        src={startImage}
        className="absolute top-0 left-0 w-full h-full object-contain"
        alt="logo"
      />
    )
  }

  return (
    <div
      className='w-full h-full bg-black50'
    >
      {poster.elements.map((element) => (
        <ElementComponent
          key={element.id}
          element={element}
        />
      ))}
    </div>
  )
}

export default PosterCreator
