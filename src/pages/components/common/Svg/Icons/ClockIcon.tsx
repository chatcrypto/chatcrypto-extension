import React from 'react'

import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({
  color,
  ...props
}) => (
  <Svg
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
      d="M20.8185 11.331C20.8185 6.72975 16.83 3 11.9093 3C6.9885 3 3 6.72975 3 11.331C3 15.9323 6.9885 19.662 11.9093 19.662C12.7987 19.662 13.6575 19.5405 14.4683 19.3132L17.5088 21V17.811C19.5278 16.284 20.8185 13.9485 20.8185 11.331ZM15.0424 13.1001C15.4566 13.1042 15.7957 12.7719 15.7999 12.3577C15.8041 11.9435 15.4717 11.6043 15.0575 11.6001L12.7893 11.5772C12.2136 11.5714 11.7499 11.103 11.7499 10.5273V7.4001C11.7499 6.98588 11.4142 6.6501 10.9999 6.6501C10.5857 6.6501 10.2499 6.98588 10.2499 7.4001V10.5273C10.2499 11.9256 11.376 13.063 12.7742 13.0771L15.0424 13.1001Z"
      fill={color}
    />
  </Svg>
)

export default Icon
