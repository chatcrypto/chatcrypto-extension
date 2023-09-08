import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor'

import { Box, createStyles, Skeleton, Stack } from '@mantine/core'

import { API_URL } from '~/constants'

import {
  IPluginDetail,
  IPluginDetailResponse,
  IPluginListDetail,
  PluginType,
} from '../Screens/AnalysisScreen/types'

import GroupedBarChart from './GroupedBarChart'
import LineChart from './LineChart'
import PieChart from './PieChart'
import VerticalBarChart from './VerticalBarChart'

const useStyles = createStyles(
  (theme, { isWideChart }: { isWideChart?: boolean }) => ({
    boxWrapper: {
      borderRadius: '16px',
      border: '1px solid #eaeaea',
      padding: '24px',
      backgroundColor: 'white',
      canvas: {
        width: '100% !important',
        height: isWideChart ? 'auto !important' : '100% !important',
        aspectRatio: isWideChart ? '0.8' : 'unset',
      },
    },
  }),
)

const getPluginDetail = async (pluginId: string, domain: string) => {
  const { data } = await axios.get<IPluginDetailResponse<IPluginDetail>>(
    `${API_URL}/v1.0/domain/plugin/detail?domain=${domain}&plugin_id=${pluginId}`,
  )
  return data.data
}

const PluginGraph = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const { data } = pluginDetail
  const { classes } = useStyles({
    isWideChart:
      pluginDetail?.chart_type === PluginType.LineChart,
  })
  if (data === 'No Data') {
    return null
  }

  return (
    <Box className={classes.boxWrapper}>
      {pluginDetail?.chart_type === PluginType.LineChart && (
        <LineChart pluginDetail={pluginDetail} />
      )}
      {pluginDetail?.chart_type === PluginType.PieChart && (
        <PieChart pluginDetail={pluginDetail} />
      )}
      {pluginDetail?.chart_type === PluginType.GroupedBarChart && (
        <GroupedBarChart pluginDetail={pluginDetail} />
      )}
    </Box>
  )
}

const PluginDetail = ({
  plugin,
  domain,
}: {
  plugin: IPluginListDetail
  domain: string
}) => {
  const [pluginDetail, setPluginDetai] = useState<IPluginDetail>()
  const [isVisibilitySensorActive, setIsVisibilitySensorActive] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const { classes } = useStyles({})
  const onHandleVisibilityChange = (isVisible: boolean) => {
    if (!isVisible) return
    setIsVisibilitySensorActive(false)
  }

  const fetchPlugin = useCallback(async () => {
    try {
      if (plugin.plugin_id && domain) {
        const pluginRes = await getPluginDetail(plugin.plugin_id, domain)
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
      {isLoading || !pluginDetail ? (
        <Box className={classes.boxWrapper}>
          <Stack w="100%" spacing="24px">
            <Skeleton height={100} width="100%" radius="xs" />
            <Skeleton height={100} width="100%" radius="xs" />
          </Stack>
        </Box>
      ) : (
        <PluginGraph pluginDetail={pluginDetail} />
      )}
    </VisibilitySensor>
  )
}

export default PluginDetail
