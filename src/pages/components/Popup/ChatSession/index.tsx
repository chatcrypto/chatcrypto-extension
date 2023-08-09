import {
  Box,
  Flex,
  Input,
  Space,
  Stack,
  Text,
  createStyles,
} from '@mantine/core'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setMessageList } from '~/pages/context/Popup/ChatContext/reducer'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { API_URL, WEBSOCKET_URL } from '~/constants'
import {
  BOT_MESSAGE_TYPE,
  IBotMessage,
} from '~/pages/context/Popup/ChatContext/types'
import LoadingMessage from '../Message/LoadingMessage'
import ChatInput from '../../common/ChatInput'
import { ChatIcon } from '../../common/Svg'
import ErrorMessage from '../Message/ErrorMessage'
import Message from '../Message'
import { find } from 'lodash'

const useStyles = createStyles((theme) => ({
  chatWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '110px',
    boxShadow: '0px -4px 8px 0px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    padding: '16px',
    width: '100%',
  },
  messageListWrapper: {},
}))

const ChatSession = ({ initMessage }: { initMessage: string }) => {
  const { classes } = useStyles()
  const [currentChatMessage, setCurrentChatMessage] = useState(initMessage)
  const chatSessionRef = useRef<HTMLDivElement | null>(null)
  const { state: chatState, dispatch: dispatchChatContext } =
    useContext(ChatContext)
  const { messageList } = chatState

  const disabledChat = useMemo(() => {
    const loadingMessage = find(messageList, (messageDetail) => {
      return messageDetail.type === 'loading'
    })

    if (loadingMessage) return true

    return false
  }, [messageList])

  useEffect(() => {
    sendMessage(initMessage)
    setCurrentChatMessage('')
    dispatchChatContext(
      setMessageList([
        {
          type: 'user',
          message: initMessage,
          done: true,
          id: uuidv4(),
        },
      ]),
    )
  }, [])

  const scrollToBottom = () => {
    if (chatSessionRef && chatSessionRef.current) {
      chatSessionRef.current.scrollTop = chatSessionRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messageList])

  const onHandleReceiveMessage = (e: MessageEvent<string>) => {
    try {
      const receivedData = e.data
      if (receivedData) {
        const { type, sender, message }: IBotMessage = JSON.parse(receivedData)
        if (
          (type === BOT_MESSAGE_TYPE.THINKING ||
            type === BOT_MESSAGE_TYPE.RECEIVE) &&
          sender === 'bot'
        ) {
          dispatchChatContext(
            setMessageList([
              ...messageList,
              {
                type: 'loading',
                message: '',
                done: true,
                id: uuidv4(),
              },
            ]),
          )
        }

        if (sender === 'bot' && type === BOT_MESSAGE_TYPE.END) {
          const newMessageList = messageList.filter((m) => m.type !== 'loading')
          dispatchChatContext(
            setMessageList([
              ...newMessageList,
              {
                type: 'bot',
                message,
                done: false,
                id: uuidv4(),
              },
            ]),
          )
        }

        if (sender === 'bot' && type === BOT_MESSAGE_TYPE.ERROR) {
          const newMessageList = messageList.filter((m) => m.type !== 'loading')
          dispatchChatContext(
            setMessageList([
              ...newMessageList,
              {
                type: 'error',
                message: '',
                done: true,
                id: uuidv4(),
              },
            ]),
          )
        }
      }
    } catch (error) {
      console.log(error, 'Fail to parse message')
    }
  }

  const onHandleReloadMessage = () => {}

  const onHandleSendUserMessage = () => {
    if (currentChatMessage) {
      sendMessage(currentChatMessage)
      dispatchChatContext(
        setMessageList([
          ...messageList,
          {
            type: 'user',
            message: currentChatMessage,
            done: true,
            id: uuidv4(),
          },
        ]),
      )
      setCurrentChatMessage('')
    }
  }

  const { sendMessage } = useWebSocket(
    `${WEBSOCKET_URL}/chat/ws/b0fce2548e1a6ed1721066bf69e5feb9e67610aa534bac36a0722cbd2997b2c9`,
    {
      onMessage: onHandleReceiveMessage,
      onError: (e) => {
        console.log(e, 'error ?')
      },
      reconnectInterval: 3000,
      shouldReconnect: (e) => true,
    },
  )

  return (
    <Box pos="relative">
      <Box className={classes.messageListWrapper} ref={chatSessionRef}>
        <Stack>
          {messageList.map((messageDetail, index) => {
            if (messageDetail.type === 'loading') {
              return <LoadingMessage key={index} />
            }

            if (messageDetail.type === 'error') {
              return (
                <ErrorMessage
                  key={index}
                  reloadMessage={onHandleReloadMessage}
                />
              )
            }

            return (
              <Message
                key={index}
                messageDetail={messageDetail}
                scrollToBottom={scrollToBottom}
              />
            )
          })}
        </Stack>
        <Space h="110px" />
      </Box>
      <Box className={classes.chatWrapper}>
        <Flex justify="flex-start" w="100%" direction="column">
          <ChatInput
            disabled={disabledChat || chatState.botChatting}
            value={currentChatMessage}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                onHandleSendUserMessage()
              }
            }}
            onChange={(e) => {
              setCurrentChatMessage(e.target.value)
            }}
            rightSection={
              <ChatIcon
                onClick={() => onHandleSendUserMessage()}
                style={{
                  width: '25px',
                  height: '25px',
                }}
              />
            }
            placeholder="Ask or search anything you need to know about web3..."
          />
          <Space h="8px" />
          <Text
            size="sm"
            sx={{
              color: '#8B8B8B',
            }}
          >
            Check out our{' '}
            <Text
              fw={700}
              sx={{
                color: '#1990FF',
                display: 'inline',
              }}
            >
              Prompt Library{' '}
            </Text>
            for inspiration
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default ChatSession
