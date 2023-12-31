import React, { useContext, useEffect, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import Typewriter from 'typewriter-effect'

import { Anchor, Flex, Paper, Text } from '@mantine/core'

import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setBotChatting } from '~/pages/context/Popup/ChatContext/reducer'
import { extractUrls } from '~/utils/extractUrls'

import { BotIcon } from '../../common/Svg'

import useStyles from './styles'

export const BotMessageWrapper = ({ children }: React.PropsWithChildren) => {
  const { classes } = useStyles()

  return (
    <Flex gap={16} align="flex-start">
      <BotIcon
        style={{
          alignSelf: 'flex-start',
        }}
      />
      <Paper className={classes.secondaryPaperStyle}>{children}</Paper>
    </Flex>
  )
}

const TextMessage = ({
  message,
  messageStatus,
  onHandleFinishRenderingMessage,
  scrollToBottom,
}: {
  message: string
  messageStatus: boolean
  onHandleFinishRenderingMessage: () => void
  scrollToBottom: () => void
}) => {
  const { classes } = useStyles()
  const { state, dispatch } = useContext(ChatContext)
  const [formattedMessage, setFormattedMessage] = useState('')
  useEffect(() => {
    const matches = extractUrls(message)
    if (matches && matches.length !== 0) {
      matches?.forEach((matchedText) => {
        const newMessage = message.replace(
          matchedText,
          ReactDOMServer.renderToStaticMarkup(
            <Anchor href={matchedText} target="__blank">
              {matchedText}
            </Anchor>,
          ),
        )
        setFormattedMessage(newMessage)
      })
    } else {
      setFormattedMessage(message)
    }
  }, [message])
  if (formattedMessage) {
    return (
      <Text className={classes.textStyle}>
        {state.allowTypeWritterEffect && !messageStatus ? (
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(formattedMessage)
                .start()
                .callFunction(() => {
                  const cursorEl = document.querySelector('.Typewriter__cursor')
                  if (cursorEl) {
                    cursorEl.remove()
                  }
                  dispatch(setBotChatting(false))
                  onHandleFinishRenderingMessage()
                })
            }}
            options={{
              delay: 0,
            }}
          />
        ) : (
          <div
            style={{
              wordBreak: 'break-word',
            }}
            dangerouslySetInnerHTML={{
              __html: formattedMessage,
            }}
          />
        )}
      </Text>
    )
  }

  return null
}

export default TextMessage
