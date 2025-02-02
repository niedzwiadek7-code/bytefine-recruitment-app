import React from 'react'
import { Text } from '../../../models'
import { usePoster } from '../../../context/Poster'

type Props = {
  color: string
  element: Text
}

const Color: React.FC<Props> = ({
  element,
  color,
}) => {
  const { setContent } = usePoster()

  return (
    <>
      <input
        id={`color-${color}-${element.id}`}
        type="radio"
        name={`color-${element.id}`}
        className="hidden"
        value={color}
        checked={element.color === color}
        onChange={() => {
          setContent(element.id, { color })
        }}
      />

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor={`color-${color}-${element.id}`}
        className={`rounded-full p-[2px] cursor-pointer flex justify-content items-center ${element.color === color ? 'border-2 border-white' : ''}`}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
      </label>
    </>
  )
}

export default Color
