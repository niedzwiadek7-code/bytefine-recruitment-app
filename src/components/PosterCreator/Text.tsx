import React, { useEffect, useState } from 'react'
import { Text } from '../../models'
import { usePoster } from '../../context/Poster'

type Props = {
  element: Text
}

type ColorProps = {
  color: string
  fontColor: string
  element: Text
  // eslint-disable-next-line no-unused-vars
  setFontColor: (color: string) => void
  // eslint-disable-next-line no-unused-vars
  setContentFn: (color?: string) => void
}

type ColorPickerProps = {
  fontColor: string
  // eslint-disable-next-line no-unused-vars
  setFontColor: (color: string) => void
  element: Text
  // eslint-disable-next-line no-unused-vars
  setContentFn: (color?: string) => void
}

const Color: React.FC<ColorProps> = ({
  color,
  fontColor,
  element,
  setFontColor,
  setContentFn,
}) => (
  <>
    <input
      id={`color-${color}-${element.id}`}
      type="radio"
      name={`color-${element.id}`}
      className="hidden"
      value={color}
      checked={fontColor === color}
      onChange={() => {
        setFontColor(color)
        setContentFn(color)
      }}
    />

    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label
      htmlFor={`color-${color}-${element.id}`}
      className={`rounded-full p-[2px] cursor-pointer flex justify-content items-center ${fontColor === color ? 'border-2 border-white' : ''}`}
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

const ColorPicker: React.FC<ColorPickerProps> = ({
  fontColor,
  setFontColor,
  element,
  setContentFn,
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
          fontColor={fontColor}
          element={element}
          setFontColor={setFontColor}
          setContentFn={setContentFn}
        />
      ))}
    </div>
  )
}

const TextComponent: React.FC<Props> = ({
  element,
}) => {
  const {
    setContent,
    activeElement,
    setActiveElement,
  } = usePoster()
  const [isActive, setIsActive] = useState(activeElement === element.id)
  const [text, setText] = React.useState(element.text)
  const [fontColor, setFontColor] = React.useState(element.color)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setIsActive(activeElement === element.id)
  }, [activeElement, element.id])

  const setContentFn = (color?: string) => {
    setContent(element.id, {
      text,
      color: color || fontColor,
    })
  }

  return (
    <div
      className="p-2 flex items-center justify-center w-full h-full relative"
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value)

          if (textareaRef.current) {
            textareaRef.current.focus()
          }
        }}
        onFocus={() => {
          setActiveElement(element.id)
        }}
        className="w-full h-full resize-none bg-transparent outline-none overflow-hidden placeholder-gray-500 text-center text-display"
        placeholder="Type your text here"
        style={{
          color: fontColor,
        }}
        onBlur={() => setContentFn()}
      />

      {
        isActive && (
          <div
            className="absolute bottom-0 left-0 pt-2"
            style={{
              transform: 'translateY(110%)',
            }}
          >
            <ColorPicker
              fontColor={fontColor}
              setFontColor={setFontColor}
              element={element}
              setContentFn={setContentFn}
            />
          </div>
        )
      }
    </div>
  )
}

export default TextComponent
