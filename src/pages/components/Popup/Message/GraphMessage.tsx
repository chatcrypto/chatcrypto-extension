import React, { useContext, useEffect, useMemo } from 'react'
import ReactDOMServer from 'react-dom/server'
import Typewriter from 'typewriter-effect'

import { Anchor, Badge, Box, Flex, Paper, Text } from '@mantine/core'

import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setBotChatting } from '~/pages/context/Popup/ChatContext/reducer'
import {
  CHART_TYPE,
  ChartMessage,
} from '~/pages/context/Popup/ChatContext/types'

import { BotIcon } from '../../common/Svg'

import useStyles from './styles'

interface ITableUI {
  data: {
    row_data: string[][]
    table_header: string[]
  }
  referencer: string
  title: string
  description: string
  onHandleBotFinish: () => void
  onHandleBotChatStarting: () => void
  onHandleFinishRenderingMessage: () => void
}

interface IListUI {
  data: Record<string, any>
  referencer: string
  title: string
  description: string
  onHandleBotFinish: () => void
  onHandleBotChatStarting: () => void
  messageStatus: boolean
  onHandleFinishRenderingMessage: () => void
}

const TableUI = ({
  data,
  referencer,
  title,
  description,
  onHandleBotFinish,
  onHandleFinishRenderingMessage,
}: ITableUI) => {
  const { row_data, table_header } = data
  const { classes } = useStyles()

  useEffect(() => {
    onHandleBotFinish()
    onHandleFinishRenderingMessage()
  }, [])

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
              {v}
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
      <Text className={classes.referenceText} mt="sm">
        You can look it up
        <Anchor href={referencer} target="_blank" inline>
          {' '}
          here{' '}
        </Anchor>
        for reference
      </Text>
    </>
  )
}

const ListUI = ({
  data,
  referencer,
  title,
  description,
  onHandleBotFinish,
  onHandleBotChatStarting,
  messageStatus,
  onHandleFinishRenderingMessage,
}: IListUI) => {
  const { classes } = useStyles()
  const { state } = useContext(ChatContext)
  useEffect(() => {
    onHandleBotChatStarting()
  }, [])

  if (state.allowTypeWritterEffect && !messageStatus) {
    return (
      <>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString(
                ReactDOMServer.renderToStaticMarkup(
                  <Text className={classes.titleText} display="inline">
                    {title} <br />
                  </Text>,
                ),
              )
              .pauseFor(300)
              .typeString(
                ReactDOMServer.renderToStaticMarkup(
                  <Text
                    className={classes.secondaryTextStyle}
                    style={{
                      marginBottom: '8px',
                    }}
                    display="inline"
                  >
                    {description}
                  </Text>,
                ),
              )
              .typeString(
                ReactDOMServer.renderToStaticMarkup(
                  <span>
                    {Object.keys(data).map((listKey, index) => {
                      return (
                        <span
                          key={index}
                          className={classes.secondaryTextStyle}
                        >
                          {listKey}: {data[listKey]} <br />
                        </span>
                      )
                    })}
                  </span>,
                ),
              )
              .pauseFor(300)
              .typeString(
                ReactDOMServer.renderToStaticMarkup(
                  <span className={classes.referenceText}>
                    You can look it up
                    <Anchor href={referencer} target="_blank" inline>
                      {' '}
                      here{' '}
                    </Anchor>
                    for reference
                  </span>,
                ),
              )
              .start()
              .callFunction(() => {
                const cursorEl = document.querySelector('.Typewriter__cursor')
                onHandleBotFinish()
                onHandleFinishRenderingMessage()
                if (cursorEl) {
                  cursorEl.remove()
                }
              })
          }}
          options={{
            delay: 0,
          }}
        />
      </>
    )
  }

  return (
    <>
      <Text className={classes.titleText} display="inline">
        {title} <br />
      </Text>
      <Text
        className={classes.secondaryTextStyle}
        style={{
          marginBottom: '8px',
        }}
        display="inline"
      >
        {description}
      </Text>
      <span>
        {Object.keys(data).map((listKey, index) => {
          return (
            <span key={index} className={classes.secondaryTextStyle}>
              {listKey}: {data[listKey]} <br />
            </span>
          )
        })}
      </span>
      <span className={classes.referenceText}>
        You can look it up
        <Anchor href={referencer} target="_blank" inline>
          {' '}
          here{' '}
        </Anchor>
        for reference
      </span>
    </>
  )
}

const GraphMessage = ({
  message,
  messageStatus,
  onHandleFinishRenderingMessage,
}: {
  message: ChartMessage
  messageStatus: boolean
  onHandleFinishRenderingMessage: () => void
}) => {
  const { classes } = useStyles()
  const { state, dispatch } = useContext(ChatContext)
  const { description, title, chart_type, data, referencer } = message

  const onHandleBotChatStarting = () => {
    dispatch(setBotChatting(true))
  }

  const onHandleBotFinish = () => {
    dispatch(setBotChatting(false))
  }

  return (
    <Flex gap={16} align="flex-start">
      <BotIcon
        style={{
          alignSelf: 'flex-start',
        }}
      />
      <Paper className={classes.secondaryPaperStyle}>
        {chart_type === CHART_TYPE.TABLE && (
          <TableUI
            data={data}
            referencer={referencer}
            title={title}
            description={description}
            onHandleBotFinish={onHandleBotFinish}
            onHandleBotChatStarting={onHandleBotChatStarting}
            onHandleFinishRenderingMessage={onHandleFinishRenderingMessage}
          />
        )}

        {chart_type === CHART_TYPE.LIST && (
          <ListUI
            data={data}
            referencer={referencer}
            title={title}
            description={description}
            onHandleBotFinish={onHandleBotFinish}
            onHandleBotChatStarting={onHandleBotChatStarting}
            messageStatus={messageStatus}
            onHandleFinishRenderingMessage={onHandleFinishRenderingMessage}
          />
        )}
      </Paper>
    </Flex>
  )
}

export default GraphMessage
