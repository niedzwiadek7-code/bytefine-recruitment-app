import {Text} from "../../models";
import React from "react";


type Props = {
  element: Text
  isActive: boolean
  setContent: (id: number, content: any) => void
}

const TextComponent: React.FC<Props> = ({
  element,
  isActive,
  setContent
}) => {
  const [text, setText] = React.useState(element.text)
  const [fontColor, setFontColor] = React.useState(element.color)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const setContentFn = (color?: string) => {
    console.log('on blurrr')
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
            name='color'
            className='hidden'
            value={color}
            checked={fontColor === color}
            onChange={() => {
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
