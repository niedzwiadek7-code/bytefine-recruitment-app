import React, {useEffect, useRef, useState} from "react";
import {Rnd} from "react-rnd";
import {Element, Text} from "../../models";
import TextComponent from "./Text";
import {ReactComponent as MoveIcon} from "../../assets/icons/move.svg";
import {ReactComponent as TrashIcon} from "../../assets/icons/trash.svg";
import OutsideClickHandler from "../OutsideClickHandler";
import useOutsideClickHandler from "../../hooks/outsideClickHandler";
import {usePoster} from "../../context/Poster";

type Props = {
  element: Element
}

const ElementComponent: React.FC<Props> = ({
  element,
}) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const {
    activeElement,
    setActiveElement,
    deleteElement,
    handleBoxChange
  } = usePoster()
  const [isActive, setIsActive] = useState(activeElement === element.id)

  useEffect(() => {
    setIsActive(activeElement === element.id)
  }, [activeElement, element.id]);

  useOutsideClickHandler(wrapper, () => {
    setTimeout(() => {
      if (isActive) {
        setActiveElement(null)
      }
    }, 30)
  }, [isActive])

  const RenderElement: React.FC<{ element: Element}> = ({ element }) => {
    switch (element.type) {
      case 'text':
        return <TextComponent
          element={element as Text}
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
      // onDragStart={() => setActiveElement(element.id)}
      // onClick={() => setActiveElement(element.id)}
      dragHandleClassName={`custom-drag-handle-${element.id}`}
      resizeHandleComponent={{
        bottomRight: <div
          className={`absolute bottom-0 right-0 bg-white rounded-full p-1 z-[1000]`}
        >
          <div className={`bg-primary w-3 h-3 rounded-full`}/>
        </div>
      }}
      enableResizing={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: isActive,
        bottomLeft: false,
        topLeft: false
      }}
    >
      <div
        ref={wrapper}
        // onOutsideClick={() => {
        //   console.log('outside click')
        //   console.log(isActive)
        //   if (isActive) {
        //     setActive(null)
        //  }
        // }}
        className={`outline-none w-full h-full relative ${isActive && 'border-2 border-primary'}`}
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
                className={`absolute top-0 right-0 bg-white rounded-full p-1 cursor-pointer z-[1000]`}
                style={{
                  transform: 'translate(50%, -50%)'
                }}
                onClick={() => {
                  deleteElement(element.id)
                }}
              >
                <TrashIcon
                  className='w-4 h-4 fill-red-500'
                />
              </div>
            </>
          )
        }

        <RenderElement element={element} />
      </div>

    </Rnd>
  )
}

export default ElementComponent
