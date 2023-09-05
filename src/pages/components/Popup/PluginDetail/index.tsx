import React, { useEffect, useState } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

import { Box } from '@mantine/core'

interface IPluginDetail {}

const PluginDetail = ({}: IPluginDetail) => {
  const [isVisibilitySensorActive, setIsVisibilitySensorActive] = useState(true)
  const onHandleVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) return
    setIsVisibilitySensorActive(false)
  }

  useEffect(() => {
    if (!isVisibilitySensorActive) {
      console.log('call api detail')
    }
  }, [isVisibilitySensorActive])

  return (
    <VisibilitySensor
      onChange={onHandleVisibilityChange}
      active={isVisibilitySensorActive}
      partialVisibility
    >
      <Box
        sx={{
          height: '800px',
          backgroundColor: 'red',
          borderRadius: '12px',
          marginBottom: '15px',
        }}
      >
        Plugin detail
      </Box>
      
    </VisibilitySensor>
  )
}

export default PluginDetail
