import React from 'react'

import { Flex, Paper, Text } from '@mantine/core'
import { IconReload } from '@tabler/icons-react'

import { BotIcon } from '../../common/Svg'

import useStyles from './styles'

const ErrorMessage = ({ reloadMessage }: { reloadMessage: () => void }) => {
  const { classes } = useStyles()

  return (
    <Flex gap={16} align="flex-start">
      <BotIcon
        style={{
          alignSelf: 'flex-start',
        }}
      />
      <Paper className={classes.errorPaperStyle}>
        <Text className={classes.errorTextStyle}>Something went wrong</Text>
        <IconReload className={classes.errorIcon} onClick={reloadMessage} />
      </Paper>
    </Flex>
  )
}

export default ErrorMessage
