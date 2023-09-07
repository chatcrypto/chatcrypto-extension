import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { Box, Button, Tooltip } from '@mantine/core'

import { CopyIcon } from '../Svg'

const CopyToClipBoardButton = ({
  value,
  isOnlyIcon,
  color,
}: {
  value: string | undefined
  isOnlyIcon: boolean
  color?: string | undefined
}) => {
  let timeoutID: NodeJS.Timeout
  const [tooltipText, setTooltipText] = useState('Copy to clipboard')
  const onCopy = () => {
    clearTimeout(timeoutID)
    setTooltipText('Copied')
  }
  const onMouseLeave = () => {
    timeoutID = setTimeout(() => {
      setTooltipText('Copy to clipboard')
    }, 500)
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeoutID)
    }
  }, [])
  return (
    <CopyToClipboard text={value ? value : ''} onCopy={onCopy}>
      <Tooltip label={tooltipText}>
        {isOnlyIcon ? (
          <Box
            style={{
              display: 'inline-flex',
              verticalAlign: 'middle',
            }}
          >
            <CopyIcon
              style={{ cursor: 'pointer', marginLeft: '5px' }}
              color={color}
              onMouseLeave={onMouseLeave}
            />
          </Box>
        ) : (
          <Button
            onMouseLeave={onMouseLeave}
   
          >
            <CopyIcon style={{ cursor: 'pointer' }} color={color} />
          </Button>
        )}
      </Tooltip>
    </CopyToClipboard>
  )
}

export default CopyToClipBoardButton
