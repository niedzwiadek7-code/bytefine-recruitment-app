import {Text} from "../../models";
import React, {useEffect, useState} from "react";
import {usePoster} from "../../context/Poster";


type Props = {
  element: Text
}

const TextComponent: React.FC<Props> = ({
  element,
}) => {
  const {
    setContent,
    activeElement,
    setActiveElement
  } = usePoster()
  const [isActive, setIsActive] = useState(activeElement === element.id)
  const [text, setText] = React.useState(element.text)
  const [fontColor, setFontColor] = React.useState(element.color)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsActive(activeElement === element.id)

    // if (activeElement === element.id && textareaRef.current) {
    //   textareaRef.current.focus();
    // }
  }, [activeElement, element.id]);

  // useEffect(() => {
  //   setText(element.text);
  //   setFontColor(element.color);
  // }, [element.text, element.color]);

  // useEffect(() => {
  //   if (isActive && textareaRef.current) {
  //     textareaRef.current.focus();
  //   }
  // }, [isActive]);

  const setContentFn = (color?: string) => {
    setContent(element.id, {
      text,
      color: color || fontColor
    })
  }

  const ColorPicker = () => {
    const colors = [
      '#353535',
      '#ffffff',
      '#cf0000',
      '#0055ff',
      '#00da16'
    ]

    const Color = ({ color }: { color: string}) => {
      return (
        <>
          <input
            id={`color-${color}-${element.id}`}
            type='radio'
            name={`color-${element.id}`}
            className='hidden'
            value={color}
            checked={fontColor === color}
            onChange={() => {
              console.log('color', color)
              setFontColor(color)
              setContentFn(color)

              // if (textareaRef.current) {
              //   textareaRef.current.focus();
              // }
            }}
          />

          <label
            htmlFor={`color-${color}-${element.id}`}
            className={`rounded-full p-[2px] cursor-pointer flex justify-content items-center ${fontColor === color ? 'border-2 border-white' : ''}`}
          >

            <div
              className={`w-4 h-4 rounded-full`}
              style={{
                backgroundColor: color
              }}
            />
          </label>
        </>
      )
    }

    return (
      <div
        className='flex items-center justify-center gap-[3px]'
      >
        {colors.map((color) => (
          <Color
            key={color}
            color={color}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className='p-2 flex items-center justify-center w-full h-full relative'
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={e => {
          setText(e.target.value)

          if (textareaRef.current) {
            textareaRef.current.focus();
          }
        }}
        onFocus={() => {
          setActiveElement(element.id)
        }}
        className='w-full h-full resize-none bg-transparent outline-none overflow-hidden placeholder-gray-500 text-center text-display'
        placeholder='Type your text here'
        style={{
          color: fontColor,
        }}
        onBlur={() => setContentFn()}
      />

      {
        isActive && (
          <div
            className={`absolute bottom-0 left-0 pt-2`}
            style={{
              transform: 'translateY(110%)',
            }}
          >
            <ColorPicker/>
          </div>
        )
      }
    </div>
  )
}

export default TextComponent
