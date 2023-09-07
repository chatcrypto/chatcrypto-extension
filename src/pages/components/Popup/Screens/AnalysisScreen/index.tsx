import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Box, rem,Stack, Text } from '@mantine/core'

import { API_URL } from '~/constants'

import PluginDetail from '../../PluginDetail'

import { IPluginListDetail, IPluginResponse } from './types'

const getPlugins = async (domain: string) => {
  const { data } = await axios.get<IPluginResponse<IPluginListDetail>>(
    `${API_URL}/v1.0/domain/plugins?domain=${domain}`,
  )

  if (data && data.message === 'success') {
    return data.data
  }
}

const getDomain = (url: string) => {
  const domainArr = new URL(url).hostname.split('.')
  return domainArr[domainArr.length - 2] + '.' + domainArr[domainArr.length - 1]
}

const AnalysisScreen = () => {
  const [plugins, setPlugins] = useState<IPluginListDetail[]>()
  const [isLoading, setIsLoading] = useState(true)
  const [domain, setDomain] = useState('')

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      try {
        // Check if we have a valid tab and URL
        if (tabs.length > 0 && tabs[0].url) {
          // Get the URL and display it in the popup HTML
          const url = tabs[0].url
          if (url) {
            const domainStr = getDomain(url)
            const plugins = await getPlugins(domainStr)
            setPlugins(plugins)
            setDomain(domainStr)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error, 'fail to get plugin list')
        setIsLoading(false)
      }
    })
  }, [])

  return (
    <Box pos="relative">
      <Text sx={(theme) => ({
        fontWeight: 700,
        fontSize: rem(20)
      })}>Welcome to analysis screen</Text>
      <Stack spacing="24px" mt="24px">
        {plugins?.map((plugin) => (
          <PluginDetail
            key={plugin.plugin_id}
            plugin={plugin}
            domain={domain}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default AnalysisScreen
