import React from 'react'
import AppShell from '../components/Layout/AppShell'
import { Box, Button, Space, Stack, Title } from '@mantine/core'
import Features from '../components/Popup/Features'
import GoogleLoginButton from '../components/common/GoogleLoginButton'
import ChatIntroScreen from '../components/Popup/ChatIntroScreen'
import { ChatContextProvider } from '../context/Popup/ChatContext'

const Popup = () => {
  return (
    <ChatContextProvider>
      <AppShell>
        <Box h="100%">
          {/* <Features />
        <GoogleLoginButton /> */}
          <ChatIntroScreen />
        </Box>
      </AppShell>
    </ChatContextProvider>
  )
}

export default Popup
