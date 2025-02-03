import React, { useEffect, useState } from 'react'
import startImage from '../../assets/startimage.png'
import ElementComponent from './Element'
import { usePoster } from '../../context/Poster'
import ImageBackground from '../ImageBackground'

type Props = {}

const PosterCreator: React.FC<Props> = () => {
  const {
    poster,
    setSize,
  } = usePoster()
  const [initialPosterSizeSet, setInitialPosterSizeSet] = useState(false)

  const handleResize = () => {
    const contentWrapper = document.getElementById('content-wrapper')
    if (contentWrapper) {
      setSize({
        width: contentWrapper.clientWidth,
        height: contentWrapper.clientHeight,
      })
    }
  }

  useEffect(() => {
    if (!initialPosterSizeSet) {
      handleResize()
      setInitialPosterSizeSet(true)
    }
  }, [poster.elements.length, poster.background])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (poster.elements.length === 0 && !poster.background) {
    return (
      <div
        id="content-wrapper"
        className="w-full h-full"
      >
        <ImageBackground
          alt="Start Image"
          image={startImage}
        />
      </div>
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
