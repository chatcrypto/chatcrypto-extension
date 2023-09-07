import React from 'react'

import SvgOutline from '../SvgOutline'
import { SvgProps } from '../types'

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  const color = props.color
  const fontSize = props.fontSize
  return (
    <SvgOutline
      width={fontSize ? fontSize : 24}
      height={fontSize ? fontSize : 24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M8 16H6C5.46957 16 4.96086 15.7893 4.58579 15.4142C4.21071 15.0391 4 14.5304 4 14V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H14C14.5304 4 15.0391 4.21071 15.4142 4.58579C15.7893 4.96086 16 5.46957 16 6V8"
        stroke={color ? color : '#8B8B8B'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20H10C9.46957 20 8.96086 19.7893 8.58579 19.4142C8.21071 19.0391 8 18.5304 8 18V10C8 9.46957 8.21071 8.96086 8.58579 8.58579C8.96086 8.21071 9.46957 8 10 8H18C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V14"
        stroke={color ? color : '#8B8B8B'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke={color ? color : '#8B8B8B'}
        strokeWidth="1.5"
      />
    </SvgOutline>
  )
}

export default Icon
