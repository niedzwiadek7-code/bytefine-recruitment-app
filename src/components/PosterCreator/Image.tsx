import React, { useEffect, useState } from 'react'
import { Image } from '../../models'
import { usePoster } from '../../context/Poster'
import { useBrowserFocus } from '../../context/BrowserFocus'

type Props = {
  element: Image;
}

const ImageComponent: React.FC<Props> = ({
  element,
}) => {
  const [image, setImage] = useState<string | null>(element.content)
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
  const imageInputRef = React.useRef<HTMLInputElement>(null)

  const {
    setActiveElement,
    // deleteElement,
    setContent,
  } = usePoster()

  const {
    setBrowserFocus,
  } = useBrowserFocus()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
      setContent(element.id, {
        content: reader.result as string,
      })
    }
    reader.readAsDataURL(file)
  }

  const startSearchingImage = () => {
    setIsInitialLoad(false)
    setBrowserFocus(false)
    imageInputRef.current?.click()
  }

  useEffect(() => {
    if (!image) {
      // setTimeout(() => {
      if (isInitialLoad) {
        startSearchingImage()
        // setIsInitialLoad(false)
        // setBrowserFocus(false)
        // imageInputRef.current?.click()
      }
      // }, 100)

      // const handleFocus = () => {
      //   setTimeout(() => {
      //     const imageHTML = document.getElementById(`image-element-${element.id}`)
      //     if (!imageHTML) {
      //       deleteElement(element.id)
      //       // onRemove();
      //     }
      //   }, 100)
      // }
      //
      // window.addEventListener('focus', handleFocus)
      // return () => window.removeEventListener('focus', handleFocus)
    }
  }, [image])

  return (
    <div
      className="w-full h-full"
    >
      <input
        type="file"
        className="hidden"
        onChange={handleImageChange}
        ref={imageInputRef}
        accept="image/*"
      />

      {image ? (
        <img
          id={`image-element-${element.id}`}
          src={image}
          alt="Uploaded Preview"
          onClick={() => setActiveElement(element.id)}
          onKeyDown={() => {}}
          className="w-full h-full object-cover select-none"
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center text-display text-[#C9C9C9] bg-[#D9D9D9] select-none font-bold"
          onClick={() => {
            setActiveElement(element.id)
            startSearchingImage()
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
        >
          IMG
        </div>
      )}
    </div>
  )
}

export default ImageComponent
