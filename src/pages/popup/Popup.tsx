import React from 'react'
import AppShell from '../components/Layout/AppShell'
import { Box, Button, Space, Stack, Title } from '@mantine/core'
import Features from '../components/Popup/Features'
import GoogleLoginButton from '../components/common/GoogleLoginButton'

const Popup = () => {
  return (
    <AppShell>
      <Box h="100%">
        <Features />
        <GoogleLoginButton />
      </Box>
    </AppShell>
  )
}

export default Popup
