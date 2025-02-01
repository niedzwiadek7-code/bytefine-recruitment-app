/* eslint-disable no-unused-vars */

import React, {
  ReactNode, createContext, useState, useMemo,
} from 'react'

class BrowserFocus {
  browserFocus: boolean

  setBrowserFocus: (browserFocus: boolean) => void

  constructor(
    browserFocus: boolean = true,
    setBrowserFocus: (el: boolean) => void = () => {},
  ) {
    this.browserFocus = browserFocus
    this.setBrowserFocus = setBrowserFocus
  }
}

const BrowserFocusContext = createContext<BrowserFocus>(new BrowserFocus())

type ProviderProps = {
  children: ReactNode,
}

export const BrowserFocusProvider: React.FC<ProviderProps> = (props) => {
  const [browserFocus, setBrowserFocus] = useState<boolean>(true)

  window.addEventListener('focus', () => {
    setBrowserFocus(true)
  })

  const browserFocusClass = useMemo(() => new BrowserFocus(
    browserFocus,
    setBrowserFocus,
  ), [browserFocus])

  return (
    <BrowserFocusContext.Provider value={browserFocusClass}>
      {
        !browserFocus && (
          <div
            className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black z-[100000] opacity-50"
          />
        )
      }
      {props.children}
    </BrowserFocusContext.Provider>
  )
}

export const useBrowserFocus = () => React.useContext(BrowserFocusContext)
