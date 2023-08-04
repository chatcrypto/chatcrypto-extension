import React from 'react'

import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({
  color,
  ...props
}) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15 17.0059L15 19C15 20.1046 14.1046 21 13 21L4 21C2.89543 21 2 20.1046 2 19L2 5C2 3.89543 2.89543 3 4 3L13 3C14.1046 3 15 3.89543 15 5V7.04821"
      fill="#8B8B8B"
    />
    <path
      d="M18 9L22 12L18 15"
      stroke="#8B8B8B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 11H20.25C20.6642 11 21 11.3358 21 11.75C21 12.1642 20.6642 12.5 20.25 12.5H15V11Z"
      fill="#8B8B8B"
    />
    <path
      d="M9 11.75C9 11.3358 9.33579 11 9.75 11H15V12.5H9.75C9.33579 12.5 9 12.1642 9 11.75Z"
      fill="white"
    />
  </svg>
)

export default Icon
