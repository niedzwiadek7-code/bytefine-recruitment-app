import React, { useEffect, useState } from 'react'

type Props = {
  alt: string
  image: string
}

const ImageBackground: React.FC<Props> = ({
  alt,
  image,
}) => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image()
      img.src = src
    }

    preloadImage(image)
  }, [image])

  return (
    <img
      src={image}
      onLoad={() => setLoaded(true)}
      style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
      className="absolute top-0 left-0 w-full h-full object-cover"
      alt={alt}
    />
  )
}

export default ImageBackground
