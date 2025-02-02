import React from 'react'
import { Text } from '../../../models'
import Color from './Color'

type Props = {
  element: Text
}

const ColorPicker: React.FC<Props> = ({
  element,
}) => {
  const colors = [
    '#353535',
    '#ffffff',
    '#cf0000',
    '#0055ff',
    '#00da16',
  ]

  return (
    <div
      className="flex items-center justify-center gap-[3px]"
    >
      {colors.map((color) => (
        <Color
          key={color}
          color={color}
          element={element}
        />
      ))}
    </div>
  )
}

export default ColorPicker
