import React from 'react'
import { get } from 'lodash'

import { Anchor, Box, Flex, Paper, Text } from '@mantine/core'

import {
  IDataListPlugin,
  IPluginDetail,
} from '../../Screens/AnalysisScreen/types'
import useStyles from '../styles'

const ListPlugin = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const { classes } = useStyles()
  const { reference, title, description } = pluginDetail
  const listData = get(
    pluginDetail,
    'data',
    {} as IDataListPlugin,
  ) as IDataListPlugin
  console.log(pluginDetail)
  return (
    <Flex gap={16} align="flex-start">
      <Paper className={classes.secondaryPaperStyle}>
        <Box>
          <Text className={classes.titleText}>{title}</Text>
          <Text className={classes.secondaryTextStyle}>{description}</Text>
        </Box>
        <Flex
          justify="flex-start"
          align="flex-start"
          direction="column"
          gap={12}
          mt={12}
        >
          {Object.keys(listData).map((key) => (
            <Text
              sx={{
                fontWeight: 700,
                fontSize: 14,
                color: '#6F8AFE',
              }}
            >
              {key}:{' '}
              <Text
                sx={{
                  // display: 'inline-block',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#353535',
                }}
              >
                {listData[key]}
              </Text>
            </Text>
          ))}
        </Flex>
        {reference && (
          <Text className={classes.referenceText} mt="sm">
            You can look it up
            <Anchor href={reference} target="_blank" inline>
              {' '}
              here{' '}
            </Anchor>
            for reference
          </Text>
        )}
      </Paper>
    </Flex>
  )
}

export default ListPlugin
