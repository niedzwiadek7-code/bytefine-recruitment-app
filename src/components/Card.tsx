import React, {ReactNode} from "react";

type Props = {
  title: string
  icon: ReactNode
  onClick: () => void
}

const Card: React.FC<Props> = ({
  title,
  icon,
  onClick
}) => {
  return (
    <div
      className='bg-white97 flex flex-col items-center gap-5 pt-10 pb-2 rounded-lg cursor-pointer'
      onClick={onClick}
    >
      {icon}
      {title}
    </div>
  )
}

export default Card
