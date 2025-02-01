import React from 'react'
import startImage from '../../assets/startimage.png'
import ElementComponent from './Element'
import { usePoster } from '../../context/Poster'

type Props = {}

const PosterCreator: React.FC<Props> = () => {
  const { poster } = usePoster()

  if (poster.elements.length === 0 && !poster.background) {
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
      id="content-wrapper"
      className={`w-full h-full ${!poster.background && 'bg-black50'}`}
    >
      {
        poster.background && (
          <img
            src={poster.background}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt="background"
          />
        )
      }
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
