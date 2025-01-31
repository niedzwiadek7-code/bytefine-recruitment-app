import React from 'react';
import './App.css';
import PosterCreator from "./components/PosterCreator/PosterCreator";
import {PosterProvider} from "./context/Poster";
import Editor from "./components/Editor";

function App() {
  return (
    <PosterProvider>
      <div className="App">
        <div
          className='w-full min-h-screen flex px-24 justify-center items-center gap-5 text-body'
        >
          <div
            className='w-1/2 relative flex justify-center items-center max-h-[85vh] max-w-[65vh] aspect-[4/5]'
          >
            <PosterCreator />
          </div>

          <div
            className='flex flex-col gap-5 max-w-[50%] h-[85vh] aspect-[4/5]'
          >
            <Editor />
          </div>
        </div>
      </div>
    </PosterProvider>
  );
}

export default App;
