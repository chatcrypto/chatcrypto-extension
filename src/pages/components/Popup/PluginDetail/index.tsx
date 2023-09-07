import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor'

import { Box, createStyles, Flex, Loader } from '@mantine/core'

import { API_URL } from '~/constants'

import {
  IPluginDetail,
  IPluginDetailResponse,
  IPluginListDetail,
  PluginType,
} from '../Screens/AnalysisScreen/types'

import LineChart from './LineChart'
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'

const getPluginDetail = async (pluginId: string, domain: string) => {
  const { data } = await axios.get<IPluginDetailResponse<IPluginDetail>>(
    `${API_URL}/v1.0/domain/plugin/detail?domain=${domain}&plugin_id=${pluginId}`,
  )
  return data.data
}

const useStyles = createStyles((theme) => ({
  boxWrapper: {
    canvas: {
      width: '100% !important',
      height: '100% !important',
    },
  },
}))

const PluginDetail = ({
  plugin,
  domain,
}: {
  plugin: IPluginListDetail
  domain: string
}) => {
  const { classes } = useStyles()
  const [pluginDetail, setPluginDetai] = useState<IPluginDetail>()
  const [isVisibilitySensorActive, setIsVisibilitySensorActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const onHandleVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) return
    setIsVisibilitySensorActive(false)
  }

  const fetchPlugin = useCallback(async () => {
    try {
      if (plugin.plugin_id && domain) {
        const pluginRes = await getPluginDetail(plugin.plugin_id, domain)
        console.log(pluginRes, 'RES ?')
        setPluginDetai(pluginRes)
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }, [plugin, domain])

  useEffect(() => {
    if (!isVisibilitySensorActive) {
      fetchPlugin()
    }
  }, [isVisibilitySensorActive, fetchPlugin])

  return (
    <VisibilitySensor
      onChange={onHandleVisibilityChange}
      active={isVisibilitySensorActive}
      partialVisibility
    >
      <Box
        className={classes.boxWrapper}
        sx={{
          borderRadius: '16px',
          border: '1px solid #eaeaea',
          padding: '24px',
          backgroundColor: 'white',
          marginTop: '20px',
        }}
      >
        {isLoading ? (
          <Flex w="100%" justify="center" align="center">
            <Loader />
          </Flex>
        ) : (
          <>
            {pluginDetail?.chart_type === PluginType.LineChart && (
              <LineChart pluginDetail={pluginDetail} />
            )}
            {pluginDetail?.chart_type === PluginType.PieChart && (
              <PieChart pluginDetail={pluginDetail} />
            )}
            {/* {pluginDetail && <VerticalBarChart pluginDetail={pluginDetail} />}
            {pluginDetail && <PieChart pluginDetail={pluginDetail} />} */}
          </>
        )}
      </Box>
    </VisibilitySensor>
  )
}

export default PluginDetail
