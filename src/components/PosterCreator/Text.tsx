import {Text} from "../../models";
import React from "react";


type Props = {
  element: Text
  isActive: boolean
}

const TextComponent: React.FC<Props> = ({
  element,
  isActive
}) => {
  return (
    <div
      className='w-full h-full flex items-center justify-center'
    >
      {element.text}, {isActive ? 'active' : 'inactive'}
    </div>
  )
}

export default TextComponent
