import {
  Box,
  Flex,
  Input,
  SimpleGrid,
  Space,
  Text,
  createStyles,
} from '@mantine/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IFavouriteQuestion, Question } from './types'
import TrendingCard from '../TrendingCard'
import { ChatIcon } from '../../common/Svg'

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
    `https://api-dev.chatcrypto.chat/v1.0/question/favourite`,
  )

  return data
}

const ChatSession = () => {
  const { classes } = useStyles()
  const [suggestions, setSuggesstions] = useState<Question[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSuggestionQuestions()
      setSuggesstions(data.data)
    }

    fetchData()
  }, [])

  return (
    <Box pos="relative">
      <Text className={classes.titleText} pb="16px">
        Trending
      </Text>
      <SimpleGrid cols={2}>
        {suggestions.map((suggestion) => {
          return (
            <TrendingCard title="Token Tracking" content={suggestion.text} />
          )
        })}
        {suggestions.map((suggestion) => {
          return (
            <TrendingCard title="Token Tracking" content={suggestion.text} />
          )
        })}
        {suggestions.map((suggestion) => {
          return (
            <TrendingCard title="Token Tracking" content={suggestion.text} />
          )
        })}
      </SimpleGrid>
      <Space h="100px" />
      <Box className={classes.chatWrapper}>
        {' '}
        <Flex justify="flex-start" w="100%" direction="column">
          <Input
            size="md"
            w="100%"
            // value={currentChatMessage}
            // onChange={(e) => {
            //   setCurrentChatMessage(e.target.value)
            // }}
            // onKeyDown={(e) => {
            //   if (e.keyCode === 13 && currentChatMessage) {
            //     toggleChatModeOn()
            //   }
            // }}
            styles={(theme) => ({
              input: {
                borderRadius: '12px',
                padding: '16px',
                height: '56px',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '24px',
                border: '1px solid #EAEAEA',
                paddingRight: '55px',
              },
              rightSection: {
                paddingRight: theme.spacing.md,
                '&:hover': {
                  cursor: 'pointer',
                },
              },
            })}
            rightSection={
              <ChatIcon
                onClick={() => {
                  // if (currentChatMessage) {
                  //   toggleChatModeOn()
                  // }
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

export default ChatSession
