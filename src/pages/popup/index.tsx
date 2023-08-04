import React from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { MantineProvider, rem } from '@mantine/core'

import Popup from './Popup'

import './index.css'
import AppContextProvider from '../context/Popup/AppContext/AppProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient()

const App = () => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
        lineHeight: '24px',
        fontSizes: {
          xs: rem(8),
          sm: rem(15),
          md: rem(20),
        },
        spacing: {
          xs: rem(8),
          sm: rem(16),
          md: rem(24),
          lg: rem(32),
          xl: rem(64),
        },
        radius: {
          xs: rem(12),
          sm: rem(16),
          md: rem(24),
          lg: rem(32),
          xl: rem(40),
        },
        colors: {
          dark: [
            '#d5d7e0',
            '#acaebf',
            '#8c8fa3',
            '#666980',
            '#4d4f66',
            '#34354a',
            '#2b2c3d',
            '#1d1e30',
            '#0c0d21',
            '#01010a',
          ],
          primary: ['#6F8AFE'],
          background: ['#F6F6F6', '#282828'],
        },
        components: {
          Text: {
            styles: {
              root: {
                fontSize: '14px',
                color: '#353535',
                fontWeight: 400,
              },
            },
          },
        },
        headings: {
          fontWeight: 700,
          sizes: {
            h1: {
              fontSize: rem(36),
              lineHeight: rem(56),
            },
            h4: {
              fontSize: rem(18),
              lineHeight: rem(24),
            },
          },
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="681907933403-hl0r8onfuhteg24otjh77tihrv61vbcd.apps.googleusercontent.com">
          <AppContextProvider>
            <Popup />
          </AppContextProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}

const container = document.getElementById('app-container')
const root = createRoot(container!)
root.render(<App />)
