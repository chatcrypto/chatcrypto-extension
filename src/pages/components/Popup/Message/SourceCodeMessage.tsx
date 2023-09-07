import React, { useContext, useEffect, useMemo } from 'react'
import { HexString } from 'aptos'
import pako from 'pako'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import rust from 'react-syntax-highlighter/dist/cjs/languages/hljs/rust'

import styled from '@emotion/styled'
import { Box, Text } from '@mantine/core'

import { ChatContext } from '~/pages/context/Popup/ChatContext'
import { setBotChatting } from '~/pages/context/Popup/ChatContext/reducer'
import { ISourceCodeMessage } from '~/pages/context/Popup/ChatContext/types'

import JsonView from './JsonView'
import useSyntaxHighlighterViewTheme from './useSyntaxHighligherViewTheme'

SyntaxHighlighter.registerLanguage('rust', rust)

const CodeWrap = styled(SyntaxHighlighter)`
  border-radius: 16px;
  font-size: 14px;
  overflow-x: scroll;
  margin-top: 16px;
  .linenumber {
    min-width: 60px !important;
  }
  padding: 20px !important;

  @media (max-width: 576px) {
    padding: 10px !important;
  }
`

export const transformByteCode = (bytecode?: string): string => {
  try {
    if (bytecode) {
      return pako.ungzip(new HexString(bytecode).toUint8Array(), {
        to: 'string',
      })
    }

    return ''
  } catch (error) {
    return ''
  }
}

const SourceCodeMessage = ({
  message,
  onHandleFinishRenderingMessage,
}: {
  message: ISourceCodeMessage
  onHandleFinishRenderingMessage: () => void
}) => {
  const { state, dispatch } = useContext(ChatContext)
  const syntaxTheme = useSyntaxHighlighterViewTheme()
  const { title } = message
  const { code, language } = message.data
  const transformedString = useMemo(() => {
    if (language === 'rust') {
      if (code && code !== '0x') {
        return transformByteCode(code)
      }
    }
    console.log(JSON.parse(code), 'code ?')
    return JSON.parse(code)
  }, [message.data])

  useEffect(() => {
    onHandleFinishRenderingMessage()
    dispatch(setBotChatting(false))
  }, [])

  return (
    <>
      <Text
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          color: '#353535',
          lineHeight: '28px',
          wordBreak: 'break-word',
        }}
      >
        {title}
      </Text>
      {language === 'rust' && (
        <CodeWrap
          language="rust"
          wrapLines={true}
          wrapLongLines={false}
          theme={syntaxTheme}
        >
          {transformedString as string}
        </CodeWrap>
      )}
      {language === 'json' && (
        <Box
          style={{
            lineBreak: 'anywhere',
            height: '100%',
            marginTop: '16px'
          }}
        >
          <JsonView
            src={transformedString}
            containerStyle={{}}
            reactJsonStyle={{
              borderRadius: '16px',
              fontSize: '14px',
              padding: '16px',
            }}
          />
        </Box>
      )}
    </>
  )
}

export default SourceCodeMessage
