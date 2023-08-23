import React from 'react'
import AppShell from '../components/Layout/AppShell'
import { Box, Button, Space, Stack, Title } from '@mantine/core'
import Features from '../components/Popup/Features'
import GoogleLoginButton from '../components/common/GoogleLoginButton'
import ChatIntroScreen from '../components/Popup/Screens/ChatIntroScreen'
import { ChatContextProvider } from '../context/Popup/ChatContext'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import AnalysisScreen from '../components/Popup/Screens/AnalysisScreen'

const ChatRoute = () => {
  return (
    <>
      {/* <Features /> */}
      {/* <GoogleLoginButton /> */}
      <ChatIntroScreen />
    </>
  )
}

const router = createHashRouter([
  {
    path: '/chat',
    element: (
      <AppShell>
        <Box h="100%">
          <ChatRoute />
        </Box>
      </AppShell>
    ),
  },
  {
    path: '/',
    element: (
      <AppShell>
        <AnalysisScreen />
      </AppShell>
    ),
  },
])

const Popup = () => {
  return (
    <ChatContextProvider>
      <RouterProvider router={router} />
    </ChatContextProvider>
  )
}

export default Popup
