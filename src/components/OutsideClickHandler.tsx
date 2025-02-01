import React, { ReactNode, useEffect, useRef } from 'react'

type Props = {
  children: ReactNode
  onOutsideClick: () => void
  className: string
}

const OutsideClickHandler: React.FC<Props> = ({
  children,
  onOutsideClick,
  className,
}) => {
  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapper.current && !wrapper.current.contains(event.target)) {
        onOutsideClick()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={wrapper}
      className={className}
    >
      {children}
    </div>
  )
}

export default OutsideClickHandler
