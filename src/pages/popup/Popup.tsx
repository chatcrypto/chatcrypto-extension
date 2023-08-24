import React, { useContext } from 'react'
import { createHashRouter, RouterProvider } from 'react-router-dom'

import { Box } from '@mantine/core'

import GoogleLoginButton from '../components/common/GoogleLoginButton'
import AppShell from '../components/Layout/AppShell'
import Features from '../components/Popup/Features'
import AnalysisScreen from '../components/Popup/Screens/AnalysisScreen'
import ChatIntroScreen from '../components/Popup/Screens/ChatIntroScreen'
import { AppContext } from '../context/Popup/AppContext/AppProvider'
import { ChatContextProvider } from '../context/Popup/ChatContext'

const ChatRoute = () => {
  const { accessToken } = useContext(AppContext)
  if (accessToken) {
    return <ChatIntroScreen />
  }
  return (
    <>
      <Features />
      <GoogleLoginButton />
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
