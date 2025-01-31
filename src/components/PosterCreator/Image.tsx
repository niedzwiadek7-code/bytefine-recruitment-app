import { Image } from '../../models';
import React, { useEffect, useState } from "react";
import {usePoster} from "../../context/Poster";

type Props = {
  element: Image;
}

const ImageComponent: React.FC<Props> = ({
  element,
}) => {
  const [image, setImage] = useState<string | null>(element.content);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const {
    setActiveElement,
    deleteElement,
    setContent
  } = usePoster()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setContent(element.id, {
        content: reader.result as string
      })
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!image) {
      setTimeout(() => {
        if (isInitialLoad) {
          setIsInitialLoad(false);
          imageInputRef.current?.click();
        }
      }, 100);

      const handleFocus = () => {
        setTimeout(() => {
          const imageHTML = document.getElementById(`image-element-${element.id}`)
          if (!imageHTML) {
            deleteElement(element.id);
            // onRemove();
          }
        }, 100);
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, [image]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <input
        type="file"
        className='hidden'
        onChange={handleImageChange}
        ref={imageInputRef}
        accept="image/*"
      />

      {image && (
        <img
          id={`image-element-${element.id}`}
          src={image}
          alt="Uploaded Preview"
          onClick={() => setActiveElement(element.id)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
};

export default ImageComponent;
