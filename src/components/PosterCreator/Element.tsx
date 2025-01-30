import React from "react";
import {Rnd} from "react-rnd";
import {Element, Text} from "../../models";
import TextComponent from "./Text";
import {ReactComponent as MoveIcon} from "../../assets/icons/move.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trash.svg";

type Props = {
  element: Element
  handleBoxChange: (id: number, position: any, size: any) => void
  isActive: boolean
  setActive: (id: number) => void
}

const ElementComponent: React.FC<Props> = ({
  element,
  handleBoxChange,
  isActive,
  setActive
}) => {
  const RenderElement: React.FC<{ element: Element}> = ({ element }) => {
    switch (element.type) {
      case 'text':
        return <TextComponent
          element={element as Text}
          isActive={isActive}
        />
      default:
        return <></>
    }
  }

  return (
    <Rnd
      key={element.id}
      size={{width: element.width, height: element.height}}
      position={{x: element.x, y: element.y}}
      onDragStop={(e, d) => handleBoxChange(element.id, {x: d.x, y: d.y}, {})}
      onResizeStop={(e, direction, ref, delta, position) =>
        handleBoxChange(element.id, position, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
      bounds="parent"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onDragStart={() => setActive(element.id)}
      onClick={() => setActive(element.id)}
      dragHandleClassName={`custom-drag-handle-${element.id}`}
      resizeHandleClasses={{
        bottomRight: `custom-resize-handle-${element.id}`
      }}
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      {
        isActive && (
          <>
            <div
              className={`absolute top-0 left-0 bg-white rounded-full p-1 custom-drag-handle-${element.id} cursor-move z-[1000]`}
              style={{
                transform: 'translate(-50%, -50%)'
              }}
            >
              <MoveIcon
                className='w-6 h-6 fill-primary'
              />
            </div>

            <div
              className={`absolute bottom-0 right-0 bg-white w-5 h-5 flex items-center justify-center rounded-full p-1 custom-resize-handle-${element.id} z-[1000]`}
              style={{
                transform: 'translate(50%, 50%)'
              }}
            >
              <div className='bg-primary w-3 h-3 rounded-full'/>
            </div>

            <div
              className={`absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer z-[1000]`}
              style={{
                transform: 'translate(50%, -50%)'
              }}
            >
              <TrashIcon
                className='w-4 h-4 fill-red-500'
              />
            </div>
          </>
        )
      }

      <div
        className={`outline-none w-full h-full relative ${isActive && 'border-2 border-primary'}`}
      >
        <RenderElement element={element} />
      </div>
    </Rnd>
  )
}

export default ElementComponent
