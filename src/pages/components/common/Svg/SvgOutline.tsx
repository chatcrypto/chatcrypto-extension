import styled from '@emotion/styled'
import { SvgProps } from './types'

export const SvgOutline = styled.svg<SvgProps>`
  align-self: center; // Safari fix
  fill: none;
  flex-shrink: 0;

  // Safari fix
  @supports (-webkit-text-size-adjust: none) and (not (-ms-accelerator: true))
    and (not (-moz-appearance: none)) {
    filter: none !important;
  }
`

SvgOutline.defaultProps = {
  color: 'transparent',
  width: '20px',
  xmlns: 'http://www.w3.org/2000/svg',
}

export default SvgOutline
