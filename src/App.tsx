import React from 'react';
import './App.css';
import startImage from './assets/startimage.png'
import Header from './components/Header';
import Line from "./components/Line";
import Card from "./components/Card";
import { ReactComponent as TextSvg } from './assets/icons/text.svg'
import { ReactComponent as ImageSvg } from './assets/icons/pictures.svg'
import { ReactComponent as BackgroundSvg } from './assets/icons/background.svg'
import Button from "./components/Button";

function App() {
  return (
    <div className="App">
      <div
        className='w-full min-h-screen py-12 px-24 flex gap-5 text-body'
      >
        <div
          className='w-1/2 relative overflow-hidden'
        >
          <img
            src={startImage}
            className="absolute top-0 left-0 w-full h-full object-contain"
            alt="logo"
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
              />

              <Card
                title='Image'
                icon={<ImageSvg className='w-20 h-20 fill-black75'/>}
              />

              <Card
                title='Background'
                icon={<BackgroundSvg className='w-20 h-20 fill-black75'/>}
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
