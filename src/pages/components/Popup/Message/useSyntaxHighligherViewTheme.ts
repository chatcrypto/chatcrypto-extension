import React from 'react'

const useSyntaxHighlighterViewTheme = () => {
  const textColor = '#F6F6F6'
  const subTextColor = '#6F8AFE'

  return {
    'hljs-comment': {
      color: textColor,
    },
    'hljs-quote': {
      color: '#696969',
    },
    'hljs-variable': {
      color: textColor,
    },
    'hljs-template-variable': {
      color: textColor,
    },
    'hljs-tag': {
      color: textColor,
    },
    'hljs-name': {
      color: textColor,
    },
    'hljs-selector-id': {
      color: textColor,
    },
    'hljs-selector-class': {
      color: textColor,
    },
    'hljs-regexp': {
      color: textColor,
    },
    'hljs-deletion': {
      color: textColor,
    },
    'hljs-number': {
      color: subTextColor,
    },
    'hljs-built_in': {
      color: subTextColor,
    },
    'hljs-builtin-name': {
      color: subTextColor,
    },
    'hljs-literal': {
      color: subTextColor,
    },
    'hljs-type': {
      color: subTextColor,
    },
    'hljs-params': {
      color: subTextColor,
    },
    'hljs-meta': {
      color: subTextColor,
    },
    'hljs-link': {
      color: subTextColor,
    },
    'hljs-attribute': {
      color: subTextColor,
    },
    'hljs-string': {
      color: subTextColor,
    },
    'hljs-symbol': {
      color: subTextColor,
    },
    'hljs-bullet': {
      color: subTextColor,
    },
    'hljs-addition': {
      color: subTextColor,
    },
    'hljs-title': {
      color: '#007faa',
    },
    'hljs-section': {
      color: '#007faa',
    },
    'hljs-keyword': {
      color: subTextColor,
    },
    'hljs-selector-tag': {
      color: '#7928a1',
    },
    hljs: {
      display: 'block',
      fontFamily: 'monospace',
      overflowX: 'auto',
      background: '#f6f6f6', // background color
      color: '#353535',
      padding: '0.5em',
    },
    'hljs-emphasis': {
      fontStyle: 'italic',
    },
    'hljs-strong': {
      fontWeight: 'bold',
    },
  } as { [key: string]: React.CSSProperties }
}

export default useSyntaxHighlighterViewTheme
