import React, {ReactNode} from "react";

type Props = {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled = false
}) => {
  return (
    <button
      className='bg-primary hover:bg-primary700 focus:bg-primary disabled:bg-black25 text-white py-2 px-8 rounded-md font-semibold text-button'
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;
