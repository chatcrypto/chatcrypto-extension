import React, { useContext, useEffect, useMemo } from 'react'
import dayjs from 'dayjs'

import { Anchor, Badge, Box, Flex, Paper, Text, Tooltip } from '@mantine/core'

import CopyToClipBoardButton from '~/pages/components/common/CopyToClipboardButton'
import { formatAccAddress } from '~/utils/formatAccAddress'
import { formatFunctionString } from '~/utils/formatFunctionString'

import {
  IDataTablePlugin,
  IPluginDetail,
  PluginType,
} from '../../Screens/AnalysisScreen/types'
import useStyles from '../styles'

const CellValue = ({
  column,
  value,
}: {
  column: string
  value: string | number
}) => {
  const { classes } = useStyles()
  if (column === 'Time') {
    return <>{dayjs(value).format('HH:mm MMM-D-YY ')}</>
  }

  if (
    column === 'Hash' ||
    column === 'Sender' ||
    column === 'Receiver' ||
    column === 'Account'
  ) {
    return (
      <Flex align="center">
        <Tooltip label={value as string}>
          <Text>{formatAccAddress(value as string)}</Text>
        </Tooltip>
        <CopyToClipBoardButton isOnlyIcon value={value as string} />
      </Flex>
    )
  }

  if (column === 'Function') {
    const functionString = formatFunctionString(value as string)

    return (
      <Flex>
        <Box
          sx={{
            borderRadius: '12px',
            padding: '0px 10px',
            width: 'fit-content',
            backgroundColor: '#e9edff',
          }}
        >
          {functionString}
        </Box>
        <CopyToClipBoardButton isOnlyIcon value={value as string} />
      </Flex>
    )
  }

  if (column === 'Success') {
    return <>{JSON.stringify(value)}</>
  }

  return <>{value}</>
}

const TableUI = ({
  data,
  reference,
  title,
  description,
}: {
  data: IDataTablePlugin
  title: string
  description: string
  reference: string
}) => {
  const { row_data, table_header } = data
  const { classes } = useStyles()

  const rows = useMemo(() => {
    return row_data.map((row, index) => (
      <tr key={index} className={classes.tableMainText}>
        {row.map((v, cIndex) => {
          if (table_header[cIndex].toLocaleLowerCase() === 'status') {
            return (
              <td key={cIndex}>
                <Badge
                  variant="gradient"
                  gradient={
                    v.toLowerCase() === 'success'
                      ? { from: 'teal', to: 'lime', deg: 105 }
                      : { from: 'orange', to: 'red' }
                  }
                >
                  {v}
                </Badge>
              </td>
            )
          }
          return (
            <td key={cIndex} className={classes.tableMainText}>
              <CellValue value={v} column={table_header[cIndex]} />
            </td>
          )
        })}
      </tr>
    ))
  }, [row_data])

  return (
    <>
      <Box className={classes.tableWrapper}>
        <table className={classes.table}>
          <thead>
            <tr>
              <th colSpan={table_header.length} className={classes.tableTitle}>
                <Text className={classes.titleText}>{title}</Text>
                <Text className={classes.secondaryTextStyle}>
                  {description}
                </Text>
              </th>
            </tr>
            <tr>
              {table_header.map((tHead, hIndex) => {
                return (
                  <th key={hIndex} className={classes.tableHeader}>
                    {tHead}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </Box>
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
    </>
  )
}

const GraphPlugin = ({ pluginDetail }: { pluginDetail: IPluginDetail }) => {
  const { classes } = useStyles()
  const { description, title, chart_type, data, reference } = pluginDetail

  return (
    <Flex gap={16} align="flex-start">
      <Paper className={classes.secondaryPaperStyle}>
        <TableUI
          data={data as IDataTablePlugin}
          reference={reference || ''}
          title={title}
          description={description}
        />
      </Paper>
    </Flex>
  )
}

export default GraphPlugin
