import React from 'react'
import './App.css'
import PosterCreator from './components/PosterCreator/PosterCreator'
import { PosterProvider } from './context/Poster'
import Editor from './components/Editor'
import { BrowserFocusProvider } from './context/BrowserFocus'

const App = () => (
  <BrowserFocusProvider>
    <PosterProvider>
      <div className="App">
        <div
          className="w-full min-h-screen flex flex-col md:flex-row px-4 md:px-24 justify-center items-center gap-5 text-body py-5"
        >
          <div
            className="w-full md:w-1/2 relative flex justify-center items-center max-h-[90vh] max-w-full md:max-w-[75vh] aspect-[4/5]"
          >
            <PosterCreator />
          </div>

          <div
            className="w-full md:w-1/2 max-w-full md:max-w-[75vh] max-h-[90vh] aspect-[4/5]"
          >
            <Editor />
          </div>
        </div>
      </div>
    </PosterProvider>
  </BrowserFocusProvider>
)

export default App
