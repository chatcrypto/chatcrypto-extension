import React, { useContext } from 'react'
import { get } from 'lodash'

import { Avatar, Flex, Paper, rem, Text } from '@mantine/core'

import GraphMessage from './GraphMessage'
import useStyles from './styles'
import TextMessage from './TextMessage'
import {
  CHART_TYPE,
  IMessageDetail,
} from '~/pages/context/Popup/ChatContext/types'
import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setMessageDoneRendering } from '~/pages/context/Popup/ChatContext/reducer'

const Message = ({
  messageDetail,
  scrollToBottom,
}: {
  messageDetail: IMessageDetail
  scrollToBottom: () => void
}) => {
  const { classes } = useStyles()
  const { state, dispatch } = useContext(ChatContext)
  const { type } = messageDetail
  const { message, id, done } = messageDetail

  const onHandleFinishRenderingMessage = (id: string) => {
    dispatch(
      setMessageDoneRendering({
        _id: id,
      }),
    )
  }

  if (type === 'user') {
    return (
      <Flex gap={16} justify="flex-end" align="flex-start">
        <Paper className={classes.paperStyle}>
          <Text className={classes.primaryTextStyle}>{message as string}</Text>
        </Paper>
        <Avatar radius="xl" w={rem(40)} h={rem(40)} />
      </Flex>
    )
  }
  if (typeof message === 'string') {
    return (
      <TextMessage
        message={message}
        messageStatus={done}
        onHandleFinishRenderingMessage={() =>
          onHandleFinishRenderingMessage(id)
        }
        scrollToBottom={scrollToBottom}
      />
    )
  }

  if (typeof message === 'object') {
    if (get(message, 'error')) {
      return (
        <TextMessage
          message={get(message, 'data', '') as string}
          messageStatus={done}
          onHandleFinishRenderingMessage={() =>
            onHandleFinishRenderingMessage(id)
          }
          scrollToBottom={scrollToBottom}
        />
      )
    }
    if (message.chart_type === CHART_TYPE.TEXT) {
      return (
        <TextMessage
          message={get(message, 'data', '') as string}
          messageStatus={done}
          onHandleFinishRenderingMessage={() =>
            onHandleFinishRenderingMessage(id)
          }
          scrollToBottom={scrollToBottom}
        />
      )
    }
    return (
      <GraphMessage
        message={message}
        messageStatus={done}
        onHandleFinishRenderingMessage={() =>
          onHandleFinishRenderingMessage(id)
        }
      />
    )
  }
}

export default Message
