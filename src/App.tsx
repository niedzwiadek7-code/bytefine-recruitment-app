import React, {useEffect, useReducer, useState} from 'react';
import './App.css';

import Button from "./components/Button";
import {Poster, Text} from "./models";
import PosterCreator from "./components/PosterCreator/PosterCreator";
import {PosterProvider} from "./context/Poster";
import Editor from "./components/Editor";

function App() {
  return (
    <PosterProvider>
      <div className="App">
        <div
          className='w-full min-h-screen py-12 px-24 flex gap-5 text-body'
        >
          <div
            className='w-1/2 relative overflow-hidden'
          >
            <PosterCreator />
          </div>

          <div
            className='w-1/2 flex flex-col gap-5'
          >
            <Editor />
          </div>
        </div>
      </div>
    </PosterProvider>
  );
}

export default App;
