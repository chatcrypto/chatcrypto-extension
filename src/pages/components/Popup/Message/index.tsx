import React, { useContext } from 'react'
import { get } from 'lodash'

import { Avatar, Flex, Paper, rem, Text } from '@mantine/core'

import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setMessageDoneRendering } from '~/pages/context/Popup/ChatContext/reducer'
import {
  CHART_TYPE,
  IMessageDetail,
  ISourceCodeMessage,
} from '~/pages/context/Popup/ChatContext/types'

import GraphMessage from './GraphMessage'
import SourceCodeMessage from './SourceCodeMessage'
import useStyles from './styles'
import TextMessage, { BotMessageWrapper } from './TextMessage'

const Message = ({
  messageDetail,
  scrollToBottom,
}: {
  messageDetail: IMessageDetail
  scrollToBottom: () => void
}) => {
  const { classes } = useStyles()
  const { dispatch } = useContext(ChatContext)
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
      <BotMessageWrapper>
        <TextMessage
          message={message}
          messageStatus={done}
          onHandleFinishRenderingMessage={() =>
            onHandleFinishRenderingMessage(id)
          }
          scrollToBottom={scrollToBottom}
        />
      </BotMessageWrapper>
    )
  }

  if (typeof message === 'object') {
    if (get(message, 'error')) {
      return (
        <BotMessageWrapper>
          <TextMessage
            message={get(message, 'data', '') as string}
            messageStatus={done}
            onHandleFinishRenderingMessage={() =>
              onHandleFinishRenderingMessage(id)
            }
            scrollToBottom={scrollToBottom}
          />
        </BotMessageWrapper>
      )
    }

    if (Array.isArray(message)) {
      return (
        <BotMessageWrapper>
          {message.map((m, index) => {
            if (m.chart_type === CHART_TYPE.TEXT) {
              const messageData = get(m, 'data', '')
              let message = messageData
              if (typeof messageData === 'object') {
                message = get(messageData, 'data', '')
              }
              return (
                <>
                  <TextMessage
                    message={message as string}
                    messageStatus={done}
                    onHandleFinishRenderingMessage={() =>
                      onHandleFinishRenderingMessage(id)
                    }
                    scrollToBottom={scrollToBottom}
                  />
                  {index > 0 && <br />}
                </>
              )
            }

            if (m.chart_type === CHART_TYPE.SOURCE_CODE) {
              return (
                <SourceCodeMessage
                  message={m as unknown as ISourceCodeMessage}
                  onHandleFinishRenderingMessage={() =>
                    onHandleFinishRenderingMessage(id)
                  }
                />
              )
            }

            return (
              <>
                <GraphMessage
                  message={m}
                  messageStatus={done}
                  onHandleFinishRenderingMessage={() =>
                    onHandleFinishRenderingMessage(id)
                  }
                />
                {index > 0 && <br />}
              </>
            )
          })}
        </BotMessageWrapper>
      )
    }

    return <BotMessageWrapper></BotMessageWrapper>
  }

  return null
}

export default Message
