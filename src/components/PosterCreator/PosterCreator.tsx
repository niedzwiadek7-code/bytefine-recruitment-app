import React, { useEffect } from 'react'
import startImage from '../../assets/startimage.png'
import ElementComponent from './Element'
import { usePoster } from '../../context/Poster'
import ImageBackground from '../ImageBackground'

type Props = {}

const PosterCreator: React.FC<Props> = () => {
  const { poster } = usePoster()

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }

    if (poster.background) {
      preloadImage(poster.background)
    }
    preloadImage(startImage)
  }, [poster.background])

  if (poster.elements.length === 0 && !poster.background) {
    return (
      <ImageBackground
        alt="Start Image"
        image={startImage}
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
          <ImageBackground
            alt="Background"
            image={poster.background}
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
