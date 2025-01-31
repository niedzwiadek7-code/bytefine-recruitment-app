import React from "react";
import Header from './Header';
import Line from "./Line";
import Card from "./Card";
import {Image, Text} from "../models";
import { ReactComponent as TextSvg } from '../assets/icons/text.svg'
import { ReactComponent as ImageSvg } from '../assets/icons/pictures.svg'
import { ReactComponent as BackgroundSvg } from '../assets/icons/background.svg'
import Button from "./Button";
import {usePoster} from "../context/Poster";

const Editor: React.FC = () => {
  const {
    poster,
    addElement,
    setBackground
  } = usePoster()
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBackground(reader.result as string)
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <Header/>
      <Line/>

      <div
        className='w-full h-16 flex justify-start items-center bg-white97 px-5 rounded-lg'
      >
        <div>
          Add content
        </div>
      </div>

      <div>
        <div className='grid grid-cols-2 gap-5'>
          <Card
            title='Text'
            icon={<TextSvg className='w-20 h-20 fill-black75'/>}
            onClick={() => {
              addElement(new Text(
                poster.index,
                100,
                100,
                300,
                150,
                ''
              ))
            }}
          />

          <Card
            title='Image'
            icon={<ImageSvg className='w-20 h-20 fill-black75'/>}
            onClick={() => {
              addElement(new Image(
                poster.index,
                100,
                100,
                300,
                150,
                ''
              ))
            }}
          />

          <input
            type='file'
            className='hidden'
            onChange={handleBackgroundChange}
            ref={imageInputRef}
            accept='image/*'
          />

          <Card
            title='Background'
            icon={<BackgroundSvg className='w-20 h-20 fill-black75'/>}
            onClick={() => {
              imageInputRef.current?.click()
            }}
          />
        </div>
      </div>

      <Line/>

      <div className='flex justify-end'>
        <Button>
          Export to PNG
        </Button>
      </div>
    </>
  )
}

export default Editor
