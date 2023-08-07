import React from 'react'
import { Flex, Paper } from '@mantine/core'

import ThreeDotsWave from './ThreeDotsLoading'
import { BotIcon } from '../../common/Svg'

const LoadingMessage = () => {
  return (
    <Flex gap={16} align="flex-start">
      <BotIcon
        style={{
          alignSelf: 'flex-start',
        }}
      />
      <Paper
        sx={(theme) => ({
          width: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.colors.background[0],
          padding: '12px 24px',
        })}
      >
        <ThreeDotsWave />
      </Paper>
    </Flex>
  )
}

export default LoadingMessage
