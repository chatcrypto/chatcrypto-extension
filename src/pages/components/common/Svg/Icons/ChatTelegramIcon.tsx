import React from 'react'

import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = ({
  color,
  ...props
}) => (
  <Svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.95241 14.9418C3.6903 14.3809 3.79287 12.5566 5.10991 12.1407L23.9159 6.20199C25.0738 5.83634 26.1637 6.92618 25.798 8.08406L19.8593 26.8901C19.4434 28.2071 17.6191 28.3097 17.0582 27.0476L14.689 21.7169C14.4491 21.1771 14.46 20.5589 14.7189 20.028L17.3333 14.6667L11.927 17.2695C11.398 17.5242 10.7837 17.5335 10.2472 17.2951L4.95241 14.9418Z"
      fill="#6F8AFE"
    />
  </Svg>
)

export default Icon
