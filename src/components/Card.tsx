import React, { ReactNode } from 'react'

type Props = {
  title: string
  icon: ReactNode
  onClick: () => void
}

const Card: React.FC<Props> = ({
  title,
  icon,
  onClick,
}) => (
  <div
    className="bg-white97 flex flex-col items-center gap-5 pt-16 pb-5 rounded-lg cursor-pointer select-none"
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick()
      }
    }}
  >
    {icon}
    {title}
  </div>
)

export default Card
