import React from "react";
import { ReactComponent as PenSvg } from '../assets/icons/pen.svg'
import { ReactComponent as ResetSvg } from '../assets/icons/reset.svg'

const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-start items-center gap-3 font-bold text-black75'>
        <PenSvg
          className='w-10 h-10'
        />

        <h1 className='text-display'>
          Canvas Editor
        </h1>
      </div>

      <div className='flex gap-3 border-b border-solid border-red-500'>
        <div className='text-red-500'>
          Reset
        </div>

        <ResetSvg className='fill-red-500'/>
      </div>
    </div>
  )
}

export default Header
