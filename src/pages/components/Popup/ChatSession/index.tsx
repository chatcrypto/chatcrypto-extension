import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { find } from 'lodash'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { v4 as uuidv4 } from 'uuid'

import {
  Box,
  Button,
  createStyles,
  Flex,
  Space,
  Stack,
  Text,
} from '@mantine/core'

import { WEBSOCKET_URL } from '~/constants'
import { AppContext } from '~/pages/context/Popup/AppContext/AppProvider'
import { ChatContext } from '~/pages/context/Popup/ChatContext'
import {
  setAllowTypeWritterEffect,
  setBotChatting,
  setLatestMessageDoneRendering,
  setMessageList,
} from '~/pages/context/Popup/ChatContext/reducer'
import {
  BOT_MESSAGE_TYPE,
  IBotMessage,
} from '~/pages/context/Popup/ChatContext/types'

import ChatInput from '../../common/ChatInput'
import { ChatIcon } from '../../common/Svg'
import Message from '../Message'
import ErrorMessage from '../Message/ErrorMessage'
import LoadingMessage from '../Message/LoadingMessage'

const useStyles = createStyles((theme) => ({
  chatWrapper: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: '90px',
    width: '100%',
    boxShadow: '0px -4px 8px 0px rgba(0, 0, 0, 0.05)',
    backgroundColor: 'white',
    padding: '16px',
  },
  messageListWrapper: {},
  finishChatButton: {
    position: 'fixed',
    bottom: '110px',
    right: 0,
  },
}))

const ChatSession = ({ initMessage }: { initMessage: string }) => {
  const { classes } = useStyles()
  const [currentChatMessage, setCurrentChatMessage] = useState(initMessage)
  const chatSessionRef = useRef<HTMLDivElement | null>(null)
  const { googleAccount } = useContext(AppContext)
  const { state: chatState, dispatch: dispatchChatContext } =
    useContext(ChatContext)
  const { messageList, botChatting } = chatState

  const disabledChat = useMemo(() => {
    const loadingMessage = find(messageList, (messageDetail) => {
      return messageDetail.type === 'loading'
    })

    if (loadingMessage) return true

    return false
  }, [messageList])

  useEffect(() => {
    if (messageList.length <= 1) {
      sendMessage(initMessage)
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
    }
    setCurrentChatMessage('')
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
          dispatchChatContext(setBotChatting(true))
          dispatchChatContext(setAllowTypeWritterEffect(true))
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
    `${WEBSOCKET_URL}/chat/ws/${googleAccount?.token}?network=aptos`,
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
      {botChatting && (
        <Flex
          justify="flex-end"
          mb="8px"
          mr="16px"
          className={classes.finishChatButton}
        >
          <Button
            size="sm"
            onClick={() => dispatchChatContext(setLatestMessageDoneRendering())}
          >
            Finish generating
          </Button>
        </Flex>
      )}
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
        </Flex>
      </Box>
    </Box>
  )
}

export default ChatSession
