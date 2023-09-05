import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import {
  Box,
  createStyles,
  Flex,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
} from '@mantine/core'

import { API_URL } from '~/constants'
import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setChatMode } from '~/pages/context/Popup/ChatContext/reducer'

import ChatInput from '../../../common/ChatInput'
import { ChatIcon } from '../../../common/Svg'
import ChatSession from '../../ChatSession'
import TrendingCard from '../../TrendingCard'

import { IFavouriteQuestion, Question } from './types'

const useStyles = createStyles((theme) => ({
  titleText: {
    fontSize: '18px',
    fontWeight: 700,
    lineHeight: '24px',
  },
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
}))

const getSuggestionQuestions = async () => {
  const { data } = await axios.get<IFavouriteQuestion>(
    `${API_URL}/v1.0/question/favourite`,
  )

  return data
}

const ChatIntroScreen = () => {
  const { classes } = useStyles()
  const [suggestions, setSuggesstions] = useState<Question[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const { state: chatState, dispatch: dispatchChatContext } =
    useContext(ChatContext)
  const [currentChatMessage, setCurrentChatMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingSuggestions(true)
        const data = await getSuggestionQuestions()
        setSuggesstions(data.data)
        setIsLoadingSuggestions(false)
      } catch (error) {
        setIsLoadingSuggestions(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    return () => {
      dispatchChatContext(setChatMode(false))
    }
  }, [])

  const onTriggerChatMode = (message: string) => {
    setCurrentChatMessage(message)
    dispatchChatContext(setChatMode(true))
  }

  if (chatState.chatMode) {
    return <ChatSession initMessage={currentChatMessage} />
  }

  return (
    <Box pos="relative">
      <Text className={classes.titleText} pb="16px">
        Trending
      </Text>
      {isLoadingSuggestions ? (
        <>
          <Flex gap={20}>
            <Skeleton h={50} radius="12px" mt={16} />
            <Skeleton h={50} radius="12px" mt={16} />
          </Flex>
          <Flex gap={20}>
            <Skeleton h={50} radius="12px" mt={16} />
            <Skeleton h={50} radius="12px" mt={16} />
          </Flex>
          <Flex gap={20}>
            <Skeleton h={50} radius="12px" mt={16} />
            <Skeleton h={50} radius="12px" mt={16} />
          </Flex>
        </>
      ) : (
        <SimpleGrid cols={2}>
          {suggestions.map((suggestion) => {
            return (
              <TrendingCard
                title="Token Tracking"
                content={suggestion.text}
                onClick={() => onTriggerChatMode(suggestion.text)}
              />
            )
          })}
          {suggestions.map((suggestion) => {
            return (
              <TrendingCard
                title="Token Tracking"
                content={suggestion.text}
                onClick={() => onTriggerChatMode(suggestion.text)}
              />
            )
          })}
          {suggestions.map((suggestion) => {
            return (
              <TrendingCard
                title="Token Tracking"
                content={suggestion.text}
                onClick={() => onTriggerChatMode(suggestion.text)}
              />
            )
          })}
        </SimpleGrid>
      )}

      <Space h="100px" />
      <Box className={classes.chatWrapper}>
        {' '}
        <Flex justify="flex-start" w="100%" direction="column">
          <ChatInput
            value={currentChatMessage}
            onChange={(e) => {
              setCurrentChatMessage(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && currentChatMessage) {
                dispatchChatContext(setChatMode(true))
              }
            }}
            rightSection={
              <ChatIcon
                onClick={() => {
                  if (currentChatMessage) {
                    dispatchChatContext(setChatMode(true))
                  }
                }}
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

export default ChatIntroScreen
