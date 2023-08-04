import React from 'react'
import { createRoot } from 'react-dom/client'

import { MantineProvider } from '@mantine/core'

import Popup from './Popup'

import './index.css'

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Popup />
    </MantineProvider>
  )
}

const container = document.getElementById('app-container')
const root = createRoot(container!)
root.render(<App />)
