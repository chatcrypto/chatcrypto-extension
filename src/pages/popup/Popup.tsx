// @ts-nocheck
import React, { useEffect } from 'react'
import AppShell from '../components/Layout/AppShell'
import { Box, Button, Space, Stack, Title } from '@mantine/core'
import Features from '../components/Popup/Features'
import GoogleLoginButton from '../components/common/GoogleLoginButton'
import ChatIntroScreen from '../components/Popup/Screens/ChatIntroScreen'
import { ChatContextProvider } from '../context/Popup/ChatContext'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import AnalysisScreen from '../components/Popup/Screens/AnalysisScreen'
import { useChromeStorageLocal } from 'use-chrome-storage'

const ChatRoute = () => {
  useEffect(() => {
    if (chrome && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(function (
        request,
        sender,
        sendResponse,
      ) {
        console.log(request.data)
        if (request.message === 'access_token') {
          //  To do something
          console.log(request.data)
        }
      })
    }
    // if (chrome && chrome.storage && chrome.storage.onChanged) {
    //   chrome.storage.onChanged.addListener((changes) => {
    //     console.log(changes, 'changes')
    //   })
    // }
  }, [])

  return (
    <>
      {/* <Features /> */}
      <GoogleLoginButton />
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
