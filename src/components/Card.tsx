import React, {ReactNode} from "react";

type Props = {
  title: string
  icon: ReactNode
}

const Card: React.FC<Props> = ({
  title,
  icon
}) => {
  return (
    <div className='bg-white97 flex flex-col items-center gap-5 pt-10 pb-2 rounded-lg'>
      {icon}
      {title}
    </div>
  )
}

export default Card
