import React, {useEffect, useReducer, useState} from 'react';
import './App.css';
import Header from './components/Header';
import Line from "./components/Line";
import Card from "./components/Card";
import { ReactComponent as TextSvg } from './assets/icons/text.svg'
import { ReactComponent as ImageSvg } from './assets/icons/pictures.svg'
import { ReactComponent as BackgroundSvg } from './assets/icons/background.svg'
import Button from "./components/Button";
import {Poster, Text} from "./models";
import PosterCreator from "./components/PosterCreator/PosterCreator";

function App() {
  const [poster, setPoster] = useState<Poster>(new Poster())

  const handleBoxChange = (id: number, position: any, size: any) => {
    setPoster((prevPoster) => {
      const element = prevPoster.elements.find(e => e.id === id)

      if (element) {
        element.x = position.x
        element.y = position.y
        if (size.width && size.height) {
          element.width = size.width
          element.height = size.height
        }

        prevPoster.updateElement(id, element)
      }

      return Poster.newPoster(prevPoster)
    })
  };

  const setContent = (id: number, content: any) => {
    setPoster((prevPoster) => {
      const element = prevPoster.elements.find(e => e.id === id)

      if (element) {
        switch (element.type) {
          case 'text':
            element.text = content.text || ''
            element.color = content.color || ''
            break
          default:
            break
        }

        prevPoster.updateElement(id, element)
      }

      return Poster.newPoster(prevPoster)
    })
  }

  const deleteElement = (id: number) => {
    setPoster((prevPoster) => {
      prevPoster.removeElement(id)

      return Poster.newPoster(prevPoster)
    })
  }

  return (
    <div className="App">
      <div
        className='w-full min-h-screen py-12 px-24 flex gap-5 text-body'
      >
        <div
          className='w-1/2 relative overflow-hidden'
        >
          <PosterCreator
            poster={poster}
            handleBoxChange={handleBoxChange}
            setContent={setContent}
            deleteElement={deleteElement}
          />
        </div>

        <div
          className='w-1/2 flex flex-col gap-5'
        >
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
                icon={<TextSvg className='w-20 h-20 fill-black75' />}
                onClick={() => {
                  poster.addElement(new Text(
                    poster.index,
                    100,
                    100,
                    300,
                    150,
                    ''
                  ))

                  setPoster(Poster.newPoster(poster))
                }}
              />

              <Card
                title='Image'
                icon={<ImageSvg className='w-20 h-20 fill-black75'/>}
                onClick={() => {
                  poster.addElement(new Text(
                    poster.index,
                    100,
                    100,
                    200,
                    100,
                    ''
                  ))

                  setPoster(Poster.newPoster(poster))
                }}
              />

              <Card
                title='Background'
                icon={<BackgroundSvg className='w-20 h-20 fill-black75'/>}
                onClick={() => {
                  poster.addElement(new Text(
                    poster.index,
                    100,
                    100,
                    200,
                    100,
                    ''
                  ))

                  setPoster(Poster.newPoster(poster))
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
        </div>
      </div>
    </div>
  );
}

export default App;
