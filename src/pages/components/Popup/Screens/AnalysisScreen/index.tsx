import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Box } from '@mantine/core'

import { API_URL } from '~/constants'

import { IPluginDetail, IPluginListDetail, IPluginResponse } from './types'

const getPlugins = async (domain: string) => {
  const { data } = await axios.get<IPluginResponse<IPluginListDetail>>(
    `${API_URL}/v1.0/domain/plugins?domain=${domain}`,
  )

  if (data && data.message === 'success') {
    return data.data
  }
}

const getPluginDetail = async (pluginId: string, domain: string) => {
  const { data } = await axios.get<IPluginResponse<IPluginDetail>>(
    `${API_URL}/v1.0/domain/plugin/detail?domain=${domain}&plugin_id=${pluginId}`,
  )

  console.log(data, 'data ?')
}

const AnalysisScreen = () => {
  const [plugins, setPlugins] = useState<IPluginListDetail[]>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      try {
        // Check if we have a valid tab and URL
        if (tabs.length > 0 && tabs[0].url) {
          // Get the URL and display it in the popup HTML
          const url = tabs[0].url

          if (url) {
            const domain = new URL(url).hostname
            const plugins = await getPlugins(domain)
            setPlugins(plugins)
          }
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error, 'fail to get plugin list')
        setIsLoading(false)
      }
    })
  }, [])

  return <Box pos="relative">Welcome to analysis screen</Box>
}

export default AnalysisScreen
