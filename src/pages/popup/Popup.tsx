import React from 'react'
import AppShell from '../components/Layout/AppShell'
import { Box, Button, Space, Stack, Title } from '@mantine/core'
import Features from '../components/Popup/Features'
import GoogleLoginButton from '../components/common/GoogleLoginButton'
import ChatSession from '../components/Popup/ChatSession'
import { ChatContextProvider } from '../context/Popup/ChatContext'

const Popup = () => {
  return (
    <ChatContextProvider>
      <AppShell>
        <Box h="100%">
          {/* <Features />
        <GoogleLoginButton /> */}
          <ChatSession />
        </Box>
      </AppShell>
    </ChatContextProvider>
  )
}

export default Popup
