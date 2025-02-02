import React, {
  useEffect, useRef, useState,
} from 'react'
import { Text } from '../../../models'
import { usePoster } from '../../../context/Poster'
import useAutoFontSize from '../../../hooks/autoFontSize'
import ColorPicker from './ColorPicker'

type Props = {
  element: Text
}

const TextComponent: React.FC<Props> = ({ element }) => {
  const {
    setContent,
    activeElement,
    setActiveElement,
  } = usePoster()
  const [isActive, setIsActive] = useState(activeElement === element.id)
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(element.text)

  useEffect(() => {
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
    { minSize: 0, maxSize: 72, defaultSize: 40 },
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

  return (
    <div
      className="p-2 flex items-center justify-center w-full h-full relative select-none font-bold"
      ref={containerRef}
    >
      <style>
        {`
          .dynamic-placeholder-${element.id}::placeholder {
            color: ${element.color}40 !important;
          }
        `}
      </style>

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
          onFocus={() => {
            setActiveElement(element.id)
            setIsEditing(true)
          }}
          onBlur={() => {
            setContent(element.id, {
              text,
            })
            setIsEditing(false)
          }}
          className={`w-full h-full resize-none bg-transparent outline-none overflow-hidden placeholder-gray-500 text-center text-display dynamic-placeholder-${element.id}`}
          placeholder="Type your text here"
          style={{
            color: element.color,
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize * 1.2}px`,
          }}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center cursor-text break-words text-center whitespace-pre-wrap select-none"
          style={{
            color: element.color,
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
            element={element}
          />
        </div>
      )}
    </div>
  )
}

export default TextComponent
