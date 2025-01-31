import React from "react";
import Header from './Header';
import Line from "./Line";
import Card from "./Card";
import { Text } from "../models";
import { ReactComponent as TextSvg } from '../assets/icons/text.svg'
import { ReactComponent as ImageSvg } from '../assets/icons/pictures.svg'
import { ReactComponent as BackgroundSvg } from '../assets/icons/background.svg'
import Button from "./Button";
import {usePoster} from "../context/Poster";

const Editor: React.FC = () => {
  const {
    poster,
    addElement
  } = usePoster()

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
            onClick={() => {}}
          />

          <Card
            title='Background'
            icon={<BackgroundSvg className='w-20 h-20 fill-black75'/>}
            onClick={() => {}}
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
