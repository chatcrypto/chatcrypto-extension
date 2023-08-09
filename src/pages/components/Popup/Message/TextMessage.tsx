import React, { useContext, useEffect, useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import Typewriter from 'typewriter-effect'

import { Anchor, Flex, Paper, Text } from '@mantine/core'

import useStyles from './styles'
import { extractUrls } from '~/utils/extractUrls'
import { BotIcon } from '../../common/Svg'
import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setBotChatting } from '~/pages/context/Popup/ChatContext/reducer'

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
    dispatch(setBotChatting(true))
  }, [])

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
      <Flex gap={16} align="flex-start">
        <BotIcon
          style={{
            alignSelf: 'flex-start',
          }}
        />
        <Paper className={classes.secondaryPaperStyle}>
          <Text className={classes.textStyle}>
            {state.allowTypeWritterEffect && !messageStatus ? (
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(formattedMessage)
                    .start()
                    .callFunction(() => {
                      const cursorEl = document.querySelector(
                        '.Typewriter__cursor',
                      )
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
                  wordBreak: 'break-all',
                }}
                dangerouslySetInnerHTML={{
                  __html: formattedMessage,
                }}
              />
            )}
          </Text>
        </Paper>
      </Flex>
    )
  }
}

export default TextMessage
