import React, {
  useEffect, useRef, useState,
} from 'react'
import { Text } from '../../models'
import { usePoster } from '../../context/Poster'
import useAutoFontSize from '../../hooks/autoFontSize'

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

const TextComponent: React.FC<Props> = ({ element }) => {
  const {
    setContent,
    activeElement,
    setActiveElement,
    deleteElement,
  } = usePoster()
  const [isActive, setIsActive] = useState(activeElement === element.id)
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(element.text)
  const [fontColor, setFontColor] = useState(element.color)

  useEffect(() => {
    if (activeElement !== element.id && !text) {
      deleteElement(element.id)
      return
    }

    if (activeElement === element.id) {
      setIsEditing(true)
    }

    setIsActive(activeElement === element.id)
  }, [activeElement])

  const containerRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const { fontSize, measurerRef } = useAutoFontSize(
    text,
    containerSize.width,
    containerSize.height,
    { minSize: 12, maxSize: 72, defaultSize: 40 },
  )

  useEffect(() => {
    if (!containerRef.current) return
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { width, height } = entry.contentRect
        setContainerSize({
          width,
          height,
        })
      })
    })
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [containerRef])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
      textareaRef.current.selectionStart = text.length
    }
  }, [isEditing])

  const setContentFn = (color?: string) => {
    setContent(element.id, {
      text,
      color: color || fontColor,
    })
  }

  return (
    <div
      className="p-2 flex items-center justify-center w-full h-full relative select-none"
      ref={containerRef}
    >
      <div
        ref={measurerRef}
        className={`absolute invisible whitespace-pre-wrap break-words w-[${containerSize.width}px]`}
      >
        {text}
      </div>

      {(isEditing || !text) ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            setContentFn()
            setIsEditing(false)
          }}
          className="w-full h-full resize-none bg-transparent outline-none overflow-hidden placeholder-gray-500 text-center text-display"
          placeholder="Type your text here"
          style={{
            color: fontColor,
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize * 1.2}px`,
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center cursor-text break-words text-center whitespace-pre-wrap select-none"
          style={{
            color: fontColor,
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize * 1.2}px`,
          }}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={() => {
            setActiveElement(element.id)
            setIsEditing(true)
          }}
        >
          {text || ' '}
        </div>
      )}

      {isActive && (
        <div
          className="absolute bottom-0 left-0 pt-2 select-none"
          style={{ transform: 'translateY(110%)' }}
        >
          <ColorPicker
            fontColor={fontColor}
            setFontColor={setFontColor}
            element={element}
            setContentFn={setContentFn}
          />
        </div>
      )}
    </div>
  )
}

export default TextComponent
