import React, { CSSProperties } from 'react'
import ReactJsonView, { ReactJsonViewProps }  from 'react-json-view'

import { Box } from '@mantine/core'

interface JsonViewProps extends ReactJsonViewProps {
  /** Style of the container of the formatted JSON object */
  containerStyle?: CSSProperties
  /** Customized react-json-view CSS */
  reactJsonStyle?: CSSProperties
}

const useJsonViewTheme = () => {
  const textColor = '#353535'
  const subTextColor = '#6F8AFE'
  const colorJsonLine = '#D8D8D8'

  return {
    scheme: 'aptscan',
    author: 'aptscan',
    base00: '#fff', // background color
    base01: textColor,
    base02: colorJsonLine,
    base03: textColor,
    base04: subTextColor,
    base05: textColor,
    base06: textColor,
    base07: textColor, // key color
    base08: textColor,
    base09: '#6F8AFE', // value and data type color
    base0A: textColor,
    base0B: textColor,
    base0C: textColor,
    base0D: textColor, // object triangle color
    base0E: textColor, // array triangle color
    base0F: textColor, //
  }
}

export const jsonCopy = (value: any) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
    const val = value.src
    const str = typeof val === 'string' ? val : JSON.stringify(val, null, '  ')
    return navigator.clipboard.writeText(str)
  }
  // Used when the browser does not support Navigator.clipboard
  const container = document.createElement('textarea')
  const val = value.src
  container.innerHTML =
    typeof val === 'string' ? val : JSON.stringify(val, null, '  ')

  document.body.appendChild(container)
  container.select()
  // copy the same quote-less value back to the clipboard
  document.execCommand('copy')
  document.body.removeChild(container)
}

const JsonView = ({
  containerStyle = {},
  reactJsonStyle = {},
  ...props
}: JsonViewProps) => {
  const COLLAPSE_STRINGS_AFTER_LENGTH = 80
  return (
    <Box
      styles={{
        lineBreak: 'anywhere',
        borderRadius: '10px',
        wordBreak: 'break-all',
        overflowY: 'auto',
        ...containerStyle,
      }}
    >
      <ReactJsonView
        name={null}
        theme={useJsonViewTheme()}
        enableClipboard={jsonCopy}
        displayObjectSize={false}
        quotesOnKeys={false}
        displayDataTypes={false}
        collapseStringsAfterLength={COLLAPSE_STRINGS_AFTER_LENGTH}
        style={{
          whiteSpace: 'pre-wrap',
          ...reactJsonStyle,
        }}
        {...props}
      />
    </Box>
  )
}

export default JsonView